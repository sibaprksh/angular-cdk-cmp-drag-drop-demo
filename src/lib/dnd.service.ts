import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';



@Injectable()
export class DndService {
  private _ids: Array<String> = [];
  private subject = new BehaviorSubject<String[]>([]);
  public ids = this.subject.asObservable(); 

  constructor() { }

  setId(id: String) { 
    debugger;
    this._ids.push(id);
    this._ids = Array.from(new Set(this._ids));
    this.subject.next(this._ids); 
  }

  setIds(ids: String[]) {
    debugger;
    this._ids = Array.from(new Set(this.flatten(this._ids.concat(ids))));
    this.subject.next(this._ids); 
  }

  private flatten(ary) {
    var ret = [];
    for(var i = 0; i < ary.length; i++) {
        if(Array.isArray(ary[i])) {
            ret = ret.concat(this.flatten(ary[i]));
        } else {
            ret.push(ary[i]);
        }
    }
    return ret;
  }
}