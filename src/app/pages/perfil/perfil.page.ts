import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


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

  dirPartida: string = '';
  dirDestino: string = '';
  asientos: number = 0;
  comentarios: string = '';

  constructor(private router: Router,
    private activeRouter: ActivatedRoute,
    private alertController: AlertController, private toastController: ToastController) { }


  //.................................

  async presentarAlerta() {
    const alert = await this.alertController.create({
      header: 'Publicar Viaje',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
        {
          text: 'Publicar viaje',
          handler: () => {
            this.mostrarMensaje('Viaje publicado');
          },
        },
      ],
      inputs: [
        {
          name: 'dirPartida',
          type: 'text',
          placeholder: 'Dirección de partida',
        },
        {
          name: 'dirDestino',
          type: 'text',
          placeholder: 'Dirección de destino',
        },
        {
          name: 'asientos',
          type: 'number',
          placeholder: 'Cantidad de asientos',
          min: 1,
          max: 10,
        },
        {
          name: 'comentarios',
          type: 'textarea',
          placeholder: 'Comentarios del conductor',
        },
      ],
    });

    await alert.present();
  }

  mostrarMensaje(mensaje: string) {
    const toast = this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'middle',
    });
    toast.then(t => t.present());
  }

  publicarViaje() {
    this.presentarAlerta();
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

  cerrarSesion() {
    // Aquí deberías implementar la lógica para cerrar sesión
    // Por ejemplo, limpiar el estado de la sesión y redirigir al inicio de sesión
    this.router.navigate(['/iniciosesion']);
  }

  IrModificar() {
    this.router.navigate(['/modificarperfil']);
  }

  ngOnInit() {
    this.activeRouter.queryParams.subscribe(param => {
      //preguntamos si viene informacion en la redireccion
      if (this.router.getCurrentNavigation()?.extras.state) {
        //guardamos la info en variables propias

        this.mailRecibido = this.router.getCurrentNavigation()?.extras?.state?.['mailEnviado'];
        this.mostrarMensaje('1');
        this.claveRecibido = this.router.getCurrentNavigation()?.extras?.state?.['claveEnviado'];
        this.mostrarMensaje('2');
        this.rolRecibido = this.router.getCurrentNavigation()?.extras?.state?.['rolEnviado'];
        this.mostrarMensaje('todo bien, id_rol del usuario: ' + this.rolRecibido);

      }
    })
  }

}
