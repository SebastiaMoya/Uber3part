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
  usuarioEncontrado2: any;
  usuarioEncontrado: any;
  usuarioalmacenado: any;
  vh: any=[{
    patente:'',
    marca: '',
    modelo:'',
    cant_asiento: '',
    color: '',
    fk_user: ''
  }];

  usu: any=[{
    id_usuario: '',
    nombreuser: '',
    correo: '',
    clave: '',
    respuesta: '',
    fk_idrol: '',
    id_rol: '',
    fk_idpregunta :'',
    foto_usu: ''
  }];

  constructor(private router: Router,
    private activeRouter: ActivatedRoute,
    private alertController: AlertController,
    private toastController: ToastController,
    private conexionBD: BasededatosService) { }


   ngOnInit() {
    const usuarioAlmacenadoString = localStorage.getItem('usuario');

    if (usuarioAlmacenadoString) {
      try {
        this.usuarioalmacenado = JSON.parse(usuarioAlmacenadoString);
      } catch (error) {
        console.error('Error al analizar el valor del usuario en el localStorage:', error);
      }

      if (this.usuarioalmacenado) {
        this.conexionBD.dbState().subscribe((res) => {
          if (res) {
            this.conexionBD.fetchUsuario().subscribe((items) => {
              if (items && items.length > 0) {
                this.usuarioEncontrado = items.find((usu) => this.usu.id_usuario === this.usuarioalmacenado.id_usuario);

                if (this.usuarioEncontrado) {
                  this.usu = this.usuarioEncontrado;
                  console.log('Usuario encontrado:', this.usu);
                } else {
                  console.log('Usuario no encontrado en la base de datos.');
                }
              }
            });
          }
        });
      }
    } else {
      console.log('No se encontró un usuario en el almacenamiento local.');
    }
    
    if (usuarioAlmacenadoString) {
      try {
        this.usuarioalmacenado = JSON.parse(usuarioAlmacenadoString);
      } catch (error) {
        console.error('Error al analizar el valor del usuario en el localStorage:', error);
      }

      if (this.usuarioalmacenado) {
        this.conexionBD.dbState().subscribe((res) => {
          if (res) {
            this.conexionBD.fetchVehiculo().subscribe((items) => {
              if (items && items.length > 0) {
                this.usuarioEncontrado2 = items.find((vh) => this.vh.fk_user === this.usuarioalmacenado.id_usuario);

                if (this.usuarioEncontrado) {
                  this.usu = this.usuarioEncontrado;
                  console.log('Usuario encontrado:', this.vh);
                } else {
                  console.log('Usuario no encontrado en la base de datos.');
                }
              }
            });
          }
        });
      }
    } else {
      console.log('No se encontró un usuario en el almacenamiento local.');
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
