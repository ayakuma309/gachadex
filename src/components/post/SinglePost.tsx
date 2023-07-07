import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  icon: string;
  // cover?: string;
};

const SinglePost = ({ title, description, tags, slug, icon } : Props) => {
  return (
    <>
      <section className="glass_card mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300">
        <div className="flex  flex-col items-center justify-around">
          <div>
            {icon && (
              <img src={icon} className="w-52 h-52  rounded-xl  my-2" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-medium mb-2  my-2">
              <Link href={`/posts/${slug}`}>{title}</Link>
            </h2>
            {tags.map((tag: string, index: number) => (
              <Link href={`/posts/tag/${tag}/page/1`} key={index}>
                <button className="bg-gray-200 rounded-xl p-2 font-medium mr-2 text-xs mt-2">
                  #{tag}
                </button><br />
              </Link>
            ))}
          </div>
        </div>
        <div className="text-center mt-3">{description}</div>
        <div className="flex justify-center mt-3">
          <Link href={`/posts/${slug}`}>
            <button className=" bg-lime-500 rounded-md p-2">
              詳細
            </button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default SinglePost;
