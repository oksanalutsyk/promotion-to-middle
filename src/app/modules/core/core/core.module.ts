import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../modules/material/material.module';

//components
import { HeaderComponent } from '../components/header/header.component';
import { LeftSideMenuComponent } from '../components/left-side-menu/left-side-menu.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftSideMenuComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    HeaderComponent,
    LeftSideMenuComponent,
  ]
})
export class CoreModule { }
