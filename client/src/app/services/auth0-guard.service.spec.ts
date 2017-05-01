/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Auth0UserGuardService } from './auth0-guard.service';

describe('Auth0GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth0UserGuardService]
    });
  });

  it('should ...', inject([Auth0UserGuardService], (service: Auth0UserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
