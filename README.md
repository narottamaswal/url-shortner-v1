# Url Shortner

# Angular TinyURL Shortener

This project demonstrates how to create a URL shortener using Angular and the TinyURL package.

## Installation

Install the `ng-tiny-url` package using npm:

```=
npm install ng-tiny-url
```


## Import the necessary module and service into your Angular component:

```
import { Component } from '@angular/core';
import { NgTinyUrlService } from 'ng-tiny-url';
```

### Component Setup
#### Define your component with its template and styling:

```
Copy code
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Component properties and methods go here
}

```


### Component Logic
#### Inside your component class, initialize necessary variables and inject the NgTinyUrlService:

```
export class AppComponent {
  title = 'UrlShortenerV1';
  model = {
    inputUrl: ""
  };
  isFormSubmitted = false;
  isLoading = false;
  shortUrl = "";
  isTextCopied = false;

  constructor(private tinyUrl: NgTinyUrlService) {}

  // Methods for form submission, resetting, and copying URL go here
}
```
### Form Submission
#### Implement a method to handle form submission, where you call the shorten() method of NgTinyUrlService:

```
Copy code
onSubmitUrlForm(urlForm: any) {
  if (urlForm.valid) {
    this.isLoading = true;
    this.tinyUrl.shorten(this.model.inputUrl).subscribe(
      (data) => {
        this.shortUrl = data;
        this.isFormSubmitted = true;
        this.isLoading = false;
      },
      (error) => {
        alert("Something went wrong");
        this.isLoading = false;
      }
    );
  }
}

```

### Resetting Form
#### Implement a method to reset the form and associated flags:

```
reset() {
  this.model.inputUrl = "";
  this.isFormSubmitted = false;
  this.isTextCopied = false;
}
```
### Copying Short URL
#### Implement a method to copy the shortened URL to the clipboard:

```
Copy code
copy(shortUrlElementRef: { innerHTML: string }) {
  let inputElement = document.createElement("input");
  inputElement.setAttribute('type', 'text');
  inputElement.setAttribute('value', shortUrlElementRef.innerHTML);
  inputElement.select();
  inputElement.setSelectionRange(0, 900000);
  try {
    navigator.clipboard.writeText(inputElement.value);
    setTimeout(() => {
      this.isTextCopied = false;
    }, 2000);
  } catch (e: any) {
    console.log(e.toString());
  }
}
```
Customize the component's template (app.component.html) to include form inputs, buttons, and display areas as needed, and style it (app.component.css) to match your application's design.

## Hosting the application on Firebase
```
npm install -g firebase-tools
firebase login
firebase init
```

#### Choose the only hosting option.
```
ng build --configuration production
firebase deploy -m "commit message" --only hosting
```
#### App is deployed  <a href="https://url-shortner-1f467.web.app/" >https://url-shortner-1f467.web.app/ </a> </br>
![image](https://github.com/narottamaswal/url-shortner-v1/assets/65083220/204cc42c-19cc-4897-aadb-1552f5a9e84a) </br></br>
![image](https://github.com/narottamaswal/url-shortner-v1/assets/65083220/72e3e781-f673-4355-9710-a6d21cd5d67c)


