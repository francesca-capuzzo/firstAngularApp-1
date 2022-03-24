import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterModule } from '../../footer/module/footer.module';
import { HeaderModule } from '../../header/module/header.module';
import { WelcomeComponent } from '../welcome.component';



@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FooterModule,
    HeaderModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule { }
