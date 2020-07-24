import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplDeleteFormComponent } from './tpl-delete-form.component';

describe('TplDeleteFormComponent', () => {
  let component: TplDeleteFormComponent;
  let fixture: ComponentFixture<TplDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplDeleteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
