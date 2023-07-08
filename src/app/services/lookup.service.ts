import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/utils/apiResponse';
import { environment as env } from "src/environments/environment"
import { Observable } from 'rxjs';
import { LookupItem } from "../dto/LookupItem";

@Injectable({
  providedIn: 'root'
})
export class LookupService {

  constructor(private http:HttpClient) { }

  // ENTITIES
  jobRole():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/job-role`,);
  }

  // ENUMS
  paymentStatus():Observable<any>{
    return this.http.get<ApiResponse<LookupItem>>(`${env.lookupEndpoint}/payment-status`,);
  }
}
