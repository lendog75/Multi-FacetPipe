import { Pipe, PipeTransform } from '@angular/core';
import { FacetFilterOptions } from '../models/facet-filter-options.model';

@Pipe({
  name: 'facetFilter',
})
export class FacetFilterPipe implements PipeTransform {
  public transform (records: any[], filterOptions: FacetFilterOptions, filterMetadata: any): any[] {
    // short circuit if no records
    if (!records) {
      return records;
    }

    let intersectionArray: any[] = records;
    const matchMap: Map<string, string[]> = this.getMatchMap(records, filterOptions);

    // find intersections form all of the arrays of matches
    matchMap.forEach((matches: any[], key: string) => {
      intersectionArray = matches.length ? this.intersection(intersectionArray, matches) : intersectionArray;
    });

    filterMetadata.count = intersectionArray ? intersectionArray.length : 0;
    return intersectionArray;
  }

  private intersection (arrayA: any[], arrayB: any[]): any[] {
    return arrayA.filter((x: any) => arrayB.find((y: any) => x.id === y.id));
  }

  private getMatchMap (records: any[], filterOptions: FacetFilterOptions): Map<string, any[]> {
    // setup matchMap, to hold an array of matches for each filter, keyed by filter name
    const matchMap: Map<string, any[]> = new Map<string, any[]>();
    Object.keys(filterOptions).forEach((filter: any) => {
      matchMap.set(filter, []);
    });

    Object.keys(filterOptions).forEach((filter: any) => {
      const arr = records.filter(x => filterOptions[filter].includes(x[filter]));
      matchMap.set(filter, arr);
    });

    return matchMap;
  }
}
