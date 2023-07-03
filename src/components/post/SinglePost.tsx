import Link from 'next/link'
import React from 'react'

type Props ={
  title: string
  description: string
  tags: string[]
  slug: string
}

const SinglePost = ({title,description, tags, slug}:Props) => {
  return (
    <div>
      <div className="lg:flex items-center gap-3 text-center my-5">
        <Link href={`/posts/${slug}`}>
          <h2 className="text-gray-900">{title}</h2>
        </Link>
        <h2 className="text-gray-900">{description}</h2>
        {tags.map((tag, index) => (
          <button className="bg-white text-black rounded-md px-2 flex m-2" key={index}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SinglePost
