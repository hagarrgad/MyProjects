import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { WorkOrder } from './WorkOrderTable/table.component';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8345'; // Replace with your API URL

  work_orders$ = new BehaviorSubject<WorkOrder[]>([]);

  constructor(private http: HttpClient) {}
  getData(): void {
    this.http.get<WorkOrder[]>(this.apiUrl + '/orders/All').subscribe(
      (response: WorkOrder[]) => {
        this.work_orders$.next(response);
      },
      (error: HttpErrorResponse) => {
        alert('Error in fetching work orders');
      }
    );
  }

  searchorder(id: number): void {
    this.http.get<WorkOrder>(this.apiUrl + `/orders/${id}`).subscribe(
      (response: WorkOrder) => {
        if (response == null) {
          this.work_orders$.next([]);
        } else {
          this.work_orders$.next([response]);
        }
      },
      (error: HttpErrorResponse) => {
        alert('Error in fetching work order that id = ' + id);
      }
    );
  }

  createoeder(formData: any): Observable<any> {
    return this.http.post(this.apiUrl + `/orders/create`, formData);
  }

  cancelOrder(id: number): Observable<any> {
    return this.http.put(this.apiUrl + `/orders/cancel/${id}`, {});
  }

  Forceclose(id: number): Observable<any> {
    return this.http.put(this.apiUrl + `/orders/force/${id}`, {});
  }
  Reschedule(id: number): Observable<any> {
    return this.http.put(this.apiUrl + `/orders/changetime/${id}`, {});
  }
  gettechnames(id: number):Observable<any>{
    return this.http.get(this.apiUrl + `/orders/getTechNames?id=${id}`, {});
  }
  getSlotsApi(payload : any):Observable<any>{
    return this.http.put(this.apiUrl + `/orders/changetime`, payload) //payload feha el day wl order id
  }
  reassign(payload:any):Observable<any>{
    return this.http.put(this.apiUrl + `/orders/reassign?tech_name=${payload.tech_name}&order_id=${payload.order_id}`,{})
   }
   rescheduleOrder(payload:any){
    return this.http.put(this.apiUrl + `/orders/rescheduled?time=${payload.time}&slot=${payload.slot }&order_id=${payload.order_id}`,{})
   }

}