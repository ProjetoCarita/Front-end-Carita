import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliacaoSiteOngComponent } from './avaliacao-siteOng.component';

describe('AvaliacaoSiteOngComponent', () => {
  let component: AvaliacaoSiteOngComponent;
  let fixture: ComponentFixture<AvaliacaoSiteOngComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvaliacaoSiteOngComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvaliacaoSiteOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
