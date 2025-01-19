import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { validateItemGuard } from './validate-item.guard';

describe('validateItemGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => validateItemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
