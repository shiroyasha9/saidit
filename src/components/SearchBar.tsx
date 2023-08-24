"use client";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { Prisma, Subreddit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/Command";

type SearchBarProps = {};

const SearchBar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryKey: ["search-query"],
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as (Subreddit & {
        _count: Prisma.SubredditCountOutputType;
      })[];
    },
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative z-50 max-w-lg overflow-visible rounded-lg border"
    >
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        placeholder="Search commmunities..."
        className="border-none outline-none ring-0 focus:border-none focus:outline-none"
      />

      {input.length > 0 && (
        <CommandList className="absolute inset-x-0 top-full rounded-b-md bg-white shadow">
          {isFetched && queryResults?.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {(queryResults?.length ?? 0) > 0 && (
            <CommandGroup heading="Communities">
              {queryResults?.map((subreddit) => {
                return (
                  <CommandItem
                    key={subreddit.id}
                    onSelect={(e) => {
                      router.push(`/r/${e}`);
                      router.refresh();
                    }}
                    value={subreddit.name}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
