import { Pipe, PipeTransform } from '@angular/core';
import { FacetOptions } from '../models/facet-filter-options.model';
import { MovieSummary } from '../models/movie-summary.model';

// filter for N facets of data
// each facet has dynamic values derived from the original array.
// it was required that we filter using "or" logic within the facet and "and" logic between
// given the complexity and desired "dynamic-ness" we create an array of matches for each facet, thus providing the "or" logic
// from there we find the intersections between the individual facet arrays, thus providing the "and" logic
//
// Key concepts:
// MatchMap:
// a Map<string, any[]>, essentially a key/value collection on arrays that is keyed on the facet name.
// this map contains one array of matches for each facet
//
// Intersection:
// (common records) between 2 arrays by id
@Pipe({
  name: 'facetFilter',
})
export class FacetFilterPipe implements PipeTransform {
  /**
   * transform
   *
   * deligates filtering to filterItems, and gets record count
   *
   *  @param records - the array to sort
   *  @param filterOptions - the filter selections to use
   *  @param filterMetadata - metaData about the FacetFilterOptions, including count
   *
   * @returns {MovieSummary[]} the newly filtered array
   **/
  public transform(records: MovieSummary[], filterOptions: FacetOptions, filterMetadata: any): MovieSummary[] {
    const items: MovieSummary[] = this.filterItems(records, filterOptions);
    filterMetadata.count = items ? items.length : 0;
    return items;
  }

  /**
   * intersection
   *
   *  returns the intersection (common records) between 2 arrays by id
   *
   *  @param arrayA
   *  @param arrayB
   *
   * @returns {any[]}
   **/
  private intersection(arrayA: any[], arrayB: Set<any>): any[] {
    return arrayA;
  //  return arrayA.filter((x: any) => arrayB.has((y: any) => x.id === y.id));
  }

  /**
   * getMatchMap
   *
   *  creates and returns a Map<string, any[]>, essentially a collection on arrays
   *  one array of matches for each facet, keyed on the facet name
   *
   *  @param records - the array to sort
   *  @param filterOptions - the filter selections to use
   *
   * @returns {any[]} the newly created and loaded MatchMap
   **/
  private getMatchMap(records: any[], filterOptions: FacetOptions): Map<string, any[]> {

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

  /**
   * filterItems
   *
   *  Checks if filtering needs to be applied, Filters the list of in force policies
   *
   *  @param records - the array to sort
   *  @param filterOptions - the filter selections to use
   *
   * @returns {MovieSummary[]} the newly filtered array
   **/
  private filterItems(records: MovieSummary[], filterOptions: FacetOptions): MovieSummary[] {
    let intersectionArray: any[] = records;

    // short circuit if no records
    if (!records) {
      return records;
    }

    const matchMap: Map<string, any[]> = this.getMatchMap(records, filterOptions)

    // find intersections form all of the arrays of matches
    matchMap.forEach((matches: any[], key: string) => {
      intersectionArray = matches.length ? this.intersection(intersectionArray, matches) : intersectionArray;
    });

    return intersectionArray;
  }
}
