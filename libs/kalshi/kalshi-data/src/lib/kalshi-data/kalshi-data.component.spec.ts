import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KalshiDataComponent } from './kalshi-data.component';

describe('KalshiDataComponent', () => {
  let component: KalshiDataComponent;
  let fixture: ComponentFixture<KalshiDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KalshiDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KalshiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
