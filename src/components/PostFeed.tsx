"use client";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import Post from "./Post";
import { Loader2 } from "lucide-react";

type PostFeedProps = {
  initialPosts: ExtendedPost[];
  subredditName?: string;
};
const PostFeed = ({ initialPosts, subredditName }: PostFeedProps) => {
  const lastPostRef = useRef<HTMLElement>();
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });

  const { data: session } = useSession();

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    },
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <ul className="col-span-2 flex flex-col space-y-6">
      {posts.map((post, index) => {
        const votesAmount = post.votes.reduce((acc, vote) => {
          return acc + (vote.type === "UP" ? 1 : -1);
        }, 0);

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user?.id,
        );

        const commentAmount = post.comments.length;
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post
                subredditName={post.subreddit.name}
                post={post}
                commentAmount={commentAmount}
                votesAmount={votesAmount}
                currentVote={currentVote}
              />
            </li>
          );
        } else {
          return (
            <li key={post.id}>
              <Post
                subredditName={post.subreddit.name}
                post={post}
                commentAmount={commentAmount}
                votesAmount={votesAmount}
                currentVote={currentVote}
              />
            </li>
          );
        }
      })}
      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
        </li>
      )}
    </ul>
  );
};

export default PostFeed;
