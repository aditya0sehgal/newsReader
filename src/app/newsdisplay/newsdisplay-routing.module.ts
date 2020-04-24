import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsdisplayPage } from './newsdisplay.page';

const routes: Routes = [
  {
    path: '',
    component: NewsdisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsdisplayPageRoutingModule {}
