import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const userCredential = await this.authService.register(this.name, this.email, this.password);
      alert('Registration successful!');
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(error.message || 'Registration failed');
    }
  }
}
