import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrouserPage } from './registrouser.page';

describe('RegistrouserPage', () => {
  let component: RegistrouserPage;
  let fixture: ComponentFixture<RegistrouserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistrouserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
