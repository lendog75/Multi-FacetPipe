export interface FacetFilterOptionsInterface {
  genre?: any[];
  releaseDate?: any[];
  status?: any[];
  isActive?: boolean[];
}

export class FacetFilterOptions implements FacetFilterOptionsInterface {
  public genre: any[];
  public releaseDate: any[];
  public status: any[];
  public isActive: boolean[];


  constructor({genre = [], releaseDate = [], status = [], isActive = []}: FacetFilterOptionsInterface) {
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.status = status;
    this.isActive = isActive;
  }
}
