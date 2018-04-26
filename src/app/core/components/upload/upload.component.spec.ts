import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { UploadComponent } from './upload.component';
import { MessageService } from '@app/core/services/message.service';
import { Router } from '@angular/router';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [NoopAnimationsModule, RouterTestingModule],
      providers: [MessageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'should only accept text/plain filetype',
    inject(
      [MessageService, Router],
      (service: MessageService, router: Router) => {
        spyOn(service, 'parseFile').and.returnValue(Observable.of());
        spyOn(router, 'navigateByUrl').and.callFake(() => {});
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

        expect(service.parseFile).toHaveBeenCalledTimes(0);

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
        expect(service.parseFile).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
      }
    )
  );

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

  it(
    'should parse file',
    inject(
      [MessageService, Router],
      (messageService: MessageService, router: Router) => {
        spyOn(messageService, 'parseFile').and.returnValue(
          Observable.of('valami')
        );
        spyOn(router, 'navigateByUrl').and.callFake(() => {});
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
      }
    )
  );

  it(
    'should display error',
    inject(
      [MessageService, Router],
      (messageService: MessageService, router: Router) => {
        spyOn(messageService, 'parseFile').and.returnValue(
          Observable.throw('Error')
        );
        spyOn(router, 'navigateByUrl').and.callFake(() => {});
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
      }
    )
  );
});
