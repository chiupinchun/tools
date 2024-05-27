import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: '首頁'
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    title: '行事曆'
  }
];
