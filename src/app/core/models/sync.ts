export type SyncStatus = 'SUCCESS' | 'FAILED' | 'REJECTED';

export interface SyncLogView {
  id: string;
  syncDateTime: string;
  receivedCount: number;
  changedCount: number;
  syncStatus: SyncStatus;
  message: string | null;
}
