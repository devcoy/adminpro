interface _HospitalUser {

    name: string;
    _id: string;
    img: string;
}


export class Hospitals {

    constructor(
        public name: string,
        public _id?: string,
        public img?: string,
        public user?: _HospitalUser,

    ) {}
}