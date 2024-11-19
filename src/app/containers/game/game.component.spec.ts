import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonHarness} from '@angular/material/button/testing';
import {HttpClientTestingModule, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameComponent, NoopAnimationsModule],
      providers:[provideHttpClient(),provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call onPlay when PLAY NEW GAME button clicked', async () => {
    spyOn(component,'onPlay');
    let buttonHarness = await loader.getHarness(MatButtonHarness.with({text: 'PLAY NEW GAME'}));
    await buttonHarness.click();
    fixture.detectChanges();
    expect(component.onPlay).toHaveBeenCalled();
  });
});
