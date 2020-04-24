import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsdisplayPageRoutingModule } from './newsdisplay-routing.module';

import { NewsdisplayPage } from './newsdisplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsdisplayPageRoutingModule
  ],
  declarations: [NewsdisplayPage]
})
export class NewsdisplayPageModule {}
