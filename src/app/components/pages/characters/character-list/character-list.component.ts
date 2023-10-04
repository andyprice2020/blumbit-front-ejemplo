import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Character } from '@app/shared/interface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { take } from 'rxjs';

// DEFINICION DE UN TYPE A MANERA DE UN ENUM EN OTROS LENGUAJES DE PROGRAMACION
type RequestInfo = { next?: string; }

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit{

  //DEFINICION DE VARIABLES A SER USADAS
  characters: Character[] = [];
  info: RequestInfo = { next: null! };
  showGoUpButton = false;
  private pageNum = 1;
  private query!: string;
  private hidescrollHeight = 200;
  private showScrollHeight = 200;

  // CONTRUCTOR
  // AQUI SE REALIZARA LA INYECCION DE DEPENDENCIAS Y DEL USO DE DOCUMENT DE ANGULAR
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private characterService: CharacterService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    // Se comunica con el servicio creado
    this.getDatafromService();
  }

  //Metodos auxiliares
  // Método para obtener todos los personajes
  private getDatafromService(): void {
    // Invocamos al servicio
    this.characterService.searchCharacters(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((res: any) => {
      if (res?.results?.length) {
        const { info, results } = res;
      this.characters = [...this.characters, ...results];
      this.info = info;
      }
      else{
        this.characters = [];
      }
    });
  }

  // Método para obtener la lista de personajes por consulta
  /*private getCharactersByQuery(): void {
    this.route.queryParams.pipe(
      take(1)).subscribe((params: ParamMap) => {
        this.query = params.get('q');
        this.getDatafromService();
      });
  }*/

  onScrollDown(): void{
    if (this.info.next) {
      this.pageNum++;
      this.getDatafromService();
    }
  }

  onScrollTop(): void{
     this.document.body.scrollTop = 0; //Safari Browser
     this.document.documentElement.scrollTop = 0; // Other Browsers
  }
}
