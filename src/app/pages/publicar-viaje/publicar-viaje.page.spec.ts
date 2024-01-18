import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarViajePage } from './publicar-viaje.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PublicarViajePage', () => {
  let component: PublicarViajePage;
  let fixture: ComponentFixture<PublicarViajePage>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
