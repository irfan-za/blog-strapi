import { useState } from 'react';
import Head from 'next/head'
import FeaturedPost from '@components/FeaturedPost';
import CardPost from '@components/CardPost';
import Container from '@components/Container';
import Layout from '@components/Layout';
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

  const reqFeatured= await fetch(process.env.APIURL + '/posts?filters[featured][$eq]=true&'+query);
  const featured= await reqFeatured.json()
  const req= await fetch(process.env.APIURL + '/posts?' + query)
  const res= await req.json()
  console.log("PANJANG",featured.data)

  if(featured.data.length < 1){
    featured.data[0].attributes={}
  }
  if(res.data.length < 1){
    res.data[0].attributes={}
  }
  return{
    props:{
      featured:featured.data[0].attributes,
      res:res.data
    }
  }
}

export default function Home({featured,res}) {
  console.log("featured",featured)
  const [posts, setPosts] = useState(res);
  console.log(posts)


  return (
    <Layout>
      <Head>
        <title>Home &mdash; Epictetus</title>
      </Head>
      <Container>
        <FeaturedPost {...featured}  />
        <div className="flex -mx-4 flex-wrap mt-6">
          {posts.length > 0 && posts.map(post => (
            <div key={post.id} className="md:w-4/12 w-full px-4 py-6">
              <CardPost {...post.attributes}  />
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  )
}
