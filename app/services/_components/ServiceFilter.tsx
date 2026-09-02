
// "use client";

// import { useRouter, useSearchParams } from "next/navigation";

// interface ServiceFilterProps {
//   categories: {
//     id: string;
//     name: string;
//   }[];
// }

// export function ServiceFilter({
//   categories,
// }: ServiceFilterProps) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const updateFilter = (key: string, value: string) => {
//     const params = new URLSearchParams(searchParams.toString());

//     if (value) {
//       params.set(key, value);
//     } else {
//       params.delete(key);
//     }

//     router.push(`/services?${params.toString()}`);
//   };

//   const clearFilters = () => {
//     const search = searchParams.get("search");

//     if (search) {
//       router.push(
//         `/services?search=${encodeURIComponent(search)}`
//       );
//     } else {
//       router.push("/services");
    
//     }
//   };

//   return (
//     <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h2 className="text-lg font-bold text-slate-900">
//           Filters
//         </h2>

//         <button
//           onClick={clearFilters}
//           className="text-xs font-semibold text-blue-600 hover:text-blue-700"
//         >
//           Clear all
//         </button>
//       </div>

//       {/* Service Type */}
//       <div className="mt-7">
//         <h3 className="text-sm font-semibold text-slate-800">
//           Service Type
//         </h3>

//         <div className="mt-3 space-y-3">
//           {categories.map((category) => (
//             <label
//               key={category.id}
//               className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
//             >
//               <input
//                 type="radio"
//                 name="category"
//                 checked={
//                   searchParams.get("categoryId") === category.id
//                 }
//                 onChange={() =>
//                   updateFilter("categoryId", category.id)
//                 }
//                 className="h-4 w-4 accent-blue-600"
//               />

//               {category.name}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Location */}
//       <div className="mt-7">
//         <h3 className="text-sm font-semibold text-slate-800">
//           Location
//         </h3>

//         <input
//           type="text"
//           defaultValue={searchParams.get("location") || ""}
//           placeholder="e.g. Mirpur"
//           onBlur={(e) =>
//             updateFilter("location", e.target.value)
//           }
//           className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
//         />
//       </div>

//       {/* Price Range */}
//       <div className="mt-7">
//         <h3 className="text-sm font-semibold text-slate-800">
//           Price Range
//         </h3>

//         <div className="mt-3 grid grid-cols-2 gap-3">
//           <input
//             type="number"
//             placeholder="Min"
//             defaultValue={
//               searchParams.get("minPrice") || ""
//             }
//             onBlur={(e) =>
//               updateFilter("minPrice", e.target.value)
//             }
//             className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
//           />

//           <input
//             type="number"
//             placeholder="Max"
//             defaultValue={
//               searchParams.get("maxPrice") || ""
//             }
//             onBlur={(e) =>
//               updateFilter("maxPrice", e.target.value)
//             }
//             className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
//           />
//         </div>
//       </div>

//       {/* Technician Rating */}
//       <div className="mt-7">
//         <h3 className="text-sm font-semibold text-slate-800">
//           Technician Rating
//         </h3>

//         <div className="mt-3 space-y-3">
//           {[4, 3, 2].map((rating) => (
//             <label
//               key={rating}
//               className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
//             >
//               <input
//                 type="radio"
//                 name="rating"
//                 checked={
//                   searchParams.get("minRating") ===
//                   String(rating)
//                 }
//                 onChange={() =>
//                   updateFilter(
//                     "minRating",
//                     String(rating)
//                   )
//                 }
//                 className="h-4 w-4 accent-blue-600"
//               />

//               <span className="text-yellow-500">
//                 ★
//               </span>

//               {rating}+ stars
//             </label>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }


"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ServiceFilterProps {
  categories: {
    id: string;
    name: string;
  }[];
}

export function ServiceFilter({
  categories,
}: ServiceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current filter values
  const [categoryId, setCategoryId] = useState(
    searchParams.get("categoryId") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [minPrice, setMinPrice] = useState(
    searchParams.get("minPrice") || ""
  );

  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("maxPrice") || ""
  );

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(
      searchParams.toString()
    );

    if (categoryId) {
      params.set("categoryId", categoryId);
    } else {
      params.delete("categoryId");
    }

    if (location.trim()) {
      params.set("location", location.trim());
    } else {
      params.delete("location");
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    } else {
      params.delete("minPrice");
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    } else {
      params.delete("maxPrice");
    }

    const query = params.toString();

    router.push(
      query ? `/services?${query}` : "/services"
    );
  };

  // Clear filters
  const clearFilters = () => {
    setCategoryId("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");

    const params = new URLSearchParams(
      searchParams.toString()
    );

    // Keep search
    params.delete("categoryId");
    params.delete("location");
    params.delete("minPrice");
    params.delete("maxPrice");

    const query = params.toString();

    router.push(
      query ? `/services?${query}` : "/services"
    );
  };

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold text-slate-500 hover:text-red-600"
        >
          Clear
        </button>
      </div>

      {/* Service Type */}
      <div className="mt-7">
        <h3 className="text-sm font-semibold text-slate-800">
          Service Type
        </h3>

        <div className="mt-3 space-y-3">
          {categories.map((category) => (
            <label
              key={category.id}
              className="flex cursor-pointer items-center gap-3 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="category"
                checked={categoryId === category.id}
                onChange={() =>
                  setCategoryId(category.id)
                }
                className="h-4 w-4 accent-blue-600"
              />

              {category.name}
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mt-7">
        <h3 className="text-sm font-semibold text-slate-800">
          Location
        </h3>

        <input
          type="text"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          placeholder="e.g. Mirpur"
          className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>

      {/* Price Range */}
      <div className="mt-7">
        <h3 className="text-sm font-semibold text-slate-800">
          Price Range
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value)
            }
            placeholder="Min"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
          />

          <input
            type="number"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value)
            }
            placeholder="Max"
            className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-7 flex gap-3">
        <button
          type="button"
          onClick={clearFilters}
          className="h-11 flex-1 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={applyFilters}
          className="h-11 flex-1 rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </aside>
  );
}
