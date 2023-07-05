import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  isPaginationPage: boolean;
  cover?: string;
};

const SinglePost = ({ title, description, tags, slug, isPaginationPage,cover } : Props) => {
  return (
    <>
      {isPaginationPage ? (
        <section className="glass_card mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-around">
            <div>
              {cover && (
                <img src={cover} className="w-24 h-24  rounded-xl" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-medium mb-2">
                <Link href={`/posts/${slug}`}>{title}</Link>
              </h2>
              {tags.map((tag: string, index: number) => (
                <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                  <span className="bg-gray-200 rounded-xl p-2 font-medium mr-2">
                    #{tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <p className="">{description}</p>
        </section>
      ) : (
        <section className="lg:w-1/2 glass_card mb-8 mx-auto rounded-md p-10  shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
          <div className="flex items-center justify-around">
            <div>
              {cover && (
                <img src={cover} className="w-24 h-24  rounded-xl" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-medium mb-2">
                <Link href={`/posts/${slug}`}>{title}</Link>
              </h2>
              {tags.map((tag: string, index: number) => (
                <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                  <span className="bg-gray-200 rounded-xl p-2 font-medium mr-2">
                    #{tag}
                  </span>
                </Link>
              ))}
              <p>{description}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SinglePost;
