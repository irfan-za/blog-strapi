import Layout from '@components/Layout';
import Container from '@components/Container';
import CardPost from '@components/CardPost';
import SectionHeader from '@components/SectionHeader';
import Head from 'next/head';
import { useState } from 'react';
import qs from 'qs'

export async function getServerSideProps(){
  const query = qs.stringify({
    populate:{
      category:{
        populate: '*'
      },
      thumbnail:{
        populate: '*'
      },
      author: {
        populate: ['avatar'],
      }
    }
  }, {
    encodeValuesOnly: true,
  });

  const req= await fetch(process.env.APIURL + '/posts?' + query)
  const res= await req.json()

  if(res.data.length < 1){
    res.data[0].attributes={}
  }
  return{
    props:{
      res:res.data
    }
  }
}
export default function Posts({res}) {
  const [posts, setPosts] = useState(res);

  return (
    <Layout>
      <Head>
        <title>Posts &mdash; Epictetus</title>
      </Head>
      <Container>
        <SectionHeader>UI Design</SectionHeader>
        {!posts.length ? (
          <div className="text-center py-20">
            <h2 className="text-6xl">No result 😥</h2>
            <p className="text-xl mt-4 text-white/60 md:w-6/12 w-full mx-auto">We couldn’t find any posts with the keyword `yahahahayuk`. Please try another keyword.</p>
          </div>
        ) : (
          <div className="flex -mx-4 flex-wrap mt-6">
            {posts.map(post => (
              <div key={post.id} className="md:w-4/12 w-full px-4 py-6">
                <CardPost {...post.attributes} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </Layout>
  );
}
