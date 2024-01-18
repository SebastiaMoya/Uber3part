import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { Usuarios } from 'src/app/services/usuarios';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  mailRecibido: string = '';
  claveRecibido: string = '';
  rolRecibido: number = 0;
  patente: string = 'aa123bb';

  idRolUsuario: number = 0;
  idUsuarioRecibido: number = 0; // Declarar la variable idRolUsuario
  datosUsuario: any = null;  // Cambiado a una única variable

  constructor(private router: Router,
    private activeRouter: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private bd: BasededatosService) { }


  ngOnInit() {
    this.activeRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.idUsuarioRecibido = this.router.getCurrentNavigation()?.extras?.state?.['IdUserToPerfil'];
      }
    });

    this.obtenerDatosUsuario();

  }

  obtenerDatosUsuario() {
    if (this.idUsuarioRecibido) {
      this.bd.obtenerDatosUsuario(this.idUsuarioRecibido)
        .then((usuario) => {
          if (usuario) {
            this.datosUsuario = usuario;
          }
        })
        .catch(error => {
          console.error('Error al obtener datos del usuario:', error);
        });
    }
  }

  async mostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'id user: ' + this.idUsuarioRecibido,
      message: '',
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


  //.......................................................  

  async editarPatente() {
    const alert = await this.alertController.create({
      header: 'Editar patente',
      inputs: [
        {
          name: 'nuevaPatente',
          type: 'text',
          value: this.patente, // Valor actual de la patente
          placeholder: 'Nueva patente',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Manejar el cancelar si es necesario
          },
        },
        {
          text: 'Guardar',
          handler: (data) => {
            // Guardar la nueva patente y actualizar el valor en tu componente
            this.patente = data.nuevaPatente;
          },
        },
      ],
    });

    await alert.present();
  }

  //-------------------------------------------

  async cerrarSesion() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // El usuario canceló el cierre de sesión
          }
        }, {
          text: 'Sí',
          handler: () => {
            // Lógica para cerrar sesión
            // Por ejemplo, redireccionar a la página de inicio de sesión
            this.router.navigate(['/iniciosesion']);
          }
        }
      ]
    });

    await alert.present();
  }

  IrModificar() {
    this.router.navigate(['/modificarperfil']);
  }



}
