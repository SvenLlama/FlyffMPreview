import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import AllMonstersJson from '../scrape/allmonsters.json';

export interface NameModel {
  en: string;
}

export interface MonsterModel {
  id: number;
  name: NameModel;
  level: number;
  icon: string;
  hp: number;
  experience: number;
  maxAttack: number;
}

@Injectable({
  providedIn: 'root',
})
export class GamedataService {
  getAllMonsterIdsUrl: string = 'https://flyff-api.sniegu.fr/monster';
  getMonstersByIdListUrl: string = 'https://flyff-api.sniegu.fr/monster/';

  allMonsters: MonsterModel[] = [];

  get hasLoadedMonsters(): Observable<boolean> {
    return this._hasLoadedMonsters;
  }
  private _hasLoadedMonsters = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.allMonsters = AllMonstersJson as MonsterModel[];
    this._hasLoadedMonsters.next(true);

    // this.http.get<number[]>(this.getAllMonsterIdsUrl).subscribe(
    //   (data: number[]) => {
    //     const url = this.getMonstersByIdListUrl + data.join(',');
    //     this.http.get<MonsterModel[]>(url).subscribe(
    //       (data: MonsterModel[]) => {
    //         this.allMonsters = this.allMonsters;
    //         this._hasLoadedMonsters.next(true);
    //       },
    //       (error) => {
    //         alert(`Failed to download all monsters at once: ${error}`);
    //       }
    //     );
    //   },
    //   (error) => {
    //     alert(`Failed to download all the monster IDs: ${error}`);
    //   }
    // );
  }
}
