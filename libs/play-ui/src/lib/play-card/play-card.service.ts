import { Injectable } from '@angular/core';

@Injectable()
export class PlayCardService {
  hasHeader: boolean;
  hasFooter: boolean;
  constructor() {
    this.hasHeader = false;
    this.hasFooter = false;
  }
}
