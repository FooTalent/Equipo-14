import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { RouterModule } from '@angular/router';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';

  emailError: string | null = null;
  phoneError: string | null = null;
  passwordError: string | null = null;

  constructor(private signUpService: SignUpService, private router: Router) {} 

  validateEmail(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailError = emailPattern.test(this.email) ? null : 'Por favor, introduce un correo electrónico válido.';
  }

  validatePhone(): void {
    const phonePattern = /^[0-9]{10,}$/;
    this.phoneError = phonePattern.test(this.phone) ? null : 'Introduce un número de teléfono válido (10 dígitos).';
  }

  validatePassword(): void {
    this.passwordError = this.password.length >= 8 ? null : 'La contraseña debe tener al menos 8 caracteres.';
  }

  onSignUp(): void {
    this.validateEmail();
    this.validatePhone();
    this.validatePassword();

    if (this.emailError || this.phoneError || this.passwordError) {
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password,
      clave: this.password
    };

    this.signUpService.signUp(userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);

        this.router.navigate(['/Login']); 
      },
      error: (error) => {
        console.error('Error en el registro:', error);
      }
    });

    this.resetForm();
  }

  resetForm(): void {
    this.username = '';
    this.email = '';
    this.phone = '';
    this.password = '';
  }
}
