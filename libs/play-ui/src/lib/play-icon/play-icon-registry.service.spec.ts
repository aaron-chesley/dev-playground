import { TestBed } from '@angular/core/testing';

import { PlayIconRegistryService } from './play-icon-registry.service';

describe('PlayIconRegistryService', () => {
  let service: PlayIconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayIconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
