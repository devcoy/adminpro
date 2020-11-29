import { environment } from '../../environments/environment';

const BASE_URL = environment.base_url;

export class Usuario {

    public nombre: string;
    public email: string;
    public password: string;
    public img: string;
    public google: boolean;
    public role: 'ADMIN_ROLE' | 'USER_ROLE';
    public uid: string;



    constructor(
        nombre: string,
        email: string,
        password?: string,
        img?: string,
        google?: boolean,
        role?: 'ADMIN_ROLE' | 'USER_ROLE',
        uid?: string
    ) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.img = img;
        this.google = google;
        this.role = role;
        this.uid = uid;
    }


    get imgUrl(): string {

        if( !this.img) {
            return `${BASE_URL}/upload/usuarios/no-image`;

        } else if (this.img.includes('https')) {
            return this.img;

        } else if (this.img) {
            return `${BASE_URL}/upload/usuarios/${this.img}`;

        } else {
            return `${BASE_URL}/upload/usuarios/no-image`;
        }
    }
}
