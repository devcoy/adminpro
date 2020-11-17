import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

    public formSubmitted = false;

    public loginForm = this.fb.group({

        email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        remember: [false]

    });




    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService
    ) { }


    ngOnInit(): void {
        this.renderButton();
    }

    login(): void {

        this.userService.login(this.loginForm.value)
            .subscribe(resp => {

                if (this.loginForm.get('remember').value) {
                    localStorage.setItem('email', this.loginForm.get('email').value);
                } else {
                    localStorage.removeItem('email');
                }

            }, err => {

                console.log(err);
                Swal.fire('Error', err.error.msg, 'error');
            });

    }


    onSuccess(googleUser) {
        // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
        console.log(googleUser.getAuthResponse().id_token);
    }
    onFailure(error) {
        console.log(error);
    }

    renderButton() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'display': 'flex',
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSuccess,
            'onfailure': this.onFailure
        });
    }


}