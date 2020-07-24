import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplSideBarComponent } from './tpl-side-bar.component';

describe('TplSideBarComponent', () => {
  let component: TplSideBarComponent;
  let fixture: ComponentFixture<TplSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
