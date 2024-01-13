import { TestBed } from '@angular/core/testing';

import { BasededatosService } from './basededatos.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('BasededatosService', () => {
  let service: BasededatosService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [SQLite]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(BasededatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
