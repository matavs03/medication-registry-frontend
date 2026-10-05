import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateContent } from './create-content';

describe('CreateContent', () => {
  let component: CreateContent;
  let fixture: ComponentFixture<CreateContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateContent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
