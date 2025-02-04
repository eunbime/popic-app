"use client";

import SearchFilter from "@/components/search/search-filter";
import SearchForm from "@/components/search/search-form";
import SearchPostList from "@/components/search/search-post-list";
import SearchUserList from "@/components/search/search-user-list";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");
  const searchParams = useSearchParams();

  return (
    <div className="w-full h-full flex flex-col gap-5 pt-5">
      {/* 검색 폼*/}
      <section className="flex flex-col gap-5 w-[80%] mx-auto">
        <SearchForm
          setSearch={setSearch}
          search={search}
          setKeyword={setKeyword}
        />
        <SearchFilter />
      </section>
      {/* 검색 결과 */}
      <section className="flex justify-center items-center w-full">
        {searchParams.get("filter") === "user" ? (
          <SearchUserList keyword={keyword} />
        ) : searchParams.get("filter") === "post" ? (
          <SearchPostList keyword={keyword} />
        ) : null}
      </section>
    </div>
  );
}
