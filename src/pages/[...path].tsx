import DynamicPage, { getStaticProps } from '../components/DynamicPage';

export default DynamicPage;

export { getStaticProps };

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: ['landing', 'landing-3'] } },
      { params: { path: ['landing', 'solutions'] } },
      { params: { path: ['ui-snippets'] } },
            { params: { path: ['home-copy'] } },
    ],
    fallback: `blocking`,
  };
}
