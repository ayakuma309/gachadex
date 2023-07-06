import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { getSinglePost } from "../../lib/notionAPI";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { SinglePostProps } from "@/types/Type";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await getSinglePost(params?.slug as string);

  return {
    props: {
      post,
    },
  };
};

const Post = ({ post }: SinglePostProps) => {
  const content = post.bookmark.map((block, index) => {
    console.log(block)
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
    <section className="container lg:px-2 px-5 h-screen lg:w-2/5 mx-auto mt-20">
      <div className="glass_card w-1/2 mx-auto">
        {post.metadata.cover && (
          <img src={post.metadata.cover} className="w-52 h-52  rounded-xl object-contain" />
        )}
      </div>
      <h2 className="w-full text-2xl font-medium mt-5">
        {post.metadata.icon}
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
  );
};

export default Post;
