import { Observable } from "../../../../node_modules/rxjs";
import { environment } from "../../../environments/environment";
import { CardsModel } from "./cards.model";
import{ Injectable } from "@angular/core";
import {HttpHeaders, HttpClient } from "@angular/common/http"

const httpOptions={ 
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({ providedIn: 'root'})
export class CardsService{

constructor(private http: HttpClient) {}

getStartingCards(): Observable<Array<CardsModel>>{
    return this.http.get<Array<CardsModel>>(`${environment.apiUrl}/card/start`);
}
// getRandomCard(): Observable<CardsModel>{
//     return this.http.get<CardsModel>(`${environment.apiUrl}/card/random`);
// }
getDeck(): Observable<Array<CardsModel>>{
    return this.http.get<Array<CardsModel>>(`${environment.apiUrl}/card/random`);
}
}