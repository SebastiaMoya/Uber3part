import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  mensajes: string[] = [];
  mostrarInputRespuesta: boolean = false;  // Variable para controlar la visibilidad del input

  correo: string = '';
  respuesta: string = '';
  idUsuario: number | null = null; // Variable para almacenar el ID del usuario
  respuestarecibida: string = '';

  constructor(private alertController: AlertController, private toastController: ToastController, private router: Router, private bd: BasededatosService) { }

  ngOnInit() {
  }

  async obtenerIdUsuario() {
    try {
      const idUsuario = await this.bd.buscarUsuarioIdporCorreo(this.correo);
  
      if (idUsuario !== null) {
        // Puedes usar el ID del usuario como desees
        console.log('ID de Usuario:', idUsuario);
        // Almacenar el ID del usuario en una variable de componente
        this.idUsuario = idUsuario;
        // Luego, puedes llamar a la función para validar la respuesta
        await this.obtenerRespuestaUsuario();
      } else {
        this.mensajes.push('Correo no encontrado. Verifica tu correo e intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error al obtener el ID de usuario:', error);
      this.mensajes.push('Error al obtener el ID de usuario. Intenta de nuevo más tarde.');
    }
  }
  

  async obtenerRespuestaUsuario() {
    try {
      if (this.idUsuario !== null) {
        // Llamamos a la función en tu servicio o clase que obtiene la respuesta del usuario por su ID
        const respuestaUsuario = await this.bd.obtenerRespuestaUsuario(this.idUsuario);
  
        if (respuestaUsuario !== null) {
          // Si la respuesta no es null, asignamos el valor a this.respuesta
          this.respuesta = respuestaUsuario;
          this.mostrarInputRespuesta = true; // Muestra el input para la respuesta
        }
      } else {
        this.mensajes.push('ID de usuario no válido.');
      }
    } catch (error) {
      console.error('Error al obtener la respuesta del usuario:', error);
      this.mensajes.push('Error al obtener la respuesta del usuario. Intenta de nuevo más tarde.');
    }
  }
  
  
  async validarRespuesta() {
    try {
      if (this.idUsuario !== null) {
        if (this.respuesta !== null) { // Asegurarse de que this.respuesta no sea null
          const respuestaCorrecta = await this.bd.validarRespuesta(this.idUsuario, this.respuesta);
  
          if (respuestaCorrecta) {
            // Respuesta correcta, puedes hacer lo que necesites aquí
            console.log('Respuesta correcta. Hacer algo...');
            this.mensajes.push('Respuesta Correcta');
          } else {
            this.mensajes.push('Respuesta incorrecta. Verifica tu respuesta e intenta de nuevo.');
          }
        } else {
          this.mensajes.push('La respuesta no puede ser nula.');
        }
      } else {
        this.mensajes.push('ID de usuario no válido. Intenta obtener el ID de usuario primero.');
      }
    } catch (error) {
      console.error('Error al validar la respuesta:', error);
      this.mensajes.push('Error al validar la respuesta. Intenta de nuevo más tarde.');
    }
  }
   

  Recuperar() {
    this.mensajes = [];

    if (!this.correo) {
      this.mensajes.push('Campo \'Correo\' es obligatorio');
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

    this.router.navigate(['/iniciosesion']);
    this.presentToast("Se ha enviado un correo para la recuperacion de la contraseña");

  }

  //PresentToast
  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }

}
