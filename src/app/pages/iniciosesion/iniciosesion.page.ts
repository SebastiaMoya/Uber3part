import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  mensajes: string[] = [];
  correo: string = '';
  clave: string = '';
  id_rol: number = 0;

  mailEnviado: string = '';
  claveEnviado: string = '';
  rolEnviado: number = 0;

  idConductor: number = 1
  mailConductor: string = 'conductor@gmail.com';
  claveConductor: string = 'Conductor_123';

  idpasajero: number = 2
  mailPasajero: string = 'pasajero@gmail.com';
  clavePasajero: string = 'Pasajero_123';

  constructor(private router: Router, private bd: BasededatosService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
  }

  async mostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Te damos la bienvenida',
      message: 'Usuario iniciado exitosamente: '+ this.rolEnviado,
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          cssClass: 'primary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
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

    // Llamar a la función de búsqueda en la base de datos
    this.bd.buscarUsuarios(this.correo, this.clave)
      .then((usuarios) => {
        if (usuarios.length > 0) {
          const usuario = usuarios[0];

          // Autenticación exitosa, redirigir a la página de perfil con información adicional
          let navigationExtras: NavigationExtras = {
            state: {
              usuario: {
                mailEnviado: this.correo,
                claveEnviado: this.clave,
                rolEnviado: usuario.id_rol
              }
            }
          };
          this.mostrarMensaje();
          this.router.navigate(['/perfil'], navigationExtras);
        } else {
          // Credenciales incorrectas
          this.mensajes.push('Credenciales incorrectas. Inténtalo de nuevo.');
        }
      })
      .catch(error => {
        // Captura y muestra más detalles sobre el error
        console.error('Error en la búsqueda de usuarios:', error);
        console.error('Error en la autenticación:', error);
        this.mensajes.push('Error en la autenticación. Por favor, inténtalo de nuevo.', error);
      });

  }
}