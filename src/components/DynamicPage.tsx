import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import parseHtml, {
  domToReact,
  HTMLReactParserOptions,
  DOMNode,
  Element,
} from 'html-react-parser';
import { get } from 'lodash-es';
import React, { FunctionComponent } from 'react';
type DynamicPageProps = {
  headContent: string;
  bodyContent: string;
};
import type { Element as CheerioElement } from 'cheerio';

const parseOptions: HTMLReactParserOptions = { replace };

const DynamicPage: FunctionComponent<DynamicPageProps> = (props) => {
  return (
    <>
      <Head>{parseHtml(props.headContent, parseOptions)}</Head>
      {parseHtml(props.bodyContent, parseOptions)}
    </>
  );
};

// Determines if URL is internal or external
function isUrlInternal(link: string) {
  if (
    !link ||
    link.indexOf(`https:`) === 0 ||
    link.indexOf(`#`) === 0 ||
    link.indexOf(`http`) === 0 ||
    link.indexOf(`://`) === 0
  ) {
    return false;
  }
  return true;
}

// Replaces DOM nodes with React components
function replace(node: DOMNode) {
  if (!(node instanceof Element)) {
    return;
  }

  const attribs = node.attribs || {};

  // Replace links with Next links
  if (node.name === `a` && isUrlInternal(attribs.href)) {
    const { href, style, ...props } = attribs;
    if (props.class) {
      props.className = props.class;
      delete props.class;
    }
    if (!style) {
      return (
        <Link href={href}>
          <a {...props}>
            {!!node.children &&
              !!node.children.length &&
              domToReact(node.children, parseOptions)}
          </a>
        </Link>
      );
    }
    return (
      <Link href={href}>
        <a {...props} href={href}>
          {!!node.children &&
            !!node.children.length &&
            domToReact(node.children, parseOptions)}
        </a>
      </Link>
    );
  }

  // Make Google Fonts scripts work
  if (node.name === `script`) {
    let content = get(node, `children.0.data`, ``);
    if (content && content.trim().indexOf(`WebFont.load(`) === 0) {
      content = `setTimeout(function(){${content}}, 1)`;
      return (
        <script
          {...attribs}
          dangerouslySetInnerHTML={{ __html: content }}
        ></script>
      );
    }
  }
}

function convertStylesStringToObject(stringStyled: string) {
  return stringStyled.split(';').reduce((acc, style) => {
    const colonPosition = style.indexOf(':');

    if (colonPosition === -1) {
      return acc;
    }

    const camelCaseProperty = style
        .substring(0, colonPosition)
        .trim()
        .replace(/^-ms-/, 'ms-')
        .replace(/-./g, (c) => c.substring(1).toUpperCase()),
      value = style.substring(colonPosition + 1).trim();

    return value ? { ...acc, [camelCaseProperty]: value } : acc;
  }, {});
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Import modules in here that aren't needed in the component
  const cheerio = await import(`cheerio`);

  // Use path to determine Webflow path
  let url = get(context, `params.path`, []);

  url = url.join(`/`);

  if (url.charAt(0) !== `/`) {
    url = `/${url}`;
  }
  const fetchUrl = process.env.WEBFLOW_URL + url;

  // Fetch HTML
  let html;
  try {
    const response = await fetch(fetchUrl);
    html = await response.text();
  } catch (err) {
    console.error(err);
    return { props: {} };
  }

  // Parse HTML with Cheerio
  const $ = cheerio.load(html);

  // Hack to remove opacity: 0
  $('*').each((i, element) => {
    const el = element as CheerioElement;
    const style = el.attribs['style'];
    if (style) {
      el.attribs['style'] = style.replaceAll(/opacity:0/gi, '');
    }
  });

  // Delete header and footer
  $('.navbar').remove();
  $('.footer-3').remove();

  // Convert back to HTML strings
  const bodyContent = $('body').html();
  const headContent = $('head').html();

  // Send HTML to component via props
  return {
    props: {
      bodyContent,
      headContent,
    },
  };
};

export default DynamicPage;
