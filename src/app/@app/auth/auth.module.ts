import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule, COMPONENTS } from './auth-routing.module';
import { AuthService } from './auth.service';
import { SharedModule } from 'src/app/@shered/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthService]
})
export class AuthModule { }
