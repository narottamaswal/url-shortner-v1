import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UrlShortnerV1';
  model={
    inputUrl:""
  }
  isFormSubmitted=false;
  isLoading=false;
  shortUrl="";
  isTextCopied=false;
  constructor(private tinyUrl:NgTinyUrlService) {
  }
  
  onSubmitUrlForm(urlForm:any) {
    if(urlForm.valid){
      this.isLoading=true;
      this.tinyUrl.shorten(this.model.inputUrl).subscribe((data)=>{
        this.shortUrl=data;
        this.isFormSubmitted=true;
        this.isLoading=false;
      },(error)=>{
        alert("Something went wrong");
        this.isLoading=false;
      });
    }
  }


  reset(){
    this.model.inputUrl="";
    this.isFormSubmitted=false;
    this.isTextCopied=false;
  }

  copy(shortUrlElementRef: { innerHTML: string; }){
    let inputElement = document.createElement("input");
    inputElement.setAttribute('type','text');
    inputElement.setAttribute('value',shortUrlElementRef.innerHTML);
    inputElement.select();
    inputElement.setSelectionRange(0,900000);
    try{
      navigator.clipboard.writeText(inputElement.value);
      setTimeout(()=>{
        this.isTextCopied=false;
      },2000);
    }catch(e:any){
      console.log(e.toString());
    }
  }
}
