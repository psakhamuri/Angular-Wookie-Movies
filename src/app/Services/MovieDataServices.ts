import {BehaviorSubject, Observable, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class MovieDataServices {

    constructor(private http: HttpClient) { }

    getMoviesData(): Observable<any> {
        return this.http
          .get(`https://wookie.codesubmit.io/movies`, {
            headers: new HttpHeaders()
              .set('Authorization','Bearer Wookie2019')
          })
          .pipe( tap(),
            map((response) => response),
            catchError((error: any) => observableThrowError(error)
            )
          );
      }
}