import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IniciosesionPage } from './iniciosesion.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('IniciosesionPage', () => {
  let component: IniciosesionPage;
  let fixture: ComponentFixture<IniciosesionPage>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(IniciosesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
