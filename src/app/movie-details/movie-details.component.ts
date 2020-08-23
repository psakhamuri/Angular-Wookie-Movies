import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MovieDataServices } from "../Services/MovieDataServices";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  public MoviesArray:{
    movies:[{
      title:any;
    }]
  };
  public moviesDisplay;
  public displayDetails:any;
  

  constructor(private _location: Location,
    public MovieDataServices:MovieDataServices,
    private router:Router,
    private route:ActivatedRoute,
    private commonmodule:CommonModule) { }

  ngOnInit() {

    this.MovieDataServices.getMoviesData().subscribe((data) => {
      this.MoviesArray = data;
    
    let parmTitle =this.route.snapshot.params['title'];
    let moviesData = this.MoviesArray.movies;
    
    let MovieDetails:Array<any>=[];
    for (let i = 0; i < moviesData.length; i++) {
      if(moviesData[i].title == parmTitle){
      MovieDetails.push(moviesData[i]);
      }
    }
    this.displayDetails = MovieDetails;
    console.log(this.displayDetails);
  });
  }
}
