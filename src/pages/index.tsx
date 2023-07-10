import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getAllTags, getPostsForTopPage } from "../lib/notionAPI";
import { AllPostProps } from "@/types/Type";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import Tag from "@/components/Tag/Tag";
import AllPosts from "@/components/post/AllPosts";
import Layout from "@/components/common/Layout";

export const getStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE);

  const allTags = await getAllTags();
  return {
    props: {
      fourPosts,
      allTags,
    },
    //10秒ごとに更新する ISG
    revalidate: 10,
  };
};

export default function Home({ fourPosts, allTags }: AllPostProps) {
  return (
    <Layout>
      <div className="container h-full w-full mx-auto">
        <Head>
          <title>gachadex</title>
          <meta name="description" content="gachadex" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container w-full mt-16">
          <h1 className="text-5xl font-medium text-center mb-16">gachadex😄</h1>
          <Tag  tags={allTags} />
          <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
            {fourPosts.map((post: any) => (
              <div key={post.id}>
                <AllPosts
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  slug={post.slug}
                  cover={post.cover}
                />
              </div>
            ))}
          </section>
          <Link
            href="/posts/page/1"
            className="mb-6 lg:w-1/2 mx-auto px-5 block text-center"
          >
            もっと見る
          </Link>
        </main>
      </div>
    </Layout>
  );
}
