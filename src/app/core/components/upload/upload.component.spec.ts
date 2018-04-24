import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { UploadComponent } from './upload.component';
import { ParseService } from '@app/core/services/parse.service';
import { DatabaseService } from '@app/core/services/database.service';
import { Router } from '@angular/router';

describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadComponent],
      imports: [RouterTestingModule],
      providers: [ParseService, DatabaseService],
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

  it('should change file', () => {
    const file: File = new File([''], 'test.txt');
    component.onChange({ target: { files: [file] } });
    expect(component.file).toEqual(file);
  });

  it(
    'should parse file',
    inject(
      [ParseService, Router],
      (parseService: ParseService, router: Router) => {
        spyOn(parseService, 'parseFile').and.returnValue(
          Observable.of('valami')
        );
        spyOn(router, 'navigateByUrl').and.callFake(() => {});
        spyOn(component, 'onParse').and.callThrough();

        const parseButton = fixture.nativeElement.querySelector('.file-submit');
        expect(parseButton.disabled).toBe(true);
        component.file = new File([''], 'test.txt');
        fixture.detectChanges();
        expect(parseButton.disabled).toBe(false);
        parseButton.click();
        expect(component.onParse).toHaveBeenCalledTimes(1);
        expect(router.navigateByUrl).toHaveBeenCalledWith('stats');
      }
    )
  );

  // TODO: Parse error
});
