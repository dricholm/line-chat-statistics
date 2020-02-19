import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[lcsDateInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputDirective),
      multi: true,
    },
  ],
})
export class DateInputDirective implements ControlValueAccessor {
  @HostListener('input', ['$event.target.valueAsDate'])
  onChange: (_: any) => void;

  @HostListener('blur', [])
  onTouched: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  writeValue(date: Date): void {
    if (date == null) {
      this.renderer.setProperty(this.elementRef.nativeElement, 'value', null);
      return;
    }
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'valueAsDate',
      date
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}
