import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingArrayFormComponent } from './sorting-array-form.component';

describe('SortingArrayFormComponent', () => {
  let component: SortingArrayFormComponent;
  let fixture: ComponentFixture<SortingArrayFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortingArrayFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortingArrayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
