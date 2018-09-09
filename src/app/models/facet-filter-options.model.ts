export interface FacetFilterOptionsInterface {
  genre?: any[];
  releaseDate?: any[];
  stars?: any[];
  rating?: any[];
}

export class FacetFilterOptions implements FacetFilterOptionsInterface {
  public genre: any[];
  public releaseDate: any[];
  public stars: any[];
  public rating: any[];


  constructor({genre = [], releaseDate = [], rating = [], stars = []}: FacetFilterOptionsInterface) {
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.rating = rating;
    this.stars = stars;
  }
}
