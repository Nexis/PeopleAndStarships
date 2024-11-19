import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {HttpClientTestingModule, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {CardsService} from '../../services/cards.service';
import {Player} from '../../models/player';
import {CardInfo, CardType} from '../../models/card.interface';
import {async, of} from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let loader: HarnessLoader;
  let cardService: CardsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent, NoopAnimationsModule],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
      .compileComponents();

    cardService = TestBed.inject(CardsService);
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onPlay when PLAY NEW GAME button clicked', async () => {
    spyOn(component, 'onPlay');
    let buttonHarness = await loader.getHarness(MatButtonHarness.with({text: 'PLAY NEW GAME'}));
    await buttonHarness.click();
    fixture.detectChanges();
    expect(component.onPlay).toHaveBeenCalled();
  });
  it('should add points to proper player when both cards are of type Person', async () => {
    const mockPlayer1: Player = {
      id: 'LeftPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockPlayer2: Player = {
      id: 'RightPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockCardInfo1: CardInfo = {
      properties: {mass: 3},
      type: CardType.PERSON} as CardInfo;
    const mockCardInfo2: CardInfo = {
      properties: {mass: 4},
      type: CardType.PERSON
    } as CardInfo;

    spyOn(cardService, 'getCardFor')
      .withArgs(mockPlayer1).and.returnValue(of(mockCardInfo1))
      .withArgs(mockPlayer2).and.returnValue(of(mockCardInfo2));

    fixture.detectChanges();

    component.leftPlayer = mockPlayer1;
    component.rightPlayer = mockPlayer2;


    component.onPlay()

    await fixture.whenStable();
    expect(component.leftPlayer.points).toEqual(1);
    expect(component.rightPlayer.points).toEqual(2);


  });
  it('should add points to proper player when both cards are of type Starships', async () => {
    const mockPlayer1: Player = {
      id: 'LeftPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockPlayer2: Player = {
      id: 'RightPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockCardInfo1: CardInfo = {
      properties: {crew: 3},
      type: CardType.STARSHIP
    } as CardInfo;
    const mockCardInfo2: CardInfo = {
      properties: {crew: 4},
      type: CardType.STARSHIP} as CardInfo;

    spyOn(cardService, 'getCardFor')
      .withArgs(mockPlayer1).and.returnValue(of(mockCardInfo1))
      .withArgs(mockPlayer2).and.returnValue(of(mockCardInfo2));

    fixture.detectChanges();

    component.leftPlayer = mockPlayer1;
    component.rightPlayer = mockPlayer2;

    component.onPlay();

    await fixture.whenStable();
    expect(component.leftPlayer.points).toEqual(1);
    expect(component.rightPlayer.points).toEqual(2);

  });

  it('should add points to proper player when cards are of different type', async () => {
    const mockPlayer1: Player = {
      id: 'LeftPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockPlayer2: Player = {
      id: 'RightPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockCardInfo1: CardInfo = {
      properties: {crew: 3},
      type: CardType.STARSHIP
    } as CardInfo;
    const mockCardInfo2: CardInfo = {
      properties: {mass: 4},
      type: CardType.PERSON
    } as CardInfo;

    spyOn(cardService, 'getCardFor')
      .withArgs(mockPlayer1).and.returnValue(of(mockCardInfo1))
      .withArgs(mockPlayer2).and.returnValue(of(mockCardInfo2));

    fixture.detectChanges();

    component.leftPlayer = mockPlayer1;
    component.rightPlayer = mockPlayer2;

    component.onPlay();

    await fixture.whenStable();
    expect(component.leftPlayer.points).toEqual(1);
    expect(component.rightPlayer.points).toEqual(2);

  });

  it('should not change points if there is a draw between cards', async () => {
    const mockPlayer1: Player = {
      id: 'LeftPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockPlayer2: Player = {
      id: 'RightPlayer',
      points: 1,
      selectedType: CardType.RANDOM,
    }
    const mockCardInfo1: CardInfo = {
      properties: {crew: 3},
      type: CardType.STARSHIP
    } as CardInfo;
    const mockCardInfo2: CardInfo = {
      properties: {crew: 3},
      type: CardType.STARSHIP
    } as CardInfo;

    spyOn(cardService, 'getCardFor')
      .withArgs(mockPlayer1).and.returnValue(of(mockCardInfo1))
      .withArgs(mockPlayer2).and.returnValue(of(mockCardInfo2));

    fixture.detectChanges();

    component.leftPlayer = mockPlayer1;
    component.rightPlayer = mockPlayer2;

    component.onPlay();

    await fixture.whenStable();
    expect(component.leftPlayer.points).toEqual(1);
    expect(component.rightPlayer.points).toEqual(1);
  });

});
