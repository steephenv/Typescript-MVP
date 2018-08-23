/* tslint:disable:variable-name */
export class Store {
  private _shortlistedConsultants: Set<string>;
  private _maxSize: number;

  constructor(size = 50) {
    this._maxSize = size;
    this._shortlistedConsultants = new Set();
  }

  public store(entry: Set<string>) {
    // trim
    if (entry.size > this.availableSpace) {
      const arrEntry = [...entry];
      arrEntry.length = this.availableSpace;
      entry = new Set(arrEntry);
    }
    // this._shortlistedConsultants.push(...entry);
    this._shortlistedConsultants = new Set([
      ...this._shortlistedConsultants,
      ...entry,
    ]);
  }

  get maxSize() {
    return this._maxSize;
  }
  set maxSize(size: number) {
    this._maxSize = size;
  }
  get availableSpace() {
    return this._maxSize - this._shortlistedConsultants.size;
  }
  get isShortlistFilled() {
    return this._maxSize <= this._shortlistedConsultants.size;
  }
  get shortlistedConsultants() {
    return this._shortlistedConsultants;
  }
}
