import { TestBed } from '@angular/core/testing';

import { LoaderFixService } from './loader-fix.service';

describe('LoaderFixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoaderFixService = TestBed.get(LoaderFixService);
    expect(service).toBeTruthy();
  });
});
