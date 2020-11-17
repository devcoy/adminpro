import { Component, OnInit, NgZone } from '@angular/core';
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
export class LoginComponent implements OnInit {

    public formSubmitted = false;
    public auth2: any;

    public loginForm = this.fb.group({

        email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        remember: [false]

    });




    constructor(
        private fb: FormBuilder,
        private router: Router,
        private userService: UserService,
        private ngZone: NgZone
    ) { }


    ngOnInit(): void {
        this.renderButton();
    }

    login(): void {

        this.userService.login(this.loginForm.value)
            .subscribe(resp => {

                if (this.loginForm.get('remember').value) {

                    localStorage.setItem('email', this.loginForm.get('email').value);

                    // Navegar al Dashboard
                    this.router.navigateByUrl('/');

                } else {

                    localStorage.removeItem('email');
                }

            }, err => {

                console.log(err);
                Swal.fire('Error', err.error.msg, 'error');
            });

    }


    onSuccess(googleUser) {
    }
    onFailure(error) {
        console.log(error);
    }

    renderButton() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
        });
        this.startApp();
    }


    startApp() {
        gapi.load('auth2', () => {
            // Retrieve the singleton for the GoogleAuth library and set up the client.
            this.auth2 = gapi.auth2.init({
                client_id: '854454108413-v9jce5b17md35enuvo3840fva977jqve.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
            });
            this.attachSignin(document.getElementById('my-signin2'));
        });
    };



    attachSignin(element) {

        // console.log(element.id);
        this.auth2.attachClickHandler(element, {},
            (googleUser) => {

                const tokenGoogle = googleUser.getAuthResponse().id_token;
                this.userService.loginGoogle(tokenGoogle).subscribe( resp => {

                    this.ngZone.run( () => {
                        // Navegar al Dashboard
                        this.router.navigateByUrl('/');

                    });

                }, error => {
                    console.error('No se pudo hacer el login con Google');

                });

            }, (error) => {

                alert(JSON.stringify(error, undefined, 2));
            });
    }


}