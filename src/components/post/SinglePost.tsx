import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  cover?: string;
};

const SinglePost = ({ title, description, tags, slug, cover } : Props) => {
  return (
    <>
      <section className="glass_card mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
        <div className="flex  flex-col items-center justify-around">
          <div>
            {cover && (
              <img src={cover} className="w-24 h-24  rounded-xl  my-2" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-2  my-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <span className="bg-gray-200 rounded-xl p-2 font-medium mr-2  my-2">
                  #{tag}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-3">{description}</div>
      </section>
    </>
  );
};

export default SinglePost;
