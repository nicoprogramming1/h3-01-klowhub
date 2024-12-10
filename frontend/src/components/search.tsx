"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";

export default function SearchComponent({
  placeholder,
  navigate = false,
}: Readonly<{
  placeholder: string;
  navigate?: boolean;
}>) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(data: { query: string }) {
    const { query } = data;
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    if (navigate) {
      replace(`${pathname}/all?${params.toString()}`);
    } else {
      replace(`${pathname}?${params.toString()}`);
    }
  }

  const { register, handleSubmit } = useForm<{ query: string }>();

  return (
    <div className="relative flex flex-1 flex-shrink-0 w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(handleSearch)();
        }}
        className="w-full flex flex-col sm:flex-row gap-2"
      >
        <div className="relative flex flex-1 flex-shrink-0 w-full">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            className="peer block w-full rounded-md border border-primary py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 bg-background dark:bg-gray-900 "
            placeholder={placeholder}
            {...register("query")}
            defaultValue={searchParams.get("query")?.toString()}
            onChange={
              navigate
                ? () => {}
                : (e) => handleSearch({ query: e.target.value.trim() })
            }
          />
          <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-primario-100" />
        </div>
        <Button className="h-full" variant={"primario"}>
          Buscar
        </Button>
      </form>
    </div>
  );
}
