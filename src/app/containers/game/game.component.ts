import {Component, OnDestroy, OnInit} from '@angular/core';
import {StarWarsApiService} from '../../services/star-wars-api.service';
import {CardInfo} from '../../models/response.interface';
import {Subject} from 'rxjs';
import {CardComponent} from '../../components/card/card.component';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CardComponent, NgIf, MatButton],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnDestroy {

  leftCard?: CardInfo;
  rightCard?: CardInfo;

  destroy$: Subject<void> = new Subject();

  constructor(private starWarsApiService: StarWarsApiService) {
  }


  onPlay(): void {
    this.starWarsApiService.getPeople(1).subscribe(cardInfo => this.leftCard = cardInfo);
    this.starWarsApiService.getStarships(2).subscribe(cardInfo => this.rightCard = cardInfo);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
