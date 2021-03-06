import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { UploadComponent } from '@app/core/components/upload/upload.component';
import { MessageService } from '@app/core/services/message.service';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let messageService: MessageService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [NoopAnimationsModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only accept text/plain filetype', () => {
    spyOn(messageService, 'parseFile').and.returnValue(of());
    spyOn(router, 'navigateByUrl').and.callFake(() => null);
    const parseButton = fixture.nativeElement.querySelector('.file-submit');
    let file: File = new File([''], 'text.txt', { type: 'image/jpeg' });

    component.onChange({ target: { files: [file] } });
    expect(component.file).toEqual(file);
    fixture.detectChanges();
    parseButton.click();
    fixture.detectChanges();
    expect(component.error).toBe(true);
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain('Please upload a text file');

    file = new File([''], 'text.txt', { type: 'text/html' });
    component.onChange({ target: { files: [file] } });
    expect(component.file).toEqual(file);
    fixture.detectChanges();
    parseButton.click();
    fixture.detectChanges();
    expect(component.error).toBe(true);
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain('Please upload a text file');

    expect(messageService.parseFile).toHaveBeenCalledTimes(0);

    file = new File([''], 'text.txt', { type: 'text/plain' });
    component.onChange({ target: { files: [file] } });
    expect(component.file).toEqual(file);
    fixture.detectChanges();
    parseButton.click();
    fixture.detectChanges();
    expect(component.error).toBe(false);
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain('Checking file, please wait');
    expect(messageService.parseFile).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
  });

  it('should change file', () => {
    const filename = 'test.txt';
    const file: File = new File([''], filename, { type: 'text/plain' });

    component.onChange({ target: { files: [file] } });
    expect(component.file).toEqual(file);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain(filename);

    component.onChange({ target: { files: [] } });
    expect(component.file).toBeUndefined();
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain('Select a chat log file');
  });

  it('should parse file', () => {
    spyOn(messageService, 'parseFile').and.returnValue(of(null));
    spyOn(router, 'navigateByUrl').and.callFake(() => null);
    spyOn(component, 'onParse').and.callThrough();

    const parseButton = fixture.nativeElement.querySelector('.file-submit');
    expect(parseButton.disabled).toBe(true);
    const filename = 'test.txt';
    component.onChange({
      target: {
        files: [new File([''], filename, { type: 'text/plain' })],
      },
    });
    fixture.detectChanges();
    expect(parseButton.disabled).toBe(false);
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain(filename);
    parseButton.click();
    expect(component.onParse).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('stats');
  });

  it('should display error', () => {
    spyOn(messageService, 'parseFile').and.returnValue(throwError('Error'));
    spyOn(router, 'navigateByUrl').and.callFake(() => null);
    spyOn(component, 'onParse').and.callThrough();

    const parseButton = fixture.nativeElement.querySelector('.file-submit');
    expect(parseButton.disabled).toBe(true);
    const filename = 'test.txt';
    component.onChange({
      target: {
        files: [new File([''], filename, { type: 'text/plain' })],
      },
    });
    fixture.detectChanges();
    expect(parseButton.disabled).toBe(false);
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain(filename);
    parseButton.click();
    fixture.detectChanges();
    expect(component.onParse).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
    expect(
      fixture.nativeElement.querySelector('.file-text').textContent
    ).toContain('Error');
    expect(component.file).toBeNull();
  });
});
