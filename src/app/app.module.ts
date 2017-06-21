import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileUploadModule} from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './fileUpload/fileUpload.component';

@NgModule({
  declarations: [
    AppComponent,FileUploadComponent
  ],
  imports: [
    BrowserModule,FileUploadModule
  ],
  providers: [],
  bootstrap: [FileUploadComponent]
})
export class AppModule { }
