import React, { FunctionComponent } from 'react';

import {
  Head,
  Html,
  Main,
  NextScript,
  DocumentInitialProps,
} from 'next/document';

const Document: FunctionComponent<DocumentInitialProps> = () => {
  return (
    <Html
      className="w-mod-js w-mod-ix"
      data-wf-domain="murats-top-notch-site-8166b8.webflow.io"
      data-wf-page="632108e9f64d676f4ab1a7cc"
      data-wf-site="632108e9f64d6725e0b1a7be"
      data-wf-status="1"
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
