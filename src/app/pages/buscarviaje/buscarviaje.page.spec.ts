import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarviajePage } from './buscarviaje.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('BuscarviajePage', () => {
  let component: BuscarviajePage;
  let fixture: ComponentFixture<BuscarviajePage>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(BuscarviajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
