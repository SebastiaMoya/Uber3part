import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-registrouser',
  templateUrl: './registrouser.page.html',
  styleUrls: ['./registrouser.page.scss'],
})
export class RegistrouserPage implements OnInit {
  // Variables para almacenar los datos del formulario
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  con_contrasena: string = '';
  fk_idpregunta: string = ''; // Aquí almacenaremos el ID de la pregunta seleccionada
  respuesta: string = '';
  fk_idrol: number = 0; // Variable para almacenar el rol seleccionado por el usuario
  idRolUsuario: number = 0;
  mensajes: string[] = [];

  constructor(private alertController: AlertController, private router: Router, private bd: BasededatosService) { }

  ngOnInit() {
  }

  registrarUsuario() {
    this.mensajes = [];
  
    // Verificar que las contraseñas coincidan antes de continuar
    if (this.contrasena !== this.con_contrasena) {
      this.mensajes.push('Las contraseñas no coinciden');
      return;
    }
  
    if (!this.nombre) {
      this.mensajes.push('Campo \'Nombre\' es obligatorio');
      return;
    } else if (!this.correo) {
      this.mensajes.push('Campo \'Correo\' es obligatorio');
      return;
    } else if (!this.contrasena) {
      this.mensajes.push('Campo \'Contraseña\' es obligatorio');
      return;
    } else if (!this.fk_idrol) {
      this.mensajes.push('Debes seleccionar un rol');
      return;
    } else if (!this.fk_idpregunta) {
      this.mensajes.push('Debes seleccionar una pregunta de seguridad');
      return;
    } else if (!this.respuesta) {
      this.mensajes.push('Campo \'Respuesta\' es obligatorio');
      return;
    }
  
    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      this.mensajes.push('Correo electrónico no válido');
      return;
    }
  
    // Validación de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.contrasena)) {
      this.mensajes.push('La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y tener al menos 8 caracteres');
      return;
    }
  
    // Verificar si el correo ya existe antes de continuar
    this.bd.verificarCorreoExistente(this.correo)
      .then(correoExistente => {
        if (correoExistente) {
          // El correo ya existe, mostrar un mensaje o manejar la situación según tus necesidades
          this.mensajes.push('El correo electrónico ya está registrado');
          return Promise.reject('El correo electrónico ya está registrado');
        }
  
        // El correo no existe, proceder con la inserción
        return this.bd.insertarUsuario(
          this.nombre,
          this.correo,
          this.contrasena,
          this.respuesta,
          +this.fk_idrol,
          +this.fk_idpregunta
        );
      })
      .then((idRolInsertado) => {
        // Éxito en la inserción, mostrar el mensaje de registro exitoso
        // idRolInsertado contendrá el ID del rol insertado
        console.log('ID del rol insertado:', idRolInsertado);
        this.MsjRegistro();
        // Guarda el ID del rol insertado en una variable para usarlo más adelante
        this.idRolUsuario = idRolInsertado;
        this.router.navigate(['/iniciosesion']);
      })
      .catch(error => {
        // Error en la inserción o correo existente, mostrar mensaje de error
        this.MsjFallo();
        console.error('Error en la inserción de usuario:', error);
        // Puedes agregar lógica adicional para manejar el error si es necesario
      });
  }
  


  async MsjFallo() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Registro fallido',
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


  async MsjRegistro() {
    const alert = await this.alertController.create({
      header: 'Te damos la bienvenida',
      message: '¡Gracias por unirte!',
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

}
