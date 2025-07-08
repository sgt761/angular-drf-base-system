import { Component } from '@angular/core';
import {Auth} from "../../../../core/auth/services/auth";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  constructor(private auth: Auth){

  }

  cerrarSesion(){
    this.auth.logout()
  }
}
