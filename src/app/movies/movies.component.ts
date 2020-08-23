import {Component, Input ,HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import { MovieDataServices } from "../Services/MovieDataServices";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {
  public MoviesArray: {
    movies:[{
      genres
    }],
  };
  public displayGenres: any;
  public displayMovies:any;
  public displaymoviewithgenres:any;
  public passSearchValue:any;
  public  SearchedArray:{
    movies:[{
      genres
    }],
   };
  
  constructor(public MovieDataServices:MovieDataServices,
    private router:Router,
    private http: HttpClient) { 
  }

  ngOnInit() {
    //store the retrived data in an array
    this.MovieDataServices.getMoviesData().subscribe((data) => {
      this.MoviesArray = data
      this.displayMovies = this.MoviesArray.movies
    //  console.log(this.MoviesArray.movies);
    //  console.log(this.displayMovies);

     //separate genres from an array 
     let AllGenres:Array<string> =[];

     let movies1 =this.MoviesArray.movies;
    for (let i = 0; i < movies1.length; i++) {
      movies1[i].genres.forEach(item=>{
        if(!AllGenres.includes(item)){
          AllGenres.push(item);
        }
      });
      //movies by genres

      let moviesbyGenres:Array<any>=[];
      for (let i = 0; i < movies1.length; i++) {
        for (let j = 0; j < AllGenres.length; j++) {
          movies1[i].genres.forEach(item=>{
            if(item==AllGenres[j]){
              let movieswithGenres ={
              "movie":movies1[i],
              "genre":AllGenres[j]
              }
              moviesbyGenres.push(movieswithGenres);
            
          }
          });
      
  }
      }
    //console.log(">>>>>>>>>>",AllGenres); 
    this.displayGenres = AllGenres;
    this.displaymoviewithgenres= moviesbyGenres;
    //console.log("222",this.displaymoviewithgenres); 
    }
    });
  }
  //Search key input retriral and assigning new values
  onKey(event) {
    const inputValue = event.target.value;
    this.passSearchValue = inputValue;
    //console.log(inputValue);
  
    this.getSearchData().subscribe((data) => {
      this.SearchedArray = data;
     
      let Searchedmovies =this.SearchedArray.movies;
      let FinalSearch:Array<any>=[];
      for (let i = 0; i < Searchedmovies.length; i++) {
      let moviesSearched ={
        "movie":Searchedmovies[i]
        }
      FinalSearch.push(moviesSearched);
      this.displaymoviewithgenres = FinalSearch;
      }
    });
  }
  //get the search data from api
  getSearchData(): Observable<any> {
    return this.http
      .get(`https://wookie.codesubmit.io/movies?q=${this.passSearchValue}`, {
        headers: new HttpHeaders()
          .set('Authorization','Bearer Wookie2019')
      })
      .pipe( tap(ev => console.log(ev)),
        map((response) => response),
        catchError((error: any) => observableThrowError(error)
        )
      );
  }
  
}
