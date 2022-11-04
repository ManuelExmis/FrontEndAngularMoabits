import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRequest } from '../models/login';
import { Usuario } from '../models/Usuario';
import { Response } from '../models/response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:8080/auth/sign';

  private usuarioSubject: BehaviorSubject<Usuario>;
  public usuario: Observable<Usuario>;

  public get usuarioData(): Usuario {
      return this.usuarioSubject.value;
  }

  public updateUsuarioData(token): any {
    return this.usuarioSubject.next(new Usuario(token))
  }

  constructor(private http: HttpClient) {
      this.usuarioSubject = new BehaviorSubject<Usuario>( JSON.parse( localStorage.getItem('usuario') ) );
      this.usuario = this.usuarioSubject.asObservable();
  }

  login( login: UserRequest ): Observable<Response> {
    var formData: any = new FormData();
    formData.append('login', login.login);
    formData.append('password', login.password);
    try {
      return this.http.post<any>(this.url, formData).pipe(
          map( response => {

            //  console.log('response en el service: ', response)

              if ( response.access_token && response.access_token.length > 0 ) {
                  const usuario: Usuario = new Usuario(response.access_token, '');
                  localStorage.setItem('token', response.access_token);
                  this.usuarioSubject.next(usuario);
              }

              return response;
          } )
      )
    } catch (error) {
      console.log('Error catch: ', error)
    }
  }

  logout() {
      localStorage.removeItem('usuario');
      this.usuarioSubject.next(null);
  }

}
