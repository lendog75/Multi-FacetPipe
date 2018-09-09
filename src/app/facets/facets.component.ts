import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FacetFilterOptions } from '../models/facet-filter-options.model';
import { MovieSummary } from '../models/movie-summary.model';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  public facetOptions: FacetFilterOptions;
  public facetGroups: FacetFilterOptions = new FacetFilterOptions({});

  @Input('records')
  public set records (value: MovieSummary[]) {
    this._records = value;
    this.facetGroups = this.loadFacetGroups(value);
  }

  public get records (): MovieSummary[] {
    return this._records;
  }

  @Output() public filter: EventEmitter<FacetFilterOptions> = new EventEmitter<FacetFilterOptions>();

  private _records: MovieSummary[];

  constructor () { }

  ngOnInit () {
    this.facetOptions = new FacetFilterOptions({});
  }

  public loadFacetGroups (array: MovieSummary[]): FacetFilterOptions {
    const facetGroups: FacetFilterOptions = new FacetFilterOptions({});
    const genereSet = new Set<string>();
    const releaseDateSet = new Set<any>();
    const starsSet = new Set<number>();
    const ratingSet = new Set<string>();

    if (array) {
      array.forEach((x: MovieSummary) => {
        genereSet.add(x.genre);
        releaseDateSet.add(x.releaseDate);
        starsSet.add(x.stars);
        ratingSet.add(x.rating);
      });
    }

    facetGroups.genre = Array.from(genereSet).sort();
    facetGroups.releaseDate = Array.from(releaseDateSet).sort();
    facetGroups.stars = Array.from(starsSet).sort();
    facetGroups.rating = Array.from(ratingSet).sort();

    return facetGroups;
  }

  public setFacetOptions (group: string, value: string): void {
    value = value;
    const facets: FacetFilterOptions = new FacetFilterOptions({
      genre: Array.from(this.facetOptions.genre),
      releaseDate: Array.from(this.facetOptions.releaseDate),
      stars: Array.from(this.facetOptions.stars),
      rating: Array.from(this.facetOptions.rating),
    });

    const hasValue: boolean = facets[group].find((x: any) => x === value);

    if (!hasValue) {
      facets[group].push(value);
    } else {
      facets[group].splice(facets[group].indexOf(value), 1);
    }

    this.facetOptions = facets;
    this.filter.emit(facets);
  }
}
