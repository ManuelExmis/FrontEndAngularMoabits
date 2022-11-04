import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserRequest } from 'src/app/models/login';
import { Usuario } from 'src/app/models/userRequest'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
  });

  public usuario: string;
  public password: string;

  constructor(
    private apiauthService: AuthService,
      private router: Router,
      private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value)

    let usuario: Usuario = new Usuario(this.loginForm.value.usuario, this.loginForm.value.password)


    this.apiauthService.login(usuario).subscribe( (response: any) => {
      //  console.log('resppuesta de api java: ', response)

        if ( response.access_token && response.access_token.length > 0  ) {
            this.router.navigate(['/']);
        } else {
            console.log(response);
        }
    }, (error: any) => {
      if (error.status === 403) {
        Swal.fire({
          title: 'Unauthorize!',
          text: 'Invalid crendetials',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    } );
}

}
