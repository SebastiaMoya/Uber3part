import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { Usuarios } from 'src/app/services/usuarios';
import { Vehiculo } from 'src/app/services/vehiculo';


@Component({
  selector: 'app-modificarperfil',
  templateUrl: './modificarperfil.page.html',
  styleUrls: ['./modificarperfil.page.scss'],
})
export class ModificarperfilPage implements OnInit {
  mailRecibido: string = '';
  claveRecibido: string = '';
  nuevaPatente: string = '';
  formularioEnviado!: boolean;
  formularioEnviado2!: boolean;

  Usuario: string= '';
  nombre:string='';
  imageSource: any;
  clave:string='';
  toastController: any;
  usuarioalmacenado: any;
  usuarioEncontrado: Usuarios | undefined;
  usuarioEncontrado2: Vehiculo | undefined;
  

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

  constructor(private router: Router,private alertController: AlertController, private conexionBD: BasededatosService) { }



  
  cerrarSesion() {
    this.router.navigate(['/perfil']);
  }

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
          value: this.nuevaPatente, // Valor actual de la patente
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
            this.nuevaPatente = data.nuevaPatente;
          },
        },
      ],
    });

    await alert.present();
  }
  //modificar perfil
  validarPatente(patente: string): boolean {
    // Expresión regular para validar una patente alfanumérica, por ejemplo, "ABC123"
    const patronPatente = /^[A-Z0-9]{3,}$/;
    
    return patronPatente.test(patente);
}
validarNombre(nombre: string): boolean {
  // Aquí debes implementar la lógica para validar el nombre
  // Puedes usar expresiones regulares u otras lógicas según tus requisitos
  // Por ejemplo, para verificar que comience con mayúscula:
  return /^[A-Z][a-z]*$/.test(nombre);
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


    onSubmit() {
      this.formularioEnviado = true; // Marcar que se intentó enviar el formulario
  
      if (!/^[A-Z][a-z]{3,11}$/.test(this.nombre)) {
        console.error('Error: El nombre debe tener entre 4 y 12 caracteres y comenzar con mayúscula.');
      } else if (/\d/.test(this.nombre)) {
        console.error('Error: El nombre no debe contener números.');
      
      }
      
    
      
    
      if (!this.hayErroresnom()) {
        
          this.modificarnom();
          
          console.log('datos modificados');
        
        
        
      }
    }

    



  hayErrorescon(): boolean {
    // Aquí verifica todas las condiciones de validación y devuelve true si hay errores
    return (
      
      
      this.clave.length < 4 || 
      this.clave.length > 12 
      
    );
  }
  hayErroresnom(): boolean {
    // Aquí verifica todas las condiciones de validación y devuelve true si hay errores
    return (
      this.nombre.length < 4 || 
      this.nombre.length > 12 
     
      
    );
  }  
  modificarnom(){
    this.conexionBD.modinomusu(this.nombre,this.usu.id_usuario);
      this.presentToast;
  }

  modificarcont(){
    this.conexionBD.modicontusu(this.clave,this.usu.id_usuario);
    //poner alerta ayuda 
      this.presentToast;
  }

  modipate(){
  

    

      this.formularioEnviado = true; // Marcar que se intentó enviar el formulario
    
      // Expresión regular para validar una patente alfanumérica, por ejemplo, "ABC123"
      const regexPatente = /^[A-Z0-9]{3,}$/;
    
      if (!regexPatente.test(this.nuevaPatente)) {
        console.error('Error: La patente debe contener al menos 3 caracteres alfanuméricos en mayúsculas.');
      } else {
        // Validaciones adicionales si es necesario
    
        if(!this.hayErroresPatente()) {
          // Lógica para modificar los datos cuando no hay errores
          this.conexionBD.modipate(this.nuevaPatente,this.usu.id_usuario);
          console.log('Datos modificados');
        }
      }
    }
    
    hayErroresPatente(): boolean {
      // Implementa lógica para verificar errores adicionales si es necesario
      // Devuelve true si hay errores, de lo contrario, devuelve false
      return false; // Cambia esto según tus necesidades
    }
    
    modificarPatente() {
      // Implementa lógica para modificar los datos
      console.log('Método modificarPatente ejecutado');
    }
  }


 





