import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalshiFeaturesComponent } from './kalshi-features.component';

describe('KalshiFeaturesComponent', () => {
  let component: KalshiFeaturesComponent;
  let fixture: ComponentFixture<KalshiFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KalshiFeaturesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KalshiFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
