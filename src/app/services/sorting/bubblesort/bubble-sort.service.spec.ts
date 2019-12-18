import { TestBed } from '@angular/core/testing';
import { BubbleSortService } from './bubble-sort.service';
import { SelectorService } from '../../selector/selector.service';

describe('BubbleSortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BubbleSortService = TestBed.get(BubbleSortService);
    expect(service).toBeTruthy();
  });
});
