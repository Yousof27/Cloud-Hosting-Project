"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchArticleInput = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const FormSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchText });
    router.push(`/articles/search?searchText=${searchText}`);
  };

  return (
    <form onSubmit={FormSubmitHandler} className="!my-5 !mx-auto w-full md:w-2/3">
      <input
        id="search-article"
        className="w-full !p-3 rounded text-xl border-none text-gray-900 bg-white"
        type="search"
        placeholder="Search Articles..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchArticleInput;
