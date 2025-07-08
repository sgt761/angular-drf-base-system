import { Routes } from '@angular/router';
import {authRoutes} from "./core/auth/auth.routes";
import {HomepageComponent} from "./features/home/pages/homepage/homepage.component";
import {authGuard} from "./core/auth/guards/auth-guard";
import {authGuardLogin} from "./core/auth/guards/auth-guard-login";

export const routes: Routes = [
  { path: 'login', children: authRoutes, canActivate: [authGuardLogin] },
  { path: 'inicio', component: HomepageComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];
