import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from '@app/shared/interface/character.interface';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {

  // Variable
  character$!: Observable<Character>;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService,
              private location: Location) {}

  ngOnInit(): void {
    //INVOCAMOS AL MÉTODO DE OBTENCION DE UN PERSONAJE
    this.route.params.pipe(take(1)).subscribe((params)=>{
      const id = params['id'];
      this.character$ = this.characterService.getDetails(id);
    });
  }

  // MÉTODO PARA RETORNAR AL LISTADO COMPLETO DE PERSONAJES
  onGoBack() {
    this.location.back();
  }
}
