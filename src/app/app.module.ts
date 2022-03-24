import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WrapperModule } from './components/wrapper/module/wrapper.module';
import { WelcomeModule } from './components/welcome/module/welcome.module';
import { FooterModule } from './components/footer/module/footer.module';


//creo 2 moduli: welcome e wrapper
//creo sharedmodule
//shared-wrapper-welcome 


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    WrapperModule,
    WelcomeModule,
    FooterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
