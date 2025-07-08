import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Auth} from "../../services/auth";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private fb:FormBuilder, private auth: Auth) {
  }

  form: FormGroup = this.fb.group({
    rut: ['', Validators.required],
    password: ['', Validators.required],
  })
  mensaje: string = ""
  onSubmit(){
    if (this.form.invalid) {
      return;
    }

    console.log("this.form.value", this.form.value)

    this.auth.login(this.form.value);

  }




}
