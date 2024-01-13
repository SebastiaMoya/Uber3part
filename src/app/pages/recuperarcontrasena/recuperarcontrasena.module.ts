import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarcontrasenaPageRoutingModule } from './recuperarcontrasena-routing.module';

import { RecuperarcontrasenaPage } from './recuperarcontrasena.page';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RecuperarcontrasenaPageRoutingModule
  ],
  declarations: [RecuperarcontrasenaPage]
})
export class RecuperarcontrasenaPageModule {}
