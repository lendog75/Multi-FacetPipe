import { Component, OnInit } from '@angular/core';
import { MovieService } from './providers/movie.service';
import { MovieSummary } from './models/movie-summary.model';
import { FacetFilterOptions } from './models/facet-filter-options.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  public movies: MovieSummary[];
  public filters: FacetFilterOptions;
  public filterMetadata: any = { count: 0 };

  constructor(private movieService: MovieService) {
  }

  public ngOnInit(): void {
    this.filters = new FacetFilterOptions({});

    this.movieService.get()
      .subscribe((movies: MovieSummary[]) => {
        this.movies = movies;
      });
  }

  /**
   * setFacetOptions
   *
   * emits the newly set filter
   *
   **/
  public setFilter(filter: FacetFilterOptions): void {
    this.filters = filter;
  }

}
