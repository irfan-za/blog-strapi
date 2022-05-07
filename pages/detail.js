import Layout from '@components/Layout';
import Container from '@components/Container';
import PostMetaTitle from '@components/PostMetaTitle';
import PostAuthor from '@components/PostAuthor';
import Head from 'next/head';
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

  if(featured.data.length < 1){
    featured.data[0].attributes={}
  }
  return{
    props:{
      featured:featured.data[0].attributes
    }
  }
}

export default function Detail({featured}) {
  const {author, category, content, publishedAt, thumbnail, title} = featured;
  const options = {year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(publishedAt).toLocaleString("en-US", options)
  return (
    <Layout>
      <Head>
        <title>Detail &mdash; Epictetus</title>
      </Head>
      <Container>
        <div className="md:w-6/12 w-full mx-auto flex items-center flex-col">
          <PostMetaTitle
            category={category.data.attributes.name}
            date={date}
            title={title}
            center
          />
          <PostAuthor
            authorName={author.data.attributes.name}
            authorJob={author.data.attributes.job}
            authorAvatar={process.env.NEXT_PUBLIC_IMGURL+author.data.attributes.avatar.data.attributes.url}
          />
        </div>
        <div className="md:w-10/12 w-full mx-auto my-10">
          <img src={process.env.NEXT_PUBLIC_IMGURL+thumbnail.data.attributes.url} className="w-full rounded-lg" />
        </div>
        <div className="md:w-8/12 w-full mx-auto leading-relaxed">
          <p>{content}</p>
        </div>
      </Container>
    </Layout>
  );
}
