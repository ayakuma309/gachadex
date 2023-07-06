type Post = {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  date: string;
  icon: string;
  // cover: string;
}

type Tags = string[];

//記事一覧画面
export interface AllPostProps {
  fourPosts: Post[];
  allTags: Tags;
}

//記事の詳細画面
type SinglePost = {
  metadata: {
    id: string;
    title: string;
    description: string;
    slug: string;
    tags: string[];
    date: string;
    icon: string;
    // cover: string;
  },
  markdown: string;
  bookmark: {
    type: "bookmark";
    parent: string;
  }[];
}

export interface SinglePostProps  {
  post: SinglePost;
}

//Topページではなくページネーションがあるページ
export interface BlogPageListProps  {
  numberOfPage: number;
  postsByPage: Post[];
  allTags: string[];
}
//タグで絞り込みした後のページネーションがあるページ
type BlogTagPageListProps = {
  posts: Post[];
  numberOfPagesByTag: number;
  currentTag: string;
  allTags: string[];
}
