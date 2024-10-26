import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Venda } from '../models/venda';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  http = inject(HttpClient);
  api = "http://localhost:8080/api/venda";

  constructor() { }

  save(venda : Venda) : Observable<string>{
    return this.http.post<string>(this.api+"/save", venda, {responseType: "text" as "json"});
  }
  update(venda : Venda, id : number) : Observable<string>{
    return this.http.put<string>(this.api+`/update/${id}`, venda, {responseType: "text" as "json"});
  }
  delete(id : number) : Observable<string>{
    return this.http.put<string>(this.api+`/delete/${id}`, {responseType: "text" as "json"});
  }

  findAll() : Observable<Venda[]>{
    return this.http.get<Venda[]>(this.api+"/findAll");
  }
  
  
  findById(id : number) : Observable<Venda>{
    return this.http.get<Venda>(`${this.api}/findById/${id}`);
  }

  findByDate(dataInicio : string, dataFim : string) : Observable<Venda[]>{
    let datas = new HttpParams().set("startDate", dataInicio).set("endDate", dataFim);
    return this.http.get<Venda[]>(this.api+"/findByData", {params: datas});
  }

  findByMonth(mes : number, ano : number): Observable<Venda[]>{
    return this.http.get<Venda[]>(`${this.api}/findByMonth/${mes}/${ano}`)
  }

  findByUsuario(id : number) : Observable<Venda[]>{
    return this.http.get<Venda[]>(`${this.api}/findByMonth/${id}`)
  }

}
