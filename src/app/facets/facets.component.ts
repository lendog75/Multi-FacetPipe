import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import { FacetOptions } from '../models/facet-filter-options.model';
import { MovieSummary } from '../models/movie-summary.model';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  public facetOptions: FacetOptions;
  public facetGroups: FacetOptions = new FacetOptions({});

  @Input('records')
  set records (value: MovieSummary[]) {
    this._records = value;
    // this.facetGroups = this.getFacetGroups(value);
    this.facetGroups = this.loadFacetGroups(value);
  }

  @Output() public filter: EventEmitter<FacetOptions> = new EventEmitter<FacetOptions>();

  private _records: MovieSummary[];

  get records (): MovieSummary[] {
    return this._records;
  }

  constructor () { }

  ngOnInit () {
    this.facetOptions = new FacetOptions({});
  }

  /**
   * getFacetGroups
   *
   * creates the individual facet groups
   *
   **/
  public getFacetGroups (array: MovieSummary[]): FacetOptions {
    const facetGroups: any = {};
    facetGroups.genre = this.extractData(array, 'genre');
    facetGroups.releaseDate = this.extractData(array, 'releaseDate');
    facetGroups.status = this.extractData(array, 'status');
    facetGroups.isActive = this.extractData(array, 'isActive');

    return facetGroups;
  }

  public loadFacetGroups (array: MovieSummary[]): FacetOptions {
    const facetGroups: FacetOptions = new FacetOptions({});

    facetGroups.genre = new Set<string>();
    facetGroups.releaseDate =  new Set<any>();
    facetGroups.isActive =  new Set<boolean>();


    if(array) {
      array.forEach((x: MovieSummary) => {
        facetGroups.genre.add(x.genre);
        facetGroups.releaseDate.add(x.releaseDate);
        facetGroups.isActive.add(x.isActive);
      });
    }


    return facetGroups;
  }

  /**
   * extractData
   *
   * creates the individual facet groups
   *
   *  @returns any[]
   *
   **/
  public extractData (input: any[], property: string): any[] {
    if (!input) {
      return [];
    }

    const distinctSet: any = new Set();

    from(input).pipe(map((a: any) => {
      return { value: a[property] };
    }))
      .subscribe((x: any) => {
        console.log(x);
        distinctSet.add(x.value);
      });

    return Array.from(distinctSet).sort();
  }

  /**
   * setFacetOptions
   *
   * creates an array of facet selections, and emits the result for the inforce-policy list to use in the facetPipe
   *
   **/
  // public setFacetOptions (group: string, value: string): void {
  //  const facets: FacetFilterOptions = new FacetFilterOptions({
  //    genre: Array.from(this.facetOptions.genre),
  //    releaseDate: Array.from(this.facetOptions.releaseDate),
  //    isActive: Array.from(this.facetOptions.isActive),
  //  });
  //
  //  const hasValue: boolean = facets[group].find((x: string) => x === value);
  //  if (!hasValue) {
  //    facets[group].push(value);
  //  } else {
  //    facets[group].splice(facets[group].indexOf(value), 1);
  //  }
  //
  //  this.facetOptions = facets;
  //  this.filter.emit(facets);
  // }

}
