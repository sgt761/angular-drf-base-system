import {Injectable, signal, WritableSignal} from "@angular/core";
import {JwtTokenResponse, User} from "../models/user.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environment/environment";

@Injectable({ providedIn: 'root' })
export class Auth {
  private readonly apiUrl: string = environment.apiUrl;

  readonly accessToken: WritableSignal<string | null> = signal<string | null>(null);
  readonly refreshToken: WritableSignal<string | null> = signal<string | null>(null);
  readonly currentUser: WritableSignal<User | null> = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router){

  }

  login(credentials: { rut: string; password: string }) {
    this.http.post<JwtTokenResponse>(`${this.apiUrl}/api/token/`, credentials)
      .subscribe({
        next: ({ access, refresh }) => {
          this.accessToken.set(access);
          this.refreshToken.set(refresh);
          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);

          this.fetchCurrentUser()

        },
        error: (err) => {
          console.log("ERROR", err)
        }
      });
  }

  logout() {
    this.accessToken.set(null);
    this.refreshToken.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  restoreSession() {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    const userRaw = localStorage.getItem('user');
    this.accessToken.set(access);
    this.refreshToken.set(refresh);
    if (userRaw) {
      this.currentUser.set(JSON.parse(userRaw));
    }
  }

  // Refresca el access token si expira (pro, pero opcional)
  refreshAccessToken() {
    const refresh = this.refreshToken();
    if (!refresh) return;
    this.http.post<Pick<JwtTokenResponse, 'access'>>(
      `${this.apiUrl}/token/refresh/`, { refresh }
    ).subscribe({
      next: ({ access }) => {
        this.accessToken.set(access);
        localStorage.setItem('access', access);
      },
      error: () => {
        this.logout();
      }
    });
  }


  fetchCurrentUser() {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    this.http.get<User>(`${this.apiUrl}/api/users/me/`, {headers}).subscribe({
      next: (userRaw:any) => {
        console.log("fetchCurrentUser userRaw", userRaw)
        const user: User = {
          id: userRaw.id,
          rut: userRaw.rut,
          primer_nombre: userRaw.primer_nombre,
          apellido_paterno: userRaw.apellido_paterno,
          apellido_materno: userRaw.apellido_materno,
          email: userRaw.email
        };

          if (user) {
            this.currentUser.set(user);
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            this.currentUser.set(null);
            localStorage.removeItem('user');
          }
          console.log("user", user)
          this.router.navigate(['/inicio']);

      }
    });
  }

}
