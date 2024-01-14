import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage implements OnInit {
  mailRecibido: string = '';
  claveRecibido: string = '';
  patente: string = 'aa123bb';

  imageSource: any;

  constructor(private router: Router,private alertController: AlertController) { }



  
  cerrarSesion() {
    this.router.navigate(['/perfil']);
  }

  ngOnInit() {

  }
  
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
  
    this.imageSource = image.dataUrl; 
  
    
  };

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
}

