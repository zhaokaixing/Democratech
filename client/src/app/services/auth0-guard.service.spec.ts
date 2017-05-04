/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthUserGuardService, AuthAdminGuardService } from './auth0-guard.service';

describe('Auth0GuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthUserGuardService, AuthAdminGuardService]
    });
  });

  it('should ...', inject([AuthUserGuardService], (service: AuthUserGuardService) => {
    expect(service).toBeTruthy();
  }));
});
