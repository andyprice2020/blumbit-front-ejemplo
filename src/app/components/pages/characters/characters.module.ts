import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { CharacterDetailsComponent } from '@characters/character-details/character-details.component';
import { CharacterListComponent } from '@characters/character-list/character-list.component';
import { CharacterComponent } from '@characters/character.component';

// Definicion de una constante en Angular
const myComponents = [
  CharacterDetailsComponent,
  CharacterListComponent,
  CharacterComponent
]

@NgModule({
  declarations: [...myComponents],
  imports: [
    CommonModule, RouterModule, InfiniteScrollModule
  ],
  exports: [...myComponents]
})
export class CharactersModule { }
