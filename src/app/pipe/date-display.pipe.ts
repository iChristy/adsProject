import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Pipe({
  name: 'dateDisplay'
})
export class DateDisplayPipe implements PipeTransform {

  transform(date: Date | string, format: string = 'mediumDate'): string { // mediumDate - форматирование по-умолчанию

    if (date == null) {
      return 'Без срока';
    }

    date = moment(date, 'DD-MM-YYYY HH:mm').toDate();
    date = new Date(date);

    const currentDate = new Date().getDate();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (date.getDate() === currentDate && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return 'Сегодня';
    }

    if (date.getDate() === currentDate - 1  && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return 'Вчера';
    }

    if (date.getDate() === currentDate + 1  && date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return 'Завтра';
    }

    return <string> new DatePipe('ru-RU').transform(date, format); // показывать дату в нужной локали
  }

}
