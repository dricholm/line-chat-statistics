import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AboutGuideComponent } from './about-guide.component';

describe('AboutGuideComponent', () => {
  let component: AboutGuideComponent;
  let fixture: ComponentFixture<AboutGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutGuideComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should change sections',
    fakeAsync(() => {
      expect(component.active).toBe(0);
      expect(fixture.nativeElement.querySelector('#section0')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('#section1')).toBeFalsy();
      fixture.nativeElement.querySelectorAll('button')[1].click();
      expect(component.active).toBe(1);
      fixture.detectChanges();
      tick(400);
      expect(fixture.nativeElement.querySelector('#section0')).toBeFalsy();
      expect(fixture.nativeElement.querySelector('#section1')).toBeTruthy();
    })
  );
});
