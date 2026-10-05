import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminLetters } from './admin-letters';

describe('AdminLetters', () => {
  let component: AdminLetters;
  let fixture: ComponentFixture<AdminLetters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLetters],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminLetters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
