import { Pipe, PipeTransform } from '@angular/core';

import { Twimp } from './twimp/twimp.model';

@Pipe({
  name: 'sortBy',
  pure: false
})
export class SortByPipe implements PipeTransform {

  transform(array: Array<Twimp>): any {
    if (array) {
      return array.sort((a: Twimp, b: Twimp) => {
        const [aDay, aMonth, aYear] = a.timestamp.split("-");
        const [bDay, bMonth, bYear] = b.timestamp.split("-");
        const aDate = new Date(parseInt(aYear), parseInt(aMonth) + 1, parseInt(aDay));
        const bDate = new Date(parseInt(bYear), parseInt(bMonth) + 1, parseInt(bDay));
        return bDate.getTime() - aDate.getTime();
      });
    } else {
      return array;
    }
  }

}
