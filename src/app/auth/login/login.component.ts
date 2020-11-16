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

        email: ['dummy@email.com', [Validators.required, Validators.email]],
        password: ['123456789', [Validators.required, Validators.minLength(8)]],
        remember: [ false ]

    });




    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService
    ) { }

    login() {

        this.userService.login( this.loginForm.value )
            .subscribe( resp => {
                console.warn(resp);
            }, err => {
                console.log(err);
                Swal.fire('Error', err.error.msg, 'error');
            });

    }


}