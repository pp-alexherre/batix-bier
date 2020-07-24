import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplWorkProgressComponent } from './tpl-work-progress.component';

describe('TplWorkProgressComponent', () => {
  let component: TplWorkProgressComponent;
  let fixture: ComponentFixture<TplWorkProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplWorkProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplWorkProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
