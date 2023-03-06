import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalshiUiComponent } from './kalshi-ui.component';

describe('KalshiUiComponent', () => {
  let component: KalshiUiComponent;
  let fixture: ComponentFixture<KalshiUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KalshiUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KalshiUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
