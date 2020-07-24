import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplUploadFormComponent } from './tpl-upload-form.component';

describe('TplUploadFormComponent', () => {
  let component: TplUploadFormComponent;
  let fixture: ComponentFixture<TplUploadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplUploadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
