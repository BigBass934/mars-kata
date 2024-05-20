import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverComponent } from './rover.component';

describe('RoverComponent', () => {
  let component: RoverComponent;
  let fixture: ComponentFixture<RoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
