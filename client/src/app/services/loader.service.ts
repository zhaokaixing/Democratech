/**
 * Created by zkx on 11/05/2017.
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoaderService {
  public status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * display or hide loader
   * @param value true to display loader, false otherwise
   */
  display(value: boolean) {
    this.status.next(value);
  }
}
