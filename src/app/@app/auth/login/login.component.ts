import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/@core/data/User';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router, private activeRoute: ActivatedRoute) {


  }
  loginForm: FormGroup;
  errorMessage: string = '';
  ngOnInit(): void {
    this.returnUrl = this.activeRoute.snapshot.queryParams.returnUrl || '/home'
    this.initialLoginForm();
  }


  initialLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(): void {
    this.authService.Login(this.loginForm.getRawValue()).subscribe(
      () => {
        this.router.navigateByUrl(this.returnUrl);     
      },
      (error: any) => {
        this.errorMessage = 'Invalid User Name or Password';
      }
    );
  }
}
