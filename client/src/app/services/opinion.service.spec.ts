/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpinionService } from './opinion.service';

describe('OpinionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpinionService]
    });
  });

  it('should ...', inject([OpinionService], (service: OpinionService) => {
    expect(service).toBeTruthy();
  }));
});
