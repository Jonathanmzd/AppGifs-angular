import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '5XgIGRbM12WAqj5iMQIkoOkERlrRm0UF';
  private _historial:string[] = [];

  // Esto se encuentra en la interface de Gifs para realizar una interface desde el json lo hacemos desde https://app.quicktype.io/
  public resultados: Gif[]=[];

  get historial() {
    return [...this._historial];
  }

  constructor (private http:HttpClient){}


  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase();
    
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }

    // llamado de la api desde un Observable
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=5XgIGRbM12WAqj5iMQIkoOkERlrRm0UF&q=${query}&limit=10`)
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
    })

   
  }
}
