import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarviajePageRoutingModule } from './buscarviaje-routing.module';

import { BuscarviajePage } from './buscarviaje.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    BuscarviajePageRoutingModule
  ],
  declarations: [BuscarviajePage]
})
export class BuscarviajePageModule {}
