export type SyncStatus = 'SUCCESS' | 'FAILED' | 'REJECTED';

export interface SyncLogView {
  id: string;
  syncDateTime: string;
  receivedCount: number;
  changedCount: number;
  status: SyncStatus;
  message: string | null;
}
