import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = '5XgIGRbM12WAqj5iMQIkoOkERlrRm0UF';
  private _historial:string[] = [];

  // TODO: Cambiar any por su tipo
  public resultados: any[]=[];

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

    // llamado de la api desde un observable
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=5XgIGRbM12WAqj5iMQIkoOkERlrRm0UF&q=${query}&limit=10`)
    .subscribe((resp:any) => {
      console.log(resp.data);
      this.resultados = resp.data;
    })

   
  }
}
