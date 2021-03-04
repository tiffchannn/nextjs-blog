import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

import { getAllPostIds, getPostData } from '../../lib/posts'

// Fetch necessary data for the blog post using params.id
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}


// Returns a list of possible value for id - gathers all possible values
/*
  Notes:
   - If fallback is 'FALSE', then any paths not returned by getStaticPaths will result in a 404 page.
   - If fallback is 'TRUE', then the behavior of getStaticProps changes
   - If fallback is 'BLOCKING', then new paths will be server-side rendered with getStaticProps, and cached for future requests so it only happens once per path.
*/
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths, //paths contains the array of known paths returned by getAllPostIds(), which include the params defined by pages/posts/[id].js.
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>

      {/* Add this <Head> tag - will change the text in the browser's tab */}
      <Head>
          <title>{postData.title}</title>
      </Head>

      <article>
          <h1 className={utilStyles.headingXl}>
            {postData.title}
          </h1>

          <div className={utilStyles.lightText}>
            Date: <Date dateString={postData.date} />
          </div>

          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

    </Layout>
  )
}

