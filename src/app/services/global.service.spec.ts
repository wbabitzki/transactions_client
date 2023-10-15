import { TestBed } from '@angular/core/testing';
import { GlobalService } from './global.service';

describe('GlobalService', () => {
  let service: GlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize isLoading$ to false', (done) => {
    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
      done();
    });
  });

  it('should set isLoading$ to true', (done) => {
    service.setLoading(true);

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
      done();
    });
  });

  it('should set isLoading$ to false', (done) => {
    service.setLoading(true);
    service.setLoading(false);

    service.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
      done();
    });
  });
});
