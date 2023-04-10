import { Observable } from 'rxjs';

export abstract class NotarizeCompositeData {
  abstract fetchCase(caseId: string): Observable<any>;
  abstract fetchListCaseByBranch(
    branchCode: string,
    keyword: string,
    type: number,
    page: number,
    size: number,
    orderby: string,
    sort: string
  ): Observable<any>;
  abstract fetchBranchByBranchId(branchId: string): Observable<any>;
  abstract createNotarize(branchId: object): Observable<any>;
  abstract createNote(note: object): Observable<any>;
  abstract deleteCase(idCase: string): Observable<any>;
  abstract fetchProvinces(): Observable<any>;
  abstract fetchBranchesByProvince(provinceId: string): Observable<any>;
  abstract fetchLocationNotarizationByProvince(
    provinceId: string
  ): Observable<any>;
}
