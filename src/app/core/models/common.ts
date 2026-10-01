export interface AdminView {
  firstName: string;
  lastName: string;
}

export interface StoredFileView {
  id: string;
  originalFileName: string;
  fileType: string | null;
  fileSize: number;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}
