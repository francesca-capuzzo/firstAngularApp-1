import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FooterModule } from '../../footer/module/footer.module';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FooterModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class WelcomeModule { }
