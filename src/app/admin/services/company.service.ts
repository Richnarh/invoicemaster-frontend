import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { CompanyBranch } from "src/app/dto/Payload";
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  save(branch: CompanyBranch) {
    if (!branch.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/company-branch`, branch);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/company-branch`, branch);
  }
  branchList(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/company-branch/list`);
  }
  deleteBranch(branchId: string) {
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/company-branch/${branchId}`);
  }
}
