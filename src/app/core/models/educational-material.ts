import { MedicationShortView } from './medication';
import { AdminView, StoredFileView } from './common';

export interface EducationalMaterialShortView {
  id: string;
  title: string;
  createdAt: string;
}

export interface EducationalMaterialFullView {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  medications: MedicationShortView[];
  admin: AdminView;
  storedFiles: StoredFileView[];
}

export interface CreateEducationalMaterialRequest {
  title: string;
  description: string | null;
  medicationsIds: string[];
}
