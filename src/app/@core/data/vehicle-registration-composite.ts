import { Observable } from 'rxjs';

export abstract class VehicleRegistrationCompositeData {
  abstract fetchListFinishByUserId(userId: string): Observable<any>;
  abstract confirmFinishAssign(notarizationId: string): Observable<any>;
}
