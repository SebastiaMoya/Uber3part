import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicarViajePageRoutingModule } from './publicar-viaje-routing.module';

import { PublicarViajePage } from './publicar-viaje.page';

import { ComponentsModule } from 'src/app/components/components.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PublicarViajePageRoutingModule
  ],
  declarations: [PublicarViajePage]
})
export class PublicarViajePageModule {}
