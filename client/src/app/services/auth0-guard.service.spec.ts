/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Auth0GuardService } from './auth0-guard.service';

describe('Auth0GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth0GuardService]
    });
  });

  it('should ...', inject([Auth0GuardService], (service: Auth0GuardService) => {
    expect(service).toBeTruthy();
  }));
});
