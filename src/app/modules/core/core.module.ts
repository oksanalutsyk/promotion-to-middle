import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';

//components
import { HeaderComponent } from './components/header/header.component';
import { LeftSideMenuComponent } from './components/left-side-menu/left-side-menu.component';
import { TermsAndPolicyComponent } from './components/terms-and-policy/terms-and-policy.component';
import { AddArticleComponent } from "./forms/add-article/add-article.component";

@NgModule({
  declarations: [
    HeaderComponent,
    LeftSideMenuComponent,
    TermsAndPolicyComponent,
    AddArticleComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[
    HeaderComponent,
    LeftSideMenuComponent,
  ]
})
export class CoreModule { }
