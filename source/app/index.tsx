import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Strong } from '@/components/Elements';
import { QueryConfig } from '@/constants/config';
import { Locale } from '@/constants/enums';
import { noop } from '@/constants/functions';
import { translations } from '@/constants/languages';
import { LocaleProvider } from '@/context/locale';
import { ModalProvider } from '@/context/modal';

import { Routes } from './routes';

/** Base CSS Files */
import '@/assets/styles/preflight.module.css';
import '@/assets/styles/app.module.css';
import '@/assets/styles/fonts.module.css';
import '@/assets/styles/variables.module.css';
import '@/assets/styles/animations.module.css';

const NODE_APP = document.getElementById('app');

const root = createRoot(NODE_APP!);

function App(): JSX.Element {
  const [locale, setLocale] = useState(
    (localStorage.getItem('locale') as Locale) || Locale.FRENCH,
  );

  const queryClient = new QueryClient(QueryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider
        locale={locale}
        messages={translations[locale]}
        defaultRichTextElements={{ strong: Strong }}
        onWarn={noop}
      >
        <LocaleProvider locale={locale} setLocale={setLocale}>
          <ModalProvider>
            <Routes />
          </ModalProvider>
        </LocaleProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
}

root.render(<App />);
