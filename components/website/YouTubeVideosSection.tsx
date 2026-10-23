"use client";

import { useState } from "react";
import { Play, Sparkles, ExternalLink, Clock, Flame } from "lucide-react";

function IconYoutube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  views: string;
}

const ASTRO_KC_SHARAN_VIDEOS: VideoItem[] = [
  {
    id: "v1",
    youtubeId: "PatdsAJzeQ8",
    title: "मेहनत आपकी, Credit किसी और का? Weak Sun Symptoms & Remedies | Astro K C Sharan",
    category: "Surya Graha Upaya",
    duration: "Video • 06:07",
    description:
      "Astro K.C. Sharan explains the psychological and astrological symptoms when Surya (Sun) is afflicted in your Janam Kundali — especially when your hard work goes uncredited — and shares authentic Vedic remedies to boost vitality and career recognition.",
    views: "Featured Discourse",
  },
  {
    id: "v2",
    youtubeId: "QN1TCzkGcAM",
    title: "8 Signs of a Weak Moon: Overthinking, Betrayal, and Financial Struggle | Astro K C Sharan",
    category: "Chandra Graha Upaya",
    duration: "Video • Detailed Discourse",
    description:
      "A detailed Vedic discourse by Astro K.C. Sharan on the role of Moon (Chandra) in your birth chart, signs of an afflicted Moon (overthinking, emotional betrayal, financial struggles), and practical remedies.",
    views: "Featured Discourse",
  },
];

export default function YouTubeVideosSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(ASTRO_KC_SHARAN_VIDEOS[0]);
  const channelUrl = "https://www.youtube.com/@AstroKCSharan";

  return (
    <section className="py-20 lg:py-28 bg-[#0B1633] text-white relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#C9A24D]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#5A1725]/15 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/25 text-[#C9A24D] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A24D]" />
            Official YouTube Channel
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Vedic Discourses & Remedies
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Watch in-depth astrological discourses, planetary transit insights, and authentic Vedic remedies by{" "}
            <span className="text-[#C9A24D] font-semibold">Astro K.C. Sharan</span> on his official YouTube channel.
          </p>
        </div>

        {/* Video Player + Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Active Video Player (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black/80 border border-white/10 shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#C9A24D]/20 text-[#C9A24D] border border-[#C9A24D]/30">
                  {activeVideo.category}
                </span>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activeVideo.duration}
                  </span>
                  <span className="text-[#C9A24D] font-medium">
                    {activeVideo.views}
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                {activeVideo.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {activeVideo.description}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-white/40">
                  Speaker: <strong className="text-white">Astro K.C. Sharan</strong> (@AstroKCSharan)
                </span>
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A24D] hover:underline"
                >
                  Watch full video on YouTube
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Playlist Column (1 col) */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C9A24D]" />
                Featured Discourses
              </h4>
              <span className="text-xs text-white/40">{ASTRO_KC_SHARAN_VIDEOS.length} Videos</span>
            </div>

            <div className="flex flex-col gap-3">
              {ASTRO_KC_SHARAN_VIDEOS.map((video) => {
                const isSelected = video.id === activeVideo.id;
                return (
                  <button
                    key={video.id}
                    onClick={() => setActiveVideo(video)}
                    className={`text-left p-4 rounded-xl border transition-all flex gap-3.5 items-start cursor-pointer ${
                      isSelected
                        ? "bg-[#C9A24D]/15 border-[#C9A24D]/40 text-white shadow-lg ring-1 ring-[#C9A24D]/30"
                        : "bg-white/3 border-white/8 hover:bg-white/7 hover:border-white/15 text-white/70"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isSelected
                          ? "bg-[#C9A24D] text-[#0B1633]"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.65rem] font-bold uppercase tracking-wider text-[#C9A24D] mb-0.5">
                        {video.category}
                      </p>
                      <p className="font-medium text-xs sm:text-sm line-clamp-2 text-white">
                        {video.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[0.65rem] text-white/40">
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Official Channel Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#FF0000]/15 via-red-950/20 to-transparent border border-red-500/25 flex flex-col gap-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <IconYoutube className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">Astro K C Sharan</p>
                  <p className="text-white/50 text-xs mt-1">@AstroKCSharan • Official Channel</p>
                </div>
              </div>

              <p className="text-xs text-white/70 leading-relaxed">
                Subscribe for regular discourses on Kundali analysis, planetary remedies, Vastu Shastra, and daily astrological guidance.
              </p>

              <div className="pt-2">
                <a
                  href={channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-4 py-3 rounded-xl transition-all shadow-md text-center"
                >
                  <IconYoutube className="w-4 h-4" />
                  Visit YouTube Channel
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
