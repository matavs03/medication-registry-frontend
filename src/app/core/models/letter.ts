import { MedicationShortView } from './medication';
import { AdminView, StoredFileView } from './common';

export interface LetterShortView {
  id: string;
  title: string;
  createdAt: string;
}

export interface LetterFullView {
  id: string;
  title: string;
  description: string | null;
  createdAt: string;
  medications: MedicationShortView[];
  admin: AdminView;
  storedFile: StoredFileView;
}

export interface CreateLetterRequest {
  title: string;
  description: string | null;
  medicationsIds: string[];
}
