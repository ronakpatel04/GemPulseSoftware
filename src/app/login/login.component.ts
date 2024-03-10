import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username!: string;
  password!: string;
  passwordVisible: boolean = false;
  loading: boolean = false; // Added loading state variable

  constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) { }

  login(): void {
    this.loading = true;
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.toastr.success('Login Successfull !', 'Success');

        this.router.navigate(['/main']);
      },
      (error) => {
        this.loading = false;
      },
      () => {
        this.loading =false
      }
    );
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

}
