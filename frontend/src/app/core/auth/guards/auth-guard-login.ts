import {CanActivateFn, Router} from "@angular/router";
import {Auth} from "../services/auth";
import {inject} from "@angular/core";

export const authGuardLogin: CanActivateFn = () => {
  const auth = inject(Auth)
  const router = inject(Router)
  const token = auth.accessToken() || localStorage.getItem('access')
  if (token){
    router.navigate(['/inicio']);
    return false;
  } else {
    return true;
  }
}
