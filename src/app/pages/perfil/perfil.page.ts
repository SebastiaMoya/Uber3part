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


  idRolUsuario: number = 0; // Declarar la variable idRolUsuario

  constructor(private router: Router,
    private activeRouter: ActivatedRoute,
    private alertController: AlertController, private toastController: ToastController,
    private bd: BasededatosService) { }


  ngOnInit() {

    // Declarar la variable idRolUsuario aquí y asignarle un valor por defecto
    this.idRolUsuario = 0;

    this.activeRouter.queryParams.subscribe(param => {
      // Preguntamos si viene información en la redirección
      if (this.router.getCurrentNavigation()?.extras.state) {
        // Guardamos la info en variables propias
        this.mailRecibido = this.router.getCurrentNavigation()?.extras?.state?.['mailEnviado'];
        //this.mostrarMensaje('correo: ' + this.mailRecibido);
        this.claveRecibido = this.router.getCurrentNavigation()?.extras?.state?.['claveEnviado'];
        //this.mostrarMensaje('clave: ' + this.claveRecibido);
        this.rolRecibido = this.router.getCurrentNavigation()?.extras?.state?.['rolEnviado'];
      //  this.mostrarMensaje('todo bien, id_rol del usuario: ' + 'correo: ' + this.mailRecibido + this.rolRecibido + 'clave: ' + this.claveRecibido);

        // Ahora asignamos el valor dentro del bloque then
        this.bd.buscarUsuarioPorCorreo(this.mailRecibido).then(result => {
          this.idRolUsuario = result.fk_idrol;
          //console.log('ID del rol del usuario:', this.idRolUsuario);
        }).catch(error => {
          console.error('Error al buscar usuario:', error);
          // Manejo de errores
        });
      }
    });
  }


  //.................................

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Te damos la bienvenida',
      message: 'Valor de fk_idrol: ',
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
