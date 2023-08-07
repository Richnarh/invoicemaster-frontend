import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Client} from "src/app/dto/Payload";
import { ApiResponse } from "src/app/utils/apiResponse";
import { environment as env } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  save(client: Client) {
    if (!client.id)
      return this.http.post<ApiResponse<any>>(`${env.endpoint}/client`, client);
    else
      return this.http.put<ApiResponse<any>>(`${env.endpoint}/client`, client);
  }
  fetchAllclients(){
    return this.http.get<ApiResponse<any>>(`${env.endpoint}/client/list`);
  }
  delete(clientId: string){
    return this.http.delete<ApiResponse<any>>(`${env.endpoint}/client/${clientId}`);
  }
}
