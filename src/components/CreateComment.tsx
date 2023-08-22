"use client";
import useCustomToast from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { CommentRequest } from "@/lib/validators/comment";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/Button";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";

type CreateCommentProps = {
  postId: string;
  replyToId?: string;
};

const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
  const [input, setInput] = useState("");
  const { loginToast } = useCustomToast();
  const router = useRouter();
  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async (payload: CommentRequest) => {
      const { data } = await axios.patch(
        `/api/subreddit/post/comment`,
        payload,
      );
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      toast({
        title: "There was an error",
        description: "Something went wrong. Please try again",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />
        <div className="mt-2 flex justify-end">
          <Button
            onClick={() => comment({ postId, text: input, replyToId })}
            isLoading={isLoading}
            disabled={input.length === 0}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
