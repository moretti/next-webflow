import DynamicPage, { getStaticProps } from '../components/DynamicPage';

export default DynamicPage;

export { getStaticProps };

export async function getStaticPaths() {
  return {
    paths: [
      { params: { path: ['company'] } },
      { params: { path: ['order'] } },
      { params: { path: ['faq'] } },
    ],
    fallback: `blocking`,
  };
}
