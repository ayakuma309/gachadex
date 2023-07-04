import React from "react";
import Head from "next/head";
import { getAllTags, getPostsForTopPage } from "../lib/notionAPI";
import SinglePost from "../components/post/SinglePost";
import Link from "next/link";
import { AllPostProps } from "@/types/Type";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import Tag from "@/components/Tag/Tag";

export const getStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE);

  const allTags = await getAllTags();
  return {
    props: {
      fourPosts,
      allTags,
    },
    //60秒ごとに更新する ISG
    revalidate: 60 * 60 * 6,
  };
};

export default function Home({ fourPosts, allTags }: AllPostProps) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>gachadex</title>
        <meta name="description" content="gachadex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">gachadex😄</h1>
        {fourPosts.map((post: any) => (
          <div className="mx-4" key={post.id}>
            <SinglePost
              title={post.title}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
        <Link
          href="/posts/page/1"
          className="mb-6 lg:w-1/2 mx-auto px-5 block text-right"
        >
          ...もっと見る
        </Link>
        <Tag  tags={allTags} />
      </main>
    </div>
  );
}
