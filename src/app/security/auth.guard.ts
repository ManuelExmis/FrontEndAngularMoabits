import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private apiauthService: AuthService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const usuario = this.apiauthService.usuarioData;

        if (!usuario) {
          let token = localStorage.getItem('token')
          if (token) {
            this.apiauthService.updateUsuarioData(token)
            return true
          }
        }

        if (usuario) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
