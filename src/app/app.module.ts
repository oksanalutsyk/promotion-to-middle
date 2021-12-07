import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// components
import { HeaderComponent } from './modules/core/components/header/header.component';
import { LeftSideMenuComponent } from './modules/core/components/left-side-menu/left-side-menu.component';

// modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/core/modules/material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftSideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
