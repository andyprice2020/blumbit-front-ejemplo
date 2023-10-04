import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Character } from '../interface/character.interface';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  // INVOCAMOS AL SERVICIO DE RICK Y MORTY MEDIANTE HTTPCLIENT
  constructor(private http: HttpClient) { }

  // Método para la búsqueda de personajes
  searchCharacters(query = '', page = 1) {
    // DEFINICION DE UNA CONSTANTE
    const filter = `${environment.baseUrlAPI}/?name=${query}&page=${page}`;
    // INVOCAMOS AL METODO GET DE HTTPCLIENT
    return this.http.get<Character[]>(filter);
  }

  // Método para la búsqueda de un personaje {Mediante ID}
  getDetails(id: number) {
    return this.http.get<Character>(`${environment.baseUrlAPI}/${id}`);
  }
}
