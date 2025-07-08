import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {Auth} from "../services/auth";

export const authGuard: CanActivateFn = () => {
  const auth = inject(Auth)
  const router = inject(Router)
  const token = auth.accessToken() || localStorage.getItem('access')
  console.log("token", token)
  if (token){
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }

}
