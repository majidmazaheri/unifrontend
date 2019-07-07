import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'plantSearchPipe', pure: false })
export class PlantSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(plant => {
        if (plant.name) {
          return plant.name.search(searchText) !== -1;
        }
      });
    }
  }
}