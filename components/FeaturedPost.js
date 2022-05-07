import Link from 'next/link';
import InfoPost from '@components/InfoPost';


export default function FeaturedPost({...featured}) {
  console.log(featured);
  const {author, category, headline, publishedAt, thumbnail, title} = featured;

  const options = {year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(publishedAt).toLocaleString("en-US", options)
  console.log(date)


  return (
    <article>
      <div className="flex -mx-4 lg:items-center items-start flex-wrap">
        <div className="px-4 lg:w-8/12 md:w-7/12 w-full">
          <Link href="/detail">
            <a>
              <img src={process.env.NEXT_PUBLIC_IMGURL+thumbnail.data.attributes.formats.medium.url} alt={featured.thumbnail.data.attributes.alternativeText} className="rounded-xl w-full mb-4 md:mb-0" />
              {/* jika url image salah, ganti ke : process.env.NEXT_PUBLIC_IMGURL+thumbnail.data.attributes.url */}
            </a>
          </Link>
        </div>
        <div className="lg:w-4/12 md:w-5/12 w-full px-4">
          <InfoPost
            category={category.data.attributes.name}
            date={date}
            title={title}
            shortDescription={headline}
            authorAvatar={process.env.NEXT_PUBLIC_IMGURL+author.data.attributes.avatar.data.attributes.url}
            authorName={author.data.attributes.name}
            authorJob={author.data.attributes.job}
            />
        </div>
      </div>
      <hr className="border-white/10 mt-10 md:hidden" />
    </article>
  );
}

