import React from "react";
import Head from "next/head";
import { getPostsForTopPage } from "../lib/notionAPI";
import SinglePost from "../components/post/SinglePost";
import Link from "next/link";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
export const getStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE);

  return {
    props: {
      fourPosts,
    },
    //60秒ごとに更新する ISG
    revalidate: 60 * 60 * 6,
  };
};

interface Props {
  fourPosts: any;
}
export default function Home({ fourPosts }: Props) {
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
      </main>
    </div>
  );
}
