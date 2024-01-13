import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrouserPage } from './registrouser.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RegistrouserPage', () => {
  let component: RegistrouserPage;
  let fixture: ComponentFixture<RegistrouserPage>;

  beforeEach(async() => {

    await TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrouserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
