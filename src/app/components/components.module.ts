import { NgModule } from '@angular/core';
import { Comp1Component } from './comp1/comp1.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [Comp1Component],
    exports: [Comp1Component],
    imports: [
        IonicModule
    ]
})

export class ComponentsModule{}