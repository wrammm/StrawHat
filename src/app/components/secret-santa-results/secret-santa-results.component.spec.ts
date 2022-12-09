import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretSantaResultsComponent } from './secret-santa-results.component';

describe('SecretSantaResultsComponent', () => {
  let component: SecretSantaResultsComponent;
  let fixture: ComponentFixture<SecretSantaResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretSantaResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretSantaResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
