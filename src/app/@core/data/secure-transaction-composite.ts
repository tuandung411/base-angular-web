import { Observable } from 'rxjs';

export abstract class SecureTransactionCompositeData {
  abstract fetchListFinishByUserId(userId: string): Observable<any>;
  abstract confirmFinishAssign(notarizationId: string): Observable<any>;
}
