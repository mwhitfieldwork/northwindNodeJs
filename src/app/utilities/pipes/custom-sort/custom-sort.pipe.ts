import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort',
  standalone: true
  //pure:false  - used anytime you need to transform anytime anything changes in the template 
  //where the pipe is used
})
export class CustomSortPipe implements PipeTransform {

  transform(value: string[] | number[],
     direction:'asc'|'desc' = 'asc') {
      const sorted = [...value];
      sorted.sort((a, b) => {
        if(direction === 'asc'){
          return a > b ? 1 : -1;
        }else{
          return a < b ? 1 : -1;
        }
      })
    return sorted;
  }

}
