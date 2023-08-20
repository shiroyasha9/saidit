"use client";
import React, { startTransition } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import axios, { AxiosError } from "axios";
import useCustomToast from "@/hooks/use-custom-toast";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const SubscribeLeaveToggle = ({
  subredditId,
  subredditName,
  isSubscribed,
}: {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubscribeLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/subscribe", payload);
      return data as string;
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
      startTransition(() => {
        router.refresh();
      });

      toast({
        title: "Subscribed",
        description: `You are now subscribed to r/${subredditName}`,
      });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubscribeLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post("/api/subreddit/unsubscribe", payload);
      return data as string;
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
      startTransition(() => {
        router.refresh();
      });

      toast({
        title: "Unsubscribed",
        description: `You are now unsubscribed from r/${subredditName}`,
      });
    },
  });
  return isSubscribed ? (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isUnsubscribeLoading}
      onClick={() => unsubscribe()}
    >
      Leave community
    </Button>
  ) : (
    <Button
      className="w-full mt-1 mb-4"
      isLoading={isSubscribeLoading}
      onClick={() => subscribe()}
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;
