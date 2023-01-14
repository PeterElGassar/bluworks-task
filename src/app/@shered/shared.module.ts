import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../@app/auth/auth.service';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
 FooterComponent,
 HeaderComponent
];

@NgModule({
  declarations: [ ...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports:[...COMPONENTS],
  providers:[AuthService]
})
export class SharedModule { }
