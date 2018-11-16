import { Observable } from "../../../../node_modules/rxjs";
import { environment } from "../../../environments/environment";

import{ Injectable } from "@angular/core";
import {HttpHeaders, HttpClient } from "@angular/common/http"
import { RuleModel } from "./rule.model";

const httpOptions={ 
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({ providedIn: 'root'})
export class RuleService{

constructor(private http: HttpClient) {}

getRandomRule(): Observable<RuleModel>{
    return this.http.get<RuleModel>(`${environment.apiUrl}/rule/random`);
}
}