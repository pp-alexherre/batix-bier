import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplMainNavComponent } from './tpl-main-nav.component';

describe('TplMainNavComponent', () => {
  let component: TplMainNavComponent;
  let fixture: ComponentFixture<TplMainNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplMainNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
