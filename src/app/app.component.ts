import { Component } from '@angular/core';
import { GamedataService, MonsterModel } from './gamedata.service';

export class Player {
  level: number = 1;
  exp: number = 0;
  attack: number = 10;
  kills: number = 0;
  totalDamage: number = 0;
}

export class Monster {
  model: MonsterModel;
  currentHp: number;

  constructor(model: MonsterModel) {
    this.model = model;
    this.currentHp = this.model.hp;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'flyff-m-preview';

  hasLoadedMonsters = false;

  error: string | null = null;

  isPlaying = false;
  player: Player | null = null;
  currentMonster: Monster | null = null;

  autoAttackInterval: any = 0;

  get isLoadingAnything() {
    return !this.hasLoadedMonsters;
  }

  constructor(private gameData: GamedataService) {
    this.gameData.hasLoadedMonsters.subscribe((loaded) => {
      this.hasLoadedMonsters = loaded;
    });
  }

  startGame() {
    this.stopGame();
    this.player = new Player();
    this.isPlaying = true;

    this.setMonsterToCurrentLevel();
  }

  stopGame() {
    this.isPlaying = false;
    this.currentMonster = null;
    this.player = null;
    this.error = null;
  }

  attackMonster() {
    if (this.currentMonster === null) {
      throw 'cant attack a null monster';
    }
    if (this.player === null) {
      throw 'a null player cant attack';
    }
    this.currentMonster.currentHp -= this.player.attack;
    this.player.totalDamage += this.player.attack;
    if (this.currentMonster.currentHp <= 0) {
      this.player.exp += this.currentMonster.model.experience;
      if (this.player.exp >= 100) {
        this.player.level += 1;
        this.player.exp = 0;
      }
      this.currentMonster = null;
      this.player.kills += 1;
      this.setMonsterToCurrentLevel();
    }
  }

  getRandomMonster(level: number): MonsterModel | null {
    var monsters: MonsterModel[] = [];
    this.gameData.allMonsters.forEach((m) => {
      if (m.name.en.startsWith('Master')) {
        return;
      }
      if (m.level != level) return;
      monsters.push(m);
    });
    if (monsters.length == 0) return null;
    return monsters[Math.floor(Math.random() * monsters.length)];
  }

  getAttackForLevel(level: number) {
    const foundMonster = this.gameData.allMonsters.find((m) => {
      if (m.name.en.startsWith('Master') || m.name.en.startsWith('Giant')) {
        return false;
      }
      return m.level == level;
    });
    return foundMonster?.maxAttack ?? 1;
  }

  onAutoAttackChange($event: any) {
    const isAutoAttacking = $event.currentTarget.checked;
    if (this.autoAttackInterval) {
      clearInterval(this.autoAttackInterval);
      this.autoAttackInterval = 0;
    }
    if (isAutoAttacking) {
      this.autoAttackInterval = setInterval(() => {
        this.attackMonster();
      }, 113);
    }
  }

  setMonsterToCurrentLevel() {
    if (this.player === null) {
      throw 'the player is required to set the current monster';
    }
    const foundMonster = this.getRandomMonster(this.player.level);
    if (foundMonster) {
      this.currentMonster = new Monster(foundMonster);
      this.player.attack = this.getAttackForLevel(this.player.level);
    } else {
      this.error = `Could not find any monsters for player level ${this.player?.level}`;
      this.currentMonster = null;
    }
  }
}
