import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TreatmentService } from '../service/treatment.service';

import { TreatmentComponent } from './treatment.component';

describe('TreatmentComponent', () => {
  let component: TreatmentComponent;
  let fixture: ComponentFixture<TreatmentComponent>;

  let userServiceStub: Partial<TreatmentService>;
  userServiceStub = {
    getTreatments : ()=> of([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentComponent ],
      providers: [{ provide: TreatmentService, useValue: userServiceStub }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreatmentComponent);
    TestBed.inject
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component correctly', () => {
    expect(component).toBeTruthy();
  });

  it('isValidTreatmentCode should work fine', () => {
    let testCases = [{case: '1122333' , result: true}, {case: '112233' , result: false} ]
    for (let i=0; i<testCases.length; i++) {
      component.treatmentCode = testCases[i].case;
      expect(component.isValidTreatmentCode()).toBe(testCases[i].result);
    }
  });
});
