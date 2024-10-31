import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SignUpService {
    private apiURL = `${environment.urlApi}/usuarios`;
    constructor(private http: HttpClient) {}

    signUp(usuario: { username: string; email: string; phone: string; password: string; clave: string }) {
        return this.http.post(`${this.apiURL}/crear-usuario`, usuario);  
    }
}
