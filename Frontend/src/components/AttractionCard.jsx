import { ArrowUpRight, MapPin } from "lucide-react";

export default function AttractionCard({ place }) {
  const coordinates = place.coordinates?.[0];

  const image =
    place.thumbnail?.source ||
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="group overflow-hidden rounded-3xl bg-white/[0.05]">

      <div className="relative h-64 overflow-hidden">

        <img
          src={image}
          alt={place.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-end justify-between gap-4">

            <div>
              <h3 className="text-lg font-medium">
                {place.title}
              </h3>

              {coordinates && (
                <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
                  <MapPin size={12} />

                  {coordinates.lat.toFixed(3)},{" "}
                  {coordinates.lon.toFixed(3)}
                </div>
              )}
            </div>

            {place.fullurl && (
              <a
                href={place.fullurl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/10 p-3 backdrop-blur-xl transition hover:bg-white/20"
              >
                <ArrowUpRight size={17} />
              </a>
            )}

          </div>
        </div>
      </div>

    </article>
  );
}
