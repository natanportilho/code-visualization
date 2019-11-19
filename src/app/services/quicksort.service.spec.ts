import { TestBed } from '@angular/core/testing';

import { QuicksortService } from './quicksort.service';

describe('QuicksortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuicksortService = TestBed.get(QuicksortService);
    expect(service).toBeTruthy();
  });
});
