import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import { MovieDataServices } from "../Services/MovieDataServices";


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  public MoviesArray: {
    movies:[],
    genres:[]
  };

  constructor(public MovieDataServices:MovieDataServices) { }

  ngOnInit() {
    this.MovieDataServices.getMoviesData().subscribe((data) => {
      this.MoviesArray = data;


     console.log(this.MoviesArray);
     console.log(this.MoviesArray.movies);

    //  var genres = [];
    //  let movies1 =this.MoviesArray;
    // for (var i = 0; i < movies1.length; i++) {
    //  // genres = movies1[i].movies.genres;
    //     console.log(movies1[i].genres);
    // }

    });
  }

}
