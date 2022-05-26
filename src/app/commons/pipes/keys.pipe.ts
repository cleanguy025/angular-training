import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keysPipe'
})
export class KeysPipe implements PipeTransform {

  transform(value: Object , args?: unknown): string[] {
    return Object.keys(value);
  }

}
