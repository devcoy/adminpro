export class Usuario {
    nombre: any;

    constructor(
        nombre: string,
        email: string,
        password?: string,
        img?: string,
        google?: boolean,
        role?: string,
        uid?: string
    ) {
        this.nombre = nombre;
    }

    imprimirUsuario() {
        console.log( this.nombre );
    }
}