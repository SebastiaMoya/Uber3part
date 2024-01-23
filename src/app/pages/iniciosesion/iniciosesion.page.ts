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
  idUserfromBD: number = 0;
  mensajes: string[] = [];
  correo: string = '';
  clave: string = '';

  usuarios: Usuarios[] = [];

  mailEnviado: string = '';
  claveEnviado: string = '';

  constructor(private router: Router, private bd: BasededatosService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
  }



  mostrarListaUsuarios() {
    this.bd.getAllUsuarios().then((usuarios: Usuarios[]) => {
      this.usuarios = usuarios;
    }).catch(error => {
      console.error('Error al obtener todos los usuarios en InicioSesionPage:', error);
      // Puedes manejar el error según tus necesidades
    });
  }

  async mostrarMensaje() {
    const alert = await this.alertController.create({
      header: 'Te damos la bienvenida',
      message: 'Usuario iniciado exitosamente: ',
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

  limpiarTablaUsuarios() {
    // Llama a la función en tu servicio que limpia la tabla de usuarios
    this.bd.limpiarTablaUsuarios().then(() => {
      this.mensajes.push('Tabla de usuarios limpiada exitosamente');
      console.log('Tabla de usuarios limpiada exitosamente');
    }).catch(error => {
      this.mensajes.push('Error al limpiar la tabla de usuarios: ', error);
      console.error('Error al limpiar la tabla de usuarios:', error);
    });
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
    this.bd.buscarUsuarioId(this.correo, this.clave)
      .then((idUser) => {
        if (idUser !== null) {
          // Autenticación exitosa, guardar el ID del usuario
          this.idUserfromBD = idUser;
          this.enviarIdPerfil();
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

  enviarIdPerfil() {
    // Verifica si hay un ID de usuario almacenado
    if (this.idUserfromBD) {
      // Configura la información que deseas enviar
      let navigationExtras: NavigationExtras = {
        state: {
          // Renombrar la variable a IdUserToPerfil para mayor claridad
          IdUserToPerfil: this.idUserfromBD
        }
      };
      this.mostrarMensaje();
      this.router.navigate(['/perfil'], navigationExtras);
      localStorage.setItem('usuario', JSON.stringify(this.idUserfromBD));
    } else {
      // Credenciales incorrectas
      this.mensajes.push('Usuario no encontrado');
    }
  }
  
}