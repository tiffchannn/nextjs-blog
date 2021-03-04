// THIS IS OUR ROOT PAGE / HOME COMPONENT

import Head from 'next/head'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedPostsData } from '../lib/posts'


// Note: getStaticProps can only be exported from a PAGE (needs to be from the 'pages' directory) bc React needs to have all the required data BEFORE age is rendered
// returning allPostsData inside the props object in getStaticProps, the blog posts will be passed to the Home component as a prop.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>Blog</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>
                  <a>{title}</a>
                </Link>

                <br />

                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}