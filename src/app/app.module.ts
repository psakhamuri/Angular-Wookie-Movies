import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
//services
import { MovieDataServices } from "./Services/MovieDataServices";

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
     FormsModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [
    MovieDataServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
