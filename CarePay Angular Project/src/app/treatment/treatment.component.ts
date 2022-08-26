import { Component, OnInit } from '@angular/core';
import { Treatment } from '../model/treatment';
import { TreatmentService } from '../service/treatment.service';
import {debounce} from 'lodash';

@Component({
  selector: 'treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {
  private originalTreatments: Treatment[] = [];
  public tempTreatments: Treatment[] = [];
  public isValidCode: boolean = true;
  public treatmentCode: any;

  constructor(public treatmentService: TreatmentService) {}

  ngOnInit(): void {
    this.getTreatments();
  }

  public isValidTreatmentCode(): boolean {
    // we can use regex as well. but i am writing my own logic
    let count: number = 1;
    let maxCount: number = 1;
    let tempCode = this.treatmentCode;
    tempCode = tempCode.split('');
    tempCode = tempCode.sort().map((ch: string) => ch.toLocaleLowerCase());
    for (let i=0; i<tempCode.length - 1; i++) {
      if (tempCode[i+1] === tempCode[i]) {
        count++;
      } else {
        if (count >= maxCount) {
          maxCount = count;
          count = 1;
        }
      }
    }

    if (count > maxCount) maxCount = count; // corner case
    return maxCount >=3;
  }

  private getTreatments(): void {
    this.treatmentService.getTreatments().subscribe((response) => {
      this.originalTreatments = response;
      this.tempTreatments = response;
    })
  }

  public DebouceSearch = debounce(this.Search, 500);

  public Search(): void {
    if(this.treatmentCode === "") {
      this.getTreatments();
    } else {
      // assuming treatment code search is not case sensitive
      // assumption - i am not stopping search if code is invalid on search text field
      this.isValidCode = this.isValidTreatmentCode();
      this.tempTreatments = this.originalTreatments.filter((treatment: Treatment) => {
        return treatment.treatmentCode?.toLocaleLowerCase().match(this.treatmentCode.toLocaleLowerCase());
      });
    }
  }

}
