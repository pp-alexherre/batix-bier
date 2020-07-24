import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TplOverlayComponent } from './tpl-overlay.component';

describe('TplOverlayComponent', () => {
  let component: TplOverlayComponent;
  let fixture: ComponentFixture<TplOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TplOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TplOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
