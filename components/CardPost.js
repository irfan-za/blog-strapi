import Link from 'next/link';
import InfoPost from '@components/InfoPost';

export default function CardPost({...infoPost}) {
  const {author, category, headline, publishedAt, thumbnail, title} = infoPost;

  const options = {year: 'numeric', month: 'long', day: 'numeric' }
  const date = new Date(publishedAt).toLocaleString("en-US", options)

  return (
    <article>
      <Link href="/detail">
        <a>
          <img 
          src={process.env.NEXT_PUBLIC_URL + thumbnail.data.attributes.url} 
          alt={thumbnail.data.attributes.alternativeText} 
          className="w-full rounded mb-4" />
        </a>
      </Link>
      <InfoPost
        category={category.data.attributes.name}
        date={date}
        title={title}
        shortDescription={headline}
        authorAvatar={process.env.NEXT_PUBLIC_URL+author.data.attributes.avatar.data.attributes.url}
        authorName={author.data.attributes.name}
        authorJob={author.data.attributes.job}
        />
    </article>
  );
}