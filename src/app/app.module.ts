import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import {  UploaderModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DiagramModule,
    ButtonModule,
    UploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
