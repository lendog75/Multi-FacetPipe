import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieSummary } from '../models/movie-summary.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private http: HttpClient) { }

  /**
   * getMovieList
   *
   * gets the list of movie summaries
   *
   * @return {Observable<MovieSummary[]>}
   **/
  public get(): Observable<MovieSummary[]> {
    return this.http.get<MovieSummary[]>('./assets/data/movies-all.json');
  }
}
