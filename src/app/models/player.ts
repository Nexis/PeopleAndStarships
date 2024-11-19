import {CardInfo, CardType} from './card.interface';

export interface Player {
  id: string;
  points: number;
  currentCard?: CardInfo;
  selectedType: CardType;
}
