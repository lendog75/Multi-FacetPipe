export interface FacetFilterOptionsInterface {
  genre?: any[];
  releaseDate?: any[];
  status?: any[];
  isActive?: any[];
}

export class FacetFilterOptions implements FacetFilterOptionsInterface {
  public genre: any[];
  public releaseDate: any[];
  public status: any[];
  public isActive: any[];


  constructor({genre = [], releaseDate = [], status = [], isActive = []}: FacetFilterOptionsInterface) {
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.status = status;
    this.isActive = isActive;
  }
}
