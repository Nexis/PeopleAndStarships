import {Component, OnDestroy} from '@angular/core';
import {CardInfo, CardType} from '../../models/card.interface';
import {Subject, take, takeUntil, zip} from 'rxjs';
import {CardComponent} from '../../components/card/card.component';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Player} from '../../models/player';
import {CardsService} from '../../services/cards.service';
import {Starship} from '../../models/starship.interface';
import {Person} from '../../models/person.interface';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardComponent, NgIf, MatButton, MatProgressSpinner, MatLabel, MatFormField, MatSelect, MatOption, NgForOf, FormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnDestroy {

  leftPlayer: Player = {id: 'LeftPlayer', points: 0, selectedType: CardType.RANDOM};
  rightPlayer: Player = {id: 'RightPlayer', points: 0, selectedType: CardType.RANDOM};

  cardsLoading = false;

  types = [CardType.STARSHIP, CardType.PERSON, CardType.RANDOM];

  destroy$: Subject<void> = new Subject();

  constructor(private cardsService: CardsService) {
  }


  onPlay(): void {
    this.cardsLoading = true;

    this.leftPlayer.currentCard = undefined;
    this.rightPlayer.currentCard = undefined;

    const leftCard$ = this.cardsService.getCardFor(this.leftPlayer);
    const rightCard$ = this.cardsService.getCardFor(this.rightPlayer);

    zip(leftCard$, rightCard$).pipe(take(1), takeUntil(this.destroy$)).subscribe(([leftCardVal, rightCardVal]) => {
      this.cardsLoading = false;

      this.leftPlayer.currentCard = leftCardVal;
      this.rightPlayer.currentCard = rightCardVal;

      this.calculatePoints(this.leftPlayer, this.rightPlayer);
    })
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private calculatePoints(player1: Player, player2: Player): void {
    if (player1.currentCard && player2.currentCard) {
      const value1 = this.getCardValue(player1.currentCard);
      const value2 = this.getCardValue(player2.currentCard);
      if (value1 > value2) {
        ++player1.points
      } else if (value2 > value1) {
        ++player2.points;
      }
    }
  }

  private getCardValue(card: CardInfo) {
    if (card.type === CardType.STARSHIP) {
      return (card.properties as Starship).crew;
    } else {
      return (card.properties as Person).mass;
    }
  }

}
