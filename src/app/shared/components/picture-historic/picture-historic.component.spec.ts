import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureHistoricComponent } from './picture-historic.component';

describe('PictureHistoricComponent', () => {
  let component: PictureHistoricComponent;
  let fixture: ComponentFixture<PictureHistoricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PictureHistoricComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureHistoricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
