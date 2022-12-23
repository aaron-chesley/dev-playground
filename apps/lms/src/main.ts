import { enableProdMode } from '@angular/core';
import { loadTranslations } from '@angular/localize';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@playground/environment';

if (environment.production) {
  enableProdMode();
}

const availableLocales = ['en', 'es'];
const localeMappings: { [key: string]: string } = { en: 'en', es: 'es' };

let locale = 'en';
if (locale in localeMappings) {
  locale = localeMappings[locale];
}

if (locale === availableLocales[0]) {
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));
} else {
  fetch(`assets/locales/messages.${locale}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return response.json();
    })
    .then((result) => {
      loadTranslations(result);

      platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err));
    });
}
