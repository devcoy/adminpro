import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '../../services/user.service';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public formSubmitted = false;

    public registerForm = this.fb.group({

        nombre: ['Dummy', [Validators.required, Validators.minLength(3)]],
        email: ['dummy@email.com', [Validators.required, Validators.email]],
        password: ['123456789', [Validators.required, Validators.minLength(8)]],
        password2: ['123456789', [Validators.required, Validators.minLength(8)]],
        terms: [true, [Validators.required]],

    }, {
        validators: this.passwordEquals('password', 'password2')
    });



    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) { }




    createUser(): void {

        this.formSubmitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        // Realizar el post
        this.userService.createUser(this.registerForm.value)
            .subscribe(
                resp => {

                    // Navegar al Dashboard
                    this.router.navigateByUrl('/');
                },
                (err) => {

                    // Si hay un error
                    Swal.fire('Error', err.error.msg, 'error');

                });
    }




    fieldNotValid(field: string): boolean {

        if (this.registerForm.get(field).invalid && this.formSubmitted) {
            return true;
        } else {
            return false;
        }

    }




    passwordNotValid(): boolean {

        const password1 = this.registerForm.get('password').value;
        const password2 = this.registerForm.get('password2').value;

        if (password1 !== password2 && this.formSubmitted) {
            return true;
        } else {
            return false;
        }

    }





    acceptTerms(): boolean {
        return !this.registerForm.get('terms').value && this.formSubmitted;
    }


    passwordEquals(password1Name: string, password2Name: string) {

        return (formGroup: FormGroup) => {

            const password1Control = formGroup.get(password1Name);
            const password2Control = formGroup.get(password2Name);

            if (password1Control.value === password2Control.value) {

                password2Control.setErrors(null);

            } else {

                password2Control.setErrors({ notEquals: true });
            }

        }

    }
}
