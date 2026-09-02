
// import { getServices } from "./_actions/getServices"
// import { ServiceGrid } from "./_components/ServiceGrid"

// export default async function ServicesPage() {
//   const result = await getServices()

//   return (
//     <main className="min-h-screen bg-slate-50 px-4 py-12">
//       <div className="mx-auto max-w-7xl">

//         {/* Header */}
//         <div className="mb-10">
//           <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
//             Find a service
//           </p>

//           <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
//             Popular Services
//           </h1>

//           <p className="mt-3 max-w-2xl text-slate-500">
//             Find trusted technicians and professional services near you.
//           </p>
//         </div>

//         {/* Error */}
//         {!result.success ? (
//           <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
//             <h2 className="font-semibold text-red-700">
//               Unable to load services
//             </h2>

//             <p className="mt-2 text-sm text-red-600">
//               {result.message}
//             </p>
//           </div>
//         ) : (
//           <ServiceGrid services={result.data ?? []} />
//         )}
//       </div>
//     </main>
//   )
// }



import { getServices } from "./_actions/getServices";
import { ServiceGrid } from "./_components/ServiceGrid";
import { ServiceSearch } from "./_components/ServiceSearch";
import { ServiceFilter } from "./_components/ServiceFilter";

interface ServicesPageProps {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  // Get filters from URL
  const filters = await searchParams;

  // Get services using filters
  const result = await getServices(filters);



  // Temporary categories
  const categories = [
    {
      id: "1",
      name: "Plumbing",
    },
    {
      id: "2",
      name: "Electrical",
    },
    {
      id: "3",
      name: "Cleaning",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Find a Service
          </h1>

          <p className="mt-2 text-slate-500">
            Find trusted technicians and services near you.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <ServiceSearch />
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

          {/* Filter Sidebar */}
          <aside className="hidden lg:block">
            <ServiceFilter categories={categories} />
          </aside>

          {/* Services */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                Services
              </h2>

              <p className="text-sm text-slate-500">
                {result.success
                  ? `${result.data?.length ?? 0} services found`
                  : "Unable to load services"}
              </p>
            </div>

            {/* Error */}
            {!result.success ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <h2 className="font-semibold text-red-700">
                  Unable to load services
                </h2>

                <p className="mt-2 text-sm text-red-600">
                  {result.message}
                </p>
              </div>
            ) : (
              <ServiceGrid
                services={result.data ?? []}
              />
            )}
          </section>

        </div>
      </div>
    </main>
  );
}


