import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DateInputDirective } from './date-input.directive';

@Component({
  selector: 'test-component',
  template: `
    <form>
      <input type="date" name="date" [(ngModel)]="date" lcsDateInput />
    </form>
  `,
})
class TestComponent {
  date = new Date('2020-02-19');
}

describe('DateInputDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, DateInputDirective],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial date', () => {
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.valueAsDate).toBe(component.date);
  });

  it('should update date', () => {
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    const updatedDate = new Date('2020-02-18');
    input.valueAsDate = updatedDate;
    input.dispatchEvent(new InputEvent('input'));
    fixture.detectChanges();
    expect(input.valueAsDate).toBe(updatedDate);
    expect(component.date).toBe(updatedDate);
  });
});
