import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterCliente } from '../interfaces/register-cliente.interface';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
  ) { }

  getUsuarios() {
    return this.http.get(`${ base_url }/api/v1/user`);
  }
}
