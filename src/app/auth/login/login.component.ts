import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    public formSubmitted = false;

    public loginForm = this.fb.group({

        email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
        password: [ '', [Validators.required, Validators.minLength(8)]],
        remember: [ false ]

    });




    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService
    ) { }

    login(): void {

        this.userService.login( this.loginForm.value )
            .subscribe( resp => {

                if( this.loginForm.get('remember').value) {
                    localStorage.setItem('email', this.loginForm.get('email').value );
                } else {
                    localStorage.removeItem('email');
                }

            }, err => {

                console.log(err);
                Swal.fire('Error', err.error.msg, 'error');
            });

    }


}