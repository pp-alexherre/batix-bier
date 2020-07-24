import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { UploadFileService } from 'src/app/_services/upload-file.service';
import { LoadingService } from 'src/app/_services/loading/loading.service';

@Component({
  selector: 'bx-tpl-upload-form',
  templateUrl: './tpl-upload-form.component.html',
  styleUrls: ['./tpl-upload-form.component.less']
})
export class TplUploadFormComponent implements OnInit {

  public file:File = null
  public progressBarWidth: number;
  public progressStatusInfoText:boolean;
  public progressStatusText: string;

  constructor(
    private _uploadFileService: UploadFileService,
    private _loadingSerice: LoadingService
    ) { 
    this.progressBarWidth = 0;
    this.progressStatusInfoText = false;
    this.progressStatusText = 'loading...';
  }

  ngOnInit() {
  }

  onSelectFile(event){
    console.log(event);
    this.file = <File>event.target.files[0];
  }

  onUploadFile(event){
    console.log('this.file --> ',this.file);
    this._uploadFileService.uploadFile(this.file).subscribe( (res:any) => {
      console.log('Server Response Upload File --> ', res);

      if(!res.value){
        this.progressStatusInfoText = true;
        console.log('keinen Prozent Wert --> ', res.statustext);
        this.progressStatusText = `${res.statustext}`;
        res.statustext == undefined ? this.progressStatusText = `loading...` : this.progressStatusText =  res.statustext;
      }
     
      this.progressBarWidth = res.value;
      if( res.value === 100 ){
        setTimeout(() => {
          this._loadingSerice.isLoading.subscribe((status:boolean) => {
            if(!status){
              // this._uploadFileService.statusUploadedPing.emit(true);
              location.reload();
            }
          })
          
          //  this._uploadFileService.statusFileUploadBoxPing.emit(false);
           
          setTimeout(() => { 
            this.progressStatusInfoText = false,
            this._uploadFileService.statusFileUploadBoxPing.emit(false);
            // location.reload();
          },5000);
        },1500)
      }
    })
  }

  closeBox():void{
    this._uploadFileService.statusFileUploadBoxPing.emit(false);
  }
}
