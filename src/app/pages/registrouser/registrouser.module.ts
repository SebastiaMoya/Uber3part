import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrouserPageRoutingModule } from './registrouser-routing.module';

import { RegistrouserPage } from './registrouser.page';

import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RegistrouserPageRoutingModule
  ],
  declarations: [RegistrouserPage]
})
export class RegistrouserPageModule {}
