import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from "src/environments/environment"
import { ApiResponse } from 'src/app/utils/apiResponse';
import { AuthRequest } from "src/app/dto/AuthRequest";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  async doLogin (payload: AuthRequest){
    return this.http.post<ApiResponse<any>>(`${env.endpoint}/auth/login`, payload);
  }
}
