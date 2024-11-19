import {CardInfo, CardType} from './card.interface';

export interface Player {
  points: number;
  currentCard?: CardInfo;
  selectedType: CardType;
}
