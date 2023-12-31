import Link from "next/link";
import React from "react";

type Props = {
  tags: string[];
};

const Tag = ({ tags }: Props) => {

  return (
    <div className="mx-4">
      <section className="lg:w-1/2 mb-8 mx-auto grass_card rounded-md p-5">
        <div className="flex flex-wrap gap-5">
          {tags.map((tag: string, index: number) => (
            <Link href={`/posts/tag/${tag}/page/1`} key={index}>
              <span className="cursor-pointer px-2 font-medium pb-1 rounded-xl bg-gray-200 inline-block">
                #{tag}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tag;
