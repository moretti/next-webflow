import DynamicPage, { getStaticProps } from '../components/DynamicPage';

export default DynamicPage;

export { getStaticProps };

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: ['solutions', 'design-survey'] } },
      { params: { path: ['solutions', 'user-testing-for-figma-prototypes'] } },
      { params: { path: ['ui-snippets'] } },
      { params: { path: ['landing', 'landing-2'] } },
    ],
    fallback: `blocking`,
  };
}
