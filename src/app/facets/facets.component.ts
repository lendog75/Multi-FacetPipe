import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MovieSummary } from '../models/movie-summary.model';
import { FacetFilterOptions } from '../models/facet-filter-options.model';

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})
export class FacetsComponent implements OnInit {
  public facetOptions: FacetFilterOptions;
  public facetGroups: FacetFilterOptions = new FacetFilterOptions({});

  @Input('records')
  set records(value: MovieSummary[]) {
    this._records = value;
    this.facetGroups = this.loadFacetGroups(value);
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

  public loadFacetGroups (array: MovieSummary[]): FacetFilterOptions {
    const facetGroups: FacetFilterOptions = new FacetFilterOptions({});
    const genereSet = new Set<string>();
    const releaseDateSet = new Set<any>();
    const isActiveSet = new Set<boolean>();

    if (array) {
      array.forEach((x: MovieSummary) => {
        genereSet.add(x.genre);
        releaseDateSet.add(x.releaseDate);
        isActiveSet.add(x.isActive);
      });
    }

    facetGroups.genre = Array.from(genereSet).sort();
    facetGroups.releaseDate = Array.from(releaseDateSet).sort();
    facetGroups.isActive = Array.from(isActiveSet).sort();

    return facetGroups;
  }

  public setFacetOptions(group: string, value: string): void {
    value = value.toString();
    const facets: FacetFilterOptions = new FacetFilterOptions({
      genre: Array.from(this.facetOptions.genre),
      releaseDate: Array.from(this.facetOptions.releaseDate),
      status: Array.from(this.facetOptions.status),
      isActive: Array.from(this.facetOptions.isActive),
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
