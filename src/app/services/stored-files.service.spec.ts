import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { StoredFilesService } from './stored-files.service';

describe('StoredFilesService', () => {
  let service: StoredFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(StoredFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
