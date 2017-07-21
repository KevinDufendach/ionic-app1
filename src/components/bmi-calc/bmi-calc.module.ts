import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { BmiCalcComponent } from './bmi-calc';

@NgModule({
  declarations: [
    BmiCalcComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    BmiCalcComponent
  ]
})
export class BmiCalcComponentModule {}
