import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingComponent } from './sing.component';

describe('SingComponent', () => {
  let component: SingComponent;
  let fixture: ComponentFixture<SingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
