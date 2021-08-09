import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  /**
  * 
  * @param http Http Client to send requests.
  */
  constructor(
    private http: HttpClient
  ) { }


 
  getAllTransaction(transaction_status:string,transaction_type:string): Observable<any> {
    let httpParams = new HttpParams()
		httpParams = httpParams.set('transaction_status', transaction_status);
		httpParams = httpParams.set('transaction_type', transaction_type);
    
    return this.http.get(`${environment.base_url}/marketplace/admin-transactions-per-status-and-type`,{ params: httpParams });
  }

}
