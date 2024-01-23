import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';
import { Comunas } from './comunas';
import { Sedes } from './sedes';
import { Viaje } from './viaje';
import { Vehiculo } from './vehiculo';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {

  //variable para guardar la conexion a la base de datos
  public conexionBD!: SQLiteObject;

  //variables para las tablas de nuestra base de datos
  //primero las que no tienen FK
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(20) NOT NULL);";

  tablaPregunta: string = "CREATE TABLE IF NOT EXISTS pregunta (id_pregunta INTEGER PRIMARY KEY AUTOINCREMENT, pregunta VARCHAR(30) NOT NULL);";

  tablaSede: string = "CREATE TABLE IF NOT EXISTS sede (id_sede INTEGER PRIMARY KEY AUTOINCREMENT, nombre_sede VARCHAR(40));";

  tablaComuna: string = "CREATE TABLE IF NOT EXISTS comuna (id_comuna INTEGER PRIMARY KEY AUTOINCREMENT, nombre_comuna VARCHAR(40));";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombreuser VARCHAR(20) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(16) NOT NULL, respuesta VARCHAR(20), foto_usu BLOB, fk_idrol INTEGER, fk_idpregunta INTEGER, FOREIGN KEY (fk_idrol) REFERENCES rol(id_rol), FOREIGN KEY (fk_idpregunta) REFERENCES preguntas(id_pregunta));";

  tablaVehiculo: string = "CREATE TABLE IF NOT EXISTS vehiculo (patente VARCHAR(20) PRIMARY KEY, marca VARCHAR(50), modelo VARCHAR(20), cant_asientos INTEGER, color VARCHAR(10), fk_user INTEGER, FOREIGN KEY (fk_user) REFERENCES usuario(id_usuario));";

  tablaViaje: string = "CREATE TABLE IF NOT EXISTS viaje (id_viaje INTEGER PRIMARY KEY AUTOINCREMENT, horasalida VARCHAR(5) NOT NULL, asientos_disponibles INTEGER, precio INTEGER, direcinicio VARCHAR(70), direcdestino VARCHAR(70),fk_patente VARCHAR(20), FOREIGN KEY (fk_patente) REFERENCES vehiculo(patente));";

  tablaDetalle: string = "CREATE TABLE IF NOT EXISTS detalleviaje (id_detalle INTEGER PRIMARY KEY AUTOINCREMENT, fk_viaje INTEGER, fk_user INTEGER, FOREIGN KEY (fk_viaje) REFERENCES viaje(id_viaje), FOREIGN KEY (fk_user) REFERENCES usuario(id_usuario));";

  //variables para insert por defecto
  insertRol1: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'Pasajero');";
  insertRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (2,'Conductor');";

  insertpregunta1: string = "INSERT or IGNORE INTO pregunta(id_pregunta,pregunta) VALUES (1,'¿Bebida favorita?');";
  insertpregunta2: string = "INSERT or IGNORE INTO pregunta(id_pregunta,pregunta) VALUES (2,'¿Nombre de tu mascota?');";
  insertpregunta3: string = "INSERT or IGNORE INTO pregunta(id_pregunta,pregunta) VALUES (3,'¿Marca de celular?');";

  insertsede1: string = "INSERT or IGNORE INTO sede(id_sede,nombre_sede) VALUES (1,'Plaza norte');";
  insertsede2: string = "INSERT or IGNORE INTO sede(id_sede,nombre_sede) VALUES (2,'Alameda');";
  insertsede3: string = "INSERT or IGNORE INTO sede(id_sede,nombre_sede) VALUES (3,'Padre Alonso de Ovalle');";
  insertsede4: string = "INSERT or IGNORE INTO sede(id_sede,nombre_sede) VALUES (4,'Plaza Oeste');";

  insertcomuna1: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (1,'La florida');";
  insertcomuna2: string = "INSERT or IGNORE INTO comuna(id_comuna,nombre_comuna) VALUES (2,'Quilicura');";

  insertUsuario1: string = "INSERT or IGNORE INTO usuario(id_usuario,nombreuser,correo,clave,respuesta,fk_idrol,fk_idpregunta) VALUES (1,'Tulio Tribiño','31@gmail.com','31_Minutos', 'plata', 1, 2);";
  insertUsuario2: string = "INSERT or IGNORE INTO usuario(id_usuario,nombreuser,correo,clave,respuesta,fk_idrol,fk_idpregunta) VALUES (2,'Bodoque','Bodoque@gmail.com','31_Minutos', 'Vino', 2, 1);";

  insertVehiculo1: string = "INSERT or IGNORE INTO vehiculo(patente,marca,modelo,cant_asientos,color,fk_user) VALUES ('bb456cc','Chevrolet','Chevrolet Beat', 7, 'verde', 2);";


  //variables para los observables de las consultas a las tablas
  listaUser = new BehaviorSubject([]);
  listaVehiculo = new BehaviorSubject([]);

  //   para el estatus de la base de datos
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  
  

  constructor(private alertController: AlertController, private plataform: Platform, private sqlite: SQLite) {
    this.crearBD();
  }

  //funciones que retornen los observables creados
  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchUsuario(): Observable<Usuarios[]> {
    return this.listaUser.asObservable();
    
    
  }
  
  fetchVehiculo(): Observable<Vehiculo[]> {
    return this.listaVehiculo.asObservable();
  }

  //metodo para crear la base de datos
  crearBD() {
    //verificamos que la plataforma este lista
    this.plataform.ready().then(() => {
      //crear la base de datos
      this.sqlite.create({
        name: 'StudyCaravan.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardar mi conexion a base de datos
        this.conexionBD = db;
        //crear las tablas en mi base de datos
        this.crearTablas();
      }).catch(e => {
        //mostrar el error del create
        this.presentAlert("Error en crearDB: " + JSON.stringify(e));
      })




    }).catch(e => {
      //mostrar el error del ready
      this.presentAlert("Error en platform: " + JSON.stringify(e));
    })

  }


  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje Importante',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }



  async crearTablas() {
    //this.presentAlert("0");
    try {
      //ejecutar creacion de tablas
      await this.conexionBD.executeSql(this.tablaRol, []);
      //this.presentAlert("1");
      await this.conexionBD.executeSql(this.tablaPregunta, []);
      //this.presentAlert("1");
      await this.conexionBD.executeSql(this.tablaComuna, []);
      //this.presentAlert("2");
      await this.conexionBD.executeSql(this.tablaSede, []);
      //this.presentAlert("3");
      await this.conexionBD.executeSql(this.tablaUsuario, []);
      //this.presentAlert("5");
      await this.conexionBD.executeSql(this.tablaVehiculo, []);
      //this.presentAlert("6");
      await this.conexionBD.executeSql(this.tablaViaje, []);
      //this.presentAlert("7");
      await this.conexionBD.executeSql(this.tablaDetalle, []);
      //this.presentAlert("8");
      //ejecuto los insert en las tablas
      await this.conexionBD.executeSql(this.insertRol1, []);
      //this.presentAlert("9");
      await this.conexionBD.executeSql(this.insertRol2, []);
      //this.presentAlert("10");
      await this.conexionBD.executeSql(this.insertpregunta1, []);
      //this.presentAlert("11");
      await this.conexionBD.executeSql(this.insertpregunta2, []);
      //this.presentAlert("12");
      await this.conexionBD.executeSql(this.insertcomuna1, []);
      //this.presentAlert("13");
      await this.conexionBD.executeSql(this.insertcomuna2, []);
      //this.presentAlert("14");
      await this.conexionBD.executeSql(this.insertsede1, []);
      //this.presentAlert("15");
      await this.conexionBD.executeSql(this.insertsede2, []);
      //this.presentAlert("15");
      await this.conexionBD.executeSql(this.insertsede3, []);
      //this.presentAlert("15");
      await this.conexionBD.executeSql(this.insertsede4, []);
      //this.presentAlert("16");
      //this.buscarUsuarios();
      await this.conexionBD.executeSql(this.insertUsuario1, []);
      //this.presentAlert("11");
      await this.conexionBD.executeSql(this.insertUsuario2, []);
      //this.presentAlert("12");
      await this.conexionBD.executeSql(this.insertVehiculo1, []);
      //actualizo el observable de la base de datos
      this.isDBReady.next(true);
      //this.presentAlert("Proceso completado");
    }
    catch (e) {
      this.presentAlert("Error en tablas: " + JSON.stringify(e));
    }

  }

  // Función para verificar si el correo ya existe
  verificarCorreoExistente(correo: string): Promise<boolean> {
    const verificarCorreoQuery = 'SELECT COUNT(*) AS cantidad FROM usuario WHERE correo = ?';
    const parametrosCorreo = [correo];

    return this.conexionBD.executeSql(verificarCorreoQuery, parametrosCorreo)
      .then(res => {
        const cantidad = res.rows.item(0).cantidad;
        return cantidad > 0; // Retorna true si el correo ya existe, false si no existe
      })
      .catch(e => {
        console.error('Error al verificar el correo existente:', e);
        throw e; // Re-lanzar el error para que pueda ser manejado en la llamada.
      });
  }




  insertarUsuario(nombre: string, correo: string, clave: string, respuesta: string, fk_idrol: number, fk_idpregunta: number): Promise<number> {
    return this.conexionBD.executeSql('INSERT INTO usuario(nombreuser, correo, clave, respuesta, fk_idrol, fk_idpregunta) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, correo, clave, respuesta, fk_idrol, fk_idpregunta]).then(res => {
        // Obtener el ID del último rol insertado
        return res.insertId;
      }).catch(e => {
        this.presentAlert("Error en insert usuario: " + JSON.stringify(e));
        throw e; // Re-lanzar el error para que pueda ser manejado en la llamada.
      });
  }


  buscarUsuarioId(correo: string, clave: string): Promise<number | null> {
    return this.conexionBD.executeSql('SELECT id_usuario FROM usuario WHERE correo = ? AND clave = ?', [correo, clave])
      .then(res => {
        if (res.rows.length > 0) {
          const idUsuario = res.rows.item(0).id_usuario;
          console.log('ID de usuario obtenido:', idUsuario);
          return idUsuario;
        } else {
          // Si no se encuentra ningún usuario, puedes devolver null o algún valor que indique que no se encontró.
          this.presentAlert("Error: Usuario no encontrado");
          return null;
        }
      })
      .catch(e => {
        console.error("Error en select usuario ID:", e);
        throw new Error("Error en select usuario ID: " + JSON.stringify(e));
      });
  }



  obtenerDatosUsuario(idUsuario: number): Promise<any> {
    const query = `
      SELECT usuario.*, rol.nombre_rol, pregunta.pregunta
      FROM usuario
      INNER JOIN rol ON usuario.fk_idrol = rol.id_rol
      INNER JOIN pregunta ON usuario.fk_idpregunta = pregunta.id_pregunta
      WHERE usuario.id_usuario = ?
    `;

    return this.sqlite.create({ name: 'StudyCaravan.db', location: 'default' }).then((db: SQLiteObject) => {
      return db.executeSql(query, [idUsuario]).then(res => {
        let usuario: any = null;

        if (res.rows.length > 0) {
          usuario = {
            id_usuario: res.rows.item(0).id_usuario,
            nombreuser: res.rows.item(0).nombreuser,
            correo: res.rows.item(0).correo,
            clave: res.rows.item(0).clave,
            respuesta: res.rows.item(0).respuesta,
            fk_idrol: res.rows.item(0).fk_idrol,
            id_rol: res.rows.item(0).id_rol,
            fk_idpregunta: res.rows.item(0).fk_idpregunta,
            nombre_rol: res.rows.item(0).nombre_rol,
            pregunta: res.rows.item(0).pregunta,
            foto_usu: res.rows.item(0).foto_usu,
          };
        }

        return usuario;
      });
    });
  }


  //BUSCAR VEHICULO(PARA CAMBIAR PATENTE)
  buscarVehiculo(){
    return this.conexionBD.executeSql('SELECT * FROM vehiculo ', []).then(res => {
      //creo el arreglo para los registros
      let items: Vehiculo[] = [];
      //si existen filas
      if (res.rows.length > 0) {
        //recorro el cursor y lo agrego al arreglo
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            patente: res.rows.item(i).patente,
            marca: res.rows.item(i).marca,
            modelo: res.rows.item(i).modelo,
            cant_asiento: res.rows.item(i).cant_asiento,
            color: res.rows.item(i).color,
            fk_user: res.rows.item(i).fk_user
          })
        }
        console.log(items);       
      }
      //actualizo el observable
      this.listaVehiculo.next(items as any);     
    })
  }



  limpiarTablaUsuarios() {
    return this.conexionBD.executeSql('DELETE FROM usuario', [])
      .then(() => {
        console.log('Registros de la tabla de usuarios eliminados exitosamente');
      })
      .catch(error => {
        console.error('Error al limpiar la tabla de usuarios:', error);
        throw error; // Propaga el error para que pueda ser manejado en la página de inicio
      });
  }

  // En basededatos.service.ts

  getAllUsuarios(): Promise<Usuarios[]> {
    const query = `
    SELECT usuario.*, rol.nombre_rol, pregunta.pregunta
    FROM usuario
    INNER JOIN rol ON usuario.fk_idrol = rol.id_rol
    INNER JOIN pregunta ON usuario.fk_idpregunta = pregunta.id_pregunta
  `;

    return this.conexionBD.executeSql(query, []).then(res => {
      let items: Usuarios[] = [];

      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombreuser: res.rows.item(i).nombreuser,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            respuesta: res.rows.item(i).respuesta,
            fk_idrol: res.rows.item(i).fk_idrol,
            id_rol: res.rows.item(i).id_rol,
            fk_idpregunta: res.rows.item(i).fk_idpregunta,
            foto_usu: res.rows.item(i).foto_usu,
          });
        }
      //actualizo el observable
      this.listaUser.next(items as any);
      }

      return items;
    }).catch(e => {
      console.error("Error al obtener usuarios:", e);
      throw new Error("Error al obtener usuarios: " + JSON.stringify(e));
    });
  }

  //----------------------------------------------------------------------
  //-------------------------------Viajes---------------------------------
  //----------------------------------------------------------------------

  insertarViaje(horasalida: string, asientos_disponibles: number, precio: number, direcinicio: string, direcdestino: string, fk_patente: string): Promise<void> {
    const query = 'INSERT INTO viaje (horasalida, asientos_disponibles, precio, direcinicio, direcdestino, fk_patente) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [horasalida, asientos_disponibles, precio, direcinicio, direcdestino, fk_patente];
  
    return this.conexionBD.executeSql(query, values)
      .then(() => {
        console.log('Viaje insertado correctamente');
      })
      .catch(error => {
        console.error('Error al insertar el viaje:', error);
        throw new Error('Error al insertar el viaje: ' + JSON.stringify(error));
      });
  }
  

  obtenerComunas(): Promise<Comunas[]> {
    return this.conexionBD.executeSql('SELECT * FROM comuna', [])
      .then(res => {
        const comunas: Comunas[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          comunas.push(res.rows.item(i) as Comunas);
        }
        return comunas;
      })
      .catch(error => {
        console.error('Error al obtener comunas:', error);
        throw error;
      });
  }

  obtenerSedes(): Promise<Sedes[]> {
    return this.conexionBD.executeSql('SELECT * FROM sede', [])
      .then(res => {
        const sedes: Sedes[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          sedes.push(res.rows.item(i) as Sedes);
        }
        return sedes;
      })
      .catch(error => {
        console.error('Error al obtener sedes:', error);
        throw error;
      });
  }


  //------------------------Modificar perfil----------------------------------------------



  modicontusu(clave:any,id_usuario:any){
    return this.conexionBD.executeSql('UPDATE usuario SET clave=? WHERE id_usuario=?',[clave,id_usuario]).then(res=>{
      this.getAllUsuarios();
    })
  }
  modinomusu(nombreuser:any,id_usuario:any){
    return this.conexionBD.executeSql('UPDATE usuario SET nombreuser=? WHERE id_usuario=?',[nombreuser,id_usuario]).then(res=>{
      this.getAllUsuarios();
    })
  }
  modipate(patente:any,fk_user:any){
    return this.conexionBD.executeSql('UPDATE vehiculo SET patente=? WHERE id_usuario=?',[patente,fk_user]).then(res=>{
      this.buscarVehiculo();
    })

  }
}