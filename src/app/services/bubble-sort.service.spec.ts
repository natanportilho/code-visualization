import { TestBed } from '@angular/core/testing';

import { BubbleSortService } from './bubble-sort.service';

describe('BubbleSortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BubbleSortService = TestBed.get(BubbleSortService);
    expect(service).toBeTruthy();
  });
});
