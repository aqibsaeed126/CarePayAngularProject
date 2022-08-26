export class Treatment {
  treatmentCode: string | undefined;
  patient: string | undefined;
  treatmentDate: string | undefined;

  constructor(treatmentCode: string, patient: string, treatmentDate: string ) {
    this.treatmentCode = treatmentCode;
    this.patient = patient;
    this.treatmentDate = treatmentDate;
  }
}