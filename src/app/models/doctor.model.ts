import { Hospital } from './hospitals.model';

interface _DoctorlUser {

    nombre: string;
    _id: string;
    img: string;
}


export class Doctor {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _DoctorlUser,
        public hospital?: Hospital // Importo el model del Hospital

    ) {}
}