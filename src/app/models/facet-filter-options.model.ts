export interface FacetOptionsInterface {
  genre?: Set<string>;
  releaseDate?: Set<string>;
  isActive?: Set<boolean>;
}

export class FacetOptions implements FacetOptionsInterface {
  public genre: Set<string>;
  public releaseDate: Set<any>;
  public isActive: Set<boolean>;

  constructor({genre, releaseDate, isActive}: FacetOptionsInterface) {
    this.genre = genre;
    this.releaseDate = releaseDate;
    this.isActive = isActive;
  }
}
