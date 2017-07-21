import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeCalcPage } from './pe-calc';

@NgModule({
  declarations: [
    PeCalcPage,
  ],
  imports: [
    IonicPageModule.forChild(PeCalcPage),
  ],
  exports: [
    PeCalcPage
  ]
})
export class PeCalcPageModule {}
