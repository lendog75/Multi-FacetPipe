import { Pipe, PipeTransform } from '@angular/core';
import { FacetFilterOptions } from '../models/facet-filter-options.model';
import { MovieSummary } from '../models/movie-summary.model';

@Pipe({
  name: 'facetFilter',
})
export class FacetFilterPipe implements PipeTransform {
  public transform(records: MovieSummary[], filterOptions: FacetFilterOptions, filterMetadata: any): MovieSummary[] {
    const items: MovieSummary[] = this.filterItems(records, filterOptions);
    filterMetadata.count = items ? items.length : 0;
    return items;
  }

  private intersection(arrayA: any[], arrayB: any[]): any[] {
    return arrayA.filter((x: any) => arrayB.find((y: any) => x.id === y.id));
  }

  private getMatchMap(records: any[], filterOptions: FacetFilterOptions): Map<string, any[]> {

    // setup matchMap, to hold an array of matches for each filter, keyed by filter name
    const matchMap: Map<string, any[]> = new Map<string, any[]>()
    Object.keys(filterOptions).forEach((filter: any) => {
      matchMap.set(filter, []);
    });

    // load the matchMap
    records.forEach((summary: MovieSummary) => {
      Object.keys(filterOptions).forEach((filter: any) => {
        if (summary[filter] === filterOptions[filter].find((x: any) => x === summary[filter])) {
          const arr: any[] = matchMap.get(filter);
          arr.push(summary);
          matchMap.set(filter, arr);
        }
      });
    });

    return matchMap;
  }

  private filterItems(records: MovieSummary[], filterOptions: FacetFilterOptions): MovieSummary[] {
    let intersectionArray: any[] = records;

    // short circuit if no records
    if (!records) {
      return records;
    }

    const matchMap: Map<string, string[]> = this.getMatchMap(records, filterOptions)

    // find intersections form all of the arrays of matches
    matchMap.forEach((matches: any[], key: string) => {
      intersectionArray = matches.length ? this.intersection(intersectionArray, matches) : intersectionArray;
    });

    return intersectionArray;
  }
}
