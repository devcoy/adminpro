interface _HospitalUser {

    nombre: string;
    _id: string;
    img: string;
}


export class Hospitals {

    constructor(
        public nombre: string,
        public _id?: string,
        public img?: string,
        public usuario?: _HospitalUser,

    ) {}
}