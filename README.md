# UrlShortnerV1

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
### Customize the component's template (app.component.html) to include form inputs, buttons, and display areas as needed, and style it (app.component.css) to match your application's design.
