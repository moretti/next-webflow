import type { FunctionComponent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const links = [
  { title: 'Home', href: '/' },
  { title: 'Order', href: '/order' },
  { title: 'Company', href: '/company' },
  { title: 'FAQ', href: '/faq' },
];

const NavigationBar: FunctionComponent = () => {
  const router = useRouter();

  const defaultStyle = {
    color: '#28224b',
    padding: '16px 20px',
    textDecoration: 'none',
    fontSize: 16,
  };
  const activeStyle = {
    ...defaultStyle,
    color: '#35b8be',
    fontWeight: '600',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
      }}
    >
      <nav
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {links.map(({ title, href }) => (
          <a
            key={href}
            href={href}
            style={router.asPath == href ? activeStyle : defaultStyle}
          >
            {title}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default NavigationBar;
