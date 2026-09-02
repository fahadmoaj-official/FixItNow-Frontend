
"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function ServiceSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/services?${params.toString()}`);
  };

  const clearSearch = () => {
    setSearch("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");

    const query = params.toString();

    router.push(query ? `/services?${query}` : "/services");
  };

  return (
    <div className="flex w-full gap-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search services, locations, or what you need..."
          className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />

        {/* Clear Search */}
        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        )}
      </div>

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        className="h-14 rounded-2xl bg-blue-600 px-6 font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
