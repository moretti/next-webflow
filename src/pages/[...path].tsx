import DynamicPage, { getStaticProps } from '../components/DynamicPage';

export default DynamicPage;

export { getStaticProps };

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: ['landing', 'landing-2'] } },
      { params: { path: ['landing', 'solutions'] } },
      { params: { path: ['ui-snippets'] } },
            { params: { path: ['landing-2'] } },
    ],
    fallback: `blocking`,
  };
}
