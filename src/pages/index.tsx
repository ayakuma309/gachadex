import React from "react";
import Head from "next/head";
import { getAllPosts } from "../lib/notionAPI";
import SinglePost from "../components/post/SinglePost";
export const getStaticProps = async () => {
  const allPosts = await getAllPosts();

  return {
    props: {
      allPosts,
    },
    //60秒ごとに更新する ISG
    revalidate: 60 * 60 * 6,
  };
};

interface Props {
  allPosts: any;
}
export default function Home({ allPosts }: Props) {
  // console.log(allPosts);
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>gachadex</title>
        <meta name="description" content="gachadex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">gachadex😄</h1>
        {allPosts.map((post: any) => (
          <div
            key={post.id}
            className="text-white bg-red-800 mb-8 mx-auto rounded-md p-5 shadow-2xl hover:shadow-none hover:translate-y-1 transition-all duration-300"
          >
            <SinglePost
              title={post.title}
              description={post.description}
              tags={post.tags}
              slug={post.slug}
            />
          </div>
        ))}
      </main>
    </div>
  );
}
