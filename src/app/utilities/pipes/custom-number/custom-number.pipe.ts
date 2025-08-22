import { input, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customNumber',
  standalone: true
})
export class CustomNumberPipe implements PipeTransform {
  //pipes are used to change  what the user sees, not for changing behavior!!!
  //the value represents the vlaue before the pip
  transform(
    value: string | number, 
    inputType?:'tens'| 'hundreds'): number {

    let val:number
    let roundedNumber:number

  

    if(typeof value === 'string') {
      val = parseInt(value);
    }else{
      val = value
    }

    if(inputType === 'tens') {
      roundedNumber = val / 10
    }else if(inputType === 'hundreds') {
      roundedNumber = val / 100
    }else{
       roundedNumber = Math.round(val);
    }

    return roundedNumber;
  }
}
