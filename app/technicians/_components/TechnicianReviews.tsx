
import { Star } from "lucide-react"
import { IReview } from "@/lib/types"

interface TechnicianReviewsProps {
  reviews: IReview[]
}

export function TechnicianReviews({
  reviews,
}: TechnicianReviewsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Customer Reviews
        </h2>

        <span className="text-sm text-slate-500">
          {reviews.length} reviews
        </span>
      </div>

      <div className="mt-6 space-y-5">

        {reviews.length === 0 ? (
          <p className="text-sm text-slate-500">
            No reviews yet.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-slate-100 pb-5 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-600">
                    {review.reviewer.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {review.reviewer.name}
                    </p>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            size={14}
                            className={
                              index < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-300"
                            }
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                <span className="text-xs text-slate-400">
                  {new Date(
                    review.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {review.comment}
              </p>
            </div>
          ))
        )}

      </div>
    </section>
  )
}
