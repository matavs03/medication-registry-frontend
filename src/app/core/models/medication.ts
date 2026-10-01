export interface MedicationShortView {
  id: string;
  name: string;
  inn: string | null;
  manufacturer: string | null;
}

export interface MedicationFullView {
  id: string;
  inn: string | null;
  dosageForm: string | null;
  manufacturer: string | null;
  name: string;
  atc: string | null;
  type: string | null;
  prescriptionMode: string | null;
  licenseValidUntil: string | null;
  status: MedicationStatus;
}

export type MedicationStatus = 'ACTIVE' | 'WITHDRAWN';
