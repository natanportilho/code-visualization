import { async, TestBed } from '@angular/core/testing';
import { SortingArrayFormComponent } from './sorting-array-form.component';
describe('SortingArrayFormComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SortingArrayFormComponent]
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
//# sourceMappingURL=sorting-array-form.component.spec.js.map