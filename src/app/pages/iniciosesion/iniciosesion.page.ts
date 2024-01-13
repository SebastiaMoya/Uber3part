import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  mensajes: string[] = [];
  correo: string = '';
  clave: string = '';

  idConductor : number = 1
  mailConductor : string = 'conductor@gmail.com';
  claveConductor : string = 'Conductor_123';

  idpasajero : number = 2
  mailPasajero : string = 'pasajero@gmail.com';
  clavePasajero : string = 'Pasajero_123';

  constructor(private router: Router,private bd: BasededatosService, private alertController: AlertController) { }

  ngOnInit() {
  }
  iniciarSesion() {
    this.mensajes = [];

  
    // Validaciones básicas, puedes agregar las que necesites
    if (!this.correo || !this.clave) {
      this.mensajes.push('Por favor, complete todos los campos.');
      return;
    }

     // Validación de formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.correo)) {
      this.mensajes.push('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // Lógica de autenticación (simulada aquí, reemplázala con tu lógica real)
    if ( (this.correo === 'conductor@gmail.com' && this.clave === 'Conductor_123') || (this.correo === 'pasajero@gmail.com' && this.clave === 'Pasajero_123') ) {
      // Autenticación exitosa, redirigir a la página de perfil o a donde sea necesario

      let navigationExtras: NavigationExtras = {
        state: {

          mailEnviado: this.correo,
          claveEnviado: this.clave
        }
      }

      this.router.navigate(['/perfil'],navigationExtras);
    } else {
      // Credenciales incorrectas
      this.mensajes.push('Credenciales incorrectas. Inténtalo de nuevo.');
    }

  }
}
