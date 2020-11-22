import { Component, OnInit } from '@angular/core';
import { ModalImgService } from '../../services/modal-img.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styles: [
  ]
})
export class ModalImgComponent implements OnInit {

  imgToUpload: File;
  imgTmp: any = null;





  constructor(
    public modalImgService: ModalImgService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
  }





  closeModal() {

    this.imgTmp = null;
    this.modalImgService.closeModal();
  }





  changeImgProfile( file: File) {

    this.imgToUpload = file;

    if( !file ) { return this.imgTmp = null; }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL( file );

    reader.onloadend = () => this.imgTmp = reader.result;

  }



  uploadImg() {

    const id = this.modalImgService.id;
    const type = this.modalImgService.type;

    this.fileUploadService.updatePhoto( this.imgToUpload, type, id)
      .then( img => {

        Swal.fire('Hecho', 'Imagen actualizada', 'success');
        this.closeModal();
        this.modalImgService.newImg.emit(img);
      });
  }


}
