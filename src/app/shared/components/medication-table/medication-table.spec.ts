import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicationTable } from './medication-table';

describe('MedicationTable', () => {
  let component: MedicationTable;
  let fixture: ComponentFixture<MedicationTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicationTable],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicationTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
