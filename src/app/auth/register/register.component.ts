import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {


    registerForm = this.fb.group({

        name: ['Jorge Cervantes', [Validators.required, Validators.minLength(3)]],
        email: ['dummy1@email.com', [Validators.required, Validators.email]],
        password: ['qwerty123', [Validators.required, Validators.minLength(8)]],
        password2: ['qwerty123', [Validators.required, Validators.minLength(8)]],
        terms: [false, [Validators.required]],
    });



    constructor(
        private fb: FormBuilder,
    ) { }


    createUser() {
        console.log(this.registerForm.value);
    }


}
