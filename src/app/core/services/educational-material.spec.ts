import { TestBed } from '@angular/core/testing';
import { EducationalMaterial } from './educational-material';

describe('EducationalMaterial', () => {
  let service: EducationalMaterial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationalMaterial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
