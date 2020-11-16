import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    public formSubmitted = false;
    public registerForm = this.fb.group({

        name: ['Jorge Cervantes', [Validators.required, Validators.minLength(3)]],
        email: ['jorge@email.com', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password2: ['', [Validators.required, Validators.minLength(8)]],
        terms: [false, [Validators.required]],
    });



    constructor(
        private fb: FormBuilder,
    ) { }


    createUser() {

        this.formSubmitted = true;
        console.log(this.registerForm.value);

        if( this.registerForm.valid ) {

            console.warn('Formulario correcto');

        } else {

            console.warn('Formulario incorrecto');
        }
    }


    fieldNotValid( field: string ): boolean {

        if( this.registerForm.get( field ).invalid && this.formSubmitted ) {
            return true;
        } else {
            return false;
        }

    }



    acceptTerms() {
        return !this.registerForm.get('terms').value && this.formSubmitted;
    }


}
