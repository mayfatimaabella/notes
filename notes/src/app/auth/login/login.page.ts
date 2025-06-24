import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  async onLogin() {
    try {
      const userCredential = await this.authService.login(this.email, this.password);
      alert('Login successful!');
      // Redirect to home or dashboard
      this.router.navigate(['/home']);
    } catch (error: any) {
      alert(error.message || 'Login failed');
    }
  }
}
