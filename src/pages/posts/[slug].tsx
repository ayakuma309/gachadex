import React from "react";
import Link from "next/link";
import { getAllPosts, getSinglePost } from "../../lib/notionAPI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SinglePostProps } from "@/types/Type";
import { GetStaticProps } from "next";

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map(({ slug }) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ?? '';  // nullableな値にするため?を付加
  const post = await getSinglePost(Array.isArray(slug) ? slug[0] : slug); // 文字配列かどうかで分岐

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

const Post = ({ post }: SinglePostProps) => {
  const content = post.bookmark.map((block, index) => {
    switch (block.type) {
      case "bookmark":
        if (block.parent) {
          const host = new URL(block.parent).host;
          return (
            <div className="flex md:p-1 cursor-pointer w-full"
            onClick={() => {
                window.open(block.parent || '')
            }}
            key={index}
        >
            <div className="p-1 md:p-1 border">
              <div className="mt-2 flex">
                <img src={`http://www.google.com/s2/favicons?domain=${host}`} className="w-12 h-12" />
                <div className="text-xs truncate min-w-0">
                    {block.parent}
                </div>
              </div>
            </div>
        </div>
          );
        }
        break;
      default:
        break;
    }
  });
  return (
    <>
      <div className="mx-auto">
        {post.metadata.cover && (
          <img src={post.metadata.cover} className="h-72 object-cover" />
        )}
      </div>
      <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
        <h2 className="w-full text-2xl font-medium mt-5">
          {post.metadata.title}
        </h2>
        <div className="border-b-2 w-1/3 mt-1 border-gray-900"></div>
        <br />
        {post.metadata.tags.map((tag: string, index: number) => (
          <p
            className="bg-gray-200 rounded-xl font-medium mt-2 px-2 inline-block mr-2"
            key={index}
          >
            <Link href={`/posts/tag/${tag}/page/1`}>{tag}</Link>
          </p>
        ))}
        <div className="mt-10 font-medium">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code>{children}</code>
                );
              },
            }}
          >
            {post.markdown}
          </ReactMarkdown>
          {content}
          <Link href="/">
            <p className="pb-20 block mt-3 text-sky-900">←ホームに戻る</p>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Post;
