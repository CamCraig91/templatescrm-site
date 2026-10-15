export type Review = {
  quote: string;
  author: string;
};

type ReviewsSectionProps = {
  title?: string;
  reviews?: Review[];
};

const defaultReviews: Review[] = [
  {
    quote:
      "Cameron helped us automate our entire estimate workflow. We save hours every week.",
    author: "Sarah, Home Services Business",
  },
  {
    quote:
      "Our custom screens make Method so much easier for our team. Total game‑changer.",
    author: "Mark, Construction Company",
  },
  {
    quote:
      "The integrations Cameron built keep everything synced. No more double‑entry.",
    author: "Jenna, Accounting Firm",
  },
];

export default function ReviewsSection({
  title = "What Clients Say",
  reviews = defaultReviews,
}: ReviewsSectionProps) {
  return (
    <section className="py-20 bg-blue-100 border-y border-blue-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {title}
        </h2>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="p-6 bg-white rounded-xl shadow-sm border border-gray-200"
            >
              <p className="text-gray-700 italic mb-4">“{review.quote}”</p>
              <p className="text-gray-600 text-sm">— {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
