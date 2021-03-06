import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material/material.module';

//components
import { HeaderComponent } from './components/header/header.component';
import { LeftSideMenuComponent } from './components/left-side-menu/left-side-menu.component';
import { TermsAndPolicyComponent } from './components/terms-and-policy/terms-and-policy.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftSideMenuComponent,
    TermsAndPolicyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    LeftSideMenuComponent,
  ]
})
export class CoreModule { }
