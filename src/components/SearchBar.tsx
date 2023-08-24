"use client";
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
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

type SearchBarProps = {};

const SearchBar = () => {
  const [input, setInput] = useState("");
  const router = useRouter();
  const commandRef = useRef<HTMLDivElement>(null);
  const {
    data: queryResults,
    refetch,
    isFetched,
    isFetching,
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

  const request = debounce(() => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const pathname = usePathname();

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        value={input}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        placeholder="Search commmunities..."
        className="outline-none border-none focus:border-none focus:outline-none ring-0"
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
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
                    <Users className="w-4 h-4 mr-2" />
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
