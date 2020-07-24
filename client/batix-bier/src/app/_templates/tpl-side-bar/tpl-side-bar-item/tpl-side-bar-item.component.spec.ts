import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplSideBarItemComponent } from './tpl-side-bar-item.component';

describe('TplSideBarItemComponent', () => {
  let component: TplSideBarItemComponent;
  let fixture: ComponentFixture<TplSideBarItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplSideBarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplSideBarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
