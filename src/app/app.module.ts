import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchPhoneComponent } from './search-phone/search-phone.component';
import { HttpModule } from '@angular/http';
import { PhoneService } from './services/phone.service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import * as $ from "jquery";

@NgModule({
  declarations: [
    AppComponent,
    SearchPhoneComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule

  ],
  providers: [PhoneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
