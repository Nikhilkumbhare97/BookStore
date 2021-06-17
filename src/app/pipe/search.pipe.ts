import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchText: string) {
   if (value.length == 0 || searchText == ''){
      return value;
   }

   const books = [];
   for (const book of value) {
     console.log(book)
     if (book['bookName'] === searchText) {
       books.push(book);
     }
   }

   return books;

  }
}
