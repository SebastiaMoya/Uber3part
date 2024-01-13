import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {

  correo: string = '';
  respuesta: string = '';
  selectedSecurityQuestion: string = '';
  mensajes: string[] = [];

  constructor(private alertController: AlertController, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  Recuperar() {
    this.mensajes = [];

    if (!this.correo) {
      this.mensajes.push('Campo \'Correo\' es obligatorio');
      return;
    } else if (!this.selectedSecurityQuestion) {
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
