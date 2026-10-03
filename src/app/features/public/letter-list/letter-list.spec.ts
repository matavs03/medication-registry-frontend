import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LetterList } from './letter-list';

describe('LetterList', () => {
  let component: LetterList;
  let fixture: ComponentFixture<LetterList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetterList],
    }).compileComponents();

    fixture = TestBed.createComponent(LetterList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
