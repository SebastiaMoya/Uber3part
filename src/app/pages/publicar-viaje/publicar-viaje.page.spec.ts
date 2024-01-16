import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarViajePage } from './publicar-viaje.page';

describe('PublicarViajePage', () => {
  let component: PublicarViajePage;
  let fixture: ComponentFixture<PublicarViajePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PublicarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
