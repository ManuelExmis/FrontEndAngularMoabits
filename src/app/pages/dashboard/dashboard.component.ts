import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service'
import { ItemUser } from '../../models/itemUser'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuarios: ItemUser[] = []
  displayDialog: boolean = false

  constructor(
    public usuariosService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.cargarUsuarios();

  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios(  )
        .subscribe( (respuesta: any) => {

          this.usuarios = respuesta

        }, (error) => {
          console.log('error cargando usuarios: ', error)
        } );
  }

  showDialog() {
    this.displayDialog = true
  }

}
