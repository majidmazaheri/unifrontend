import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
    public settings = new Settings(
        'plant care system',   //theme name
        true,       //loadingSpinner
        true,      //fixedHeader
        true,      //fixedSidenav
        false,      //fixedSidenavUserContent
        true,       //sidenavIsOpened
        true,       //sidenavIsPinned  
        'vertical', //vertical
        'default',  //default, compact, mini
        'teal-light',   //indigo-light, teal-light, red-light, gray-light, blue-dark, green-dark, pink-dark, gray-dark
        true       // true = rtl, false = ltr
    )
}

