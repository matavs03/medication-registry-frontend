import { TestBed } from '@angular/core/testing';
import { LetterService } from './letter';

describe('Letter', () => {
  let service: LetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
