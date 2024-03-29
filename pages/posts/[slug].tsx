import { useRouter } from 'next/router'
import Container from '../../components/container'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { Event } from '../../types/event'

type Props = {
  event: Event
}

const Post = ({ event }: Props) => {
  const router = useRouter()
  return (
    <Layout>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {event.name} | もしも
                </title>
              </Head>
              <PostHeader
                title={event.name}
                start={event.start}
                end={event.end}
              />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  }
}
