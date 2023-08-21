import { z } from "zod";

export const postVoteValidator = z.object({
  postId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type PostVoteRequest = z.infer<typeof postVoteValidator>;

export const commentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});

export type CommentVoteRequest = z.infer<typeof commentVoteValidator>;
