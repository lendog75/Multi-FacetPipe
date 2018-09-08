import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieSummary } from '../models/movie-summary.model';
import { FacetFilterOptions } from '../models/facet-filter-options.model';
import { from } from 'rxjs';
import { map } from 'rxjs/internal/operators';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  public facetOptions: FacetFilterOptions;
  public facetGroups: any = {};

  @Input('records')
  set records(value: MovieSummary[]) {
    this._records = value;
    this.facetGroups = this.getFacetGroups(value);
  }
  @Output() public filter: EventEmitter<FacetFilterOptions> = new EventEmitter<FacetFilterOptions>();

  private _records: MovieSummary[];

  get records(): MovieSummary[] {
    return this._records;
  }
  constructor() { }

  ngOnInit() {
    this.facetOptions = new FacetFilterOptions({});
  }

  /**
   * getFacetGroups
   *
   * creates the individual facet groups
   *
   **/
  public getFacetGroups(array: MovieSummary[]): void {
    const facetGroups: any = {};
    facetGroups.genre = this.extractData(array, 'genre');
    facetGroups.releaseDate = this.extractData(array, 'releaseDate');
    facetGroups.status = this.extractData(array, 'status');
    facetGroups.isActive = this.extractData(array, 'isActive');

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
  public extractData(input: any[], property: string): any[] {
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
  public setFacetOptions(group: string, value: string): void {
    const facets: FacetFilterOptions = new FacetFilterOptions({
      genre: Array.from(this.facetOptions.genre),
      releaseDate: Array.from(this.facetOptions.releaseDate),
      status: Array.from(this.facetOptions.status),
      isActive: Array.from(this.facetOptions.isActive),
    });

    const hasValue: boolean = facets[group].find((x: string) => x === value);
    if (!hasValue) {
      facets[group].push(value);
    } else {
      facets[group].splice(facets[group].indexOf(value), 1);
    }

    this.facetOptions = facets;
    this.filter.emit(facets);
    //this.filter = facet;
  }

}
