import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise( (resolve, reject) =>{


    //   if( false ) {

    //     resolve('Hola mundo');
    //   } else {

    //     reject('Algo salio mal');
    //   }


    // });

    // promesa.
    //   then( (res) => {
    //     console.log('Hey, termine');
    //     console.log(res);
    //   })
    //   .catch( err => {
    //     console.log(err);
    //   });


    // console.log('Fin del init');

    this.getUsuarios()
    .then( usuarios => {
      console.log(usuarios);
    });


  }


  getUsuarios() {

    const url = 'https://reqres.in/api/users';

    return new Promise( (resolve) => {


      fetch( url )
        .then( res => res.json())
        .then( body => resolve( body.data) );
    });

    // return promesa;

  }

}
