"use client";

import { useState } from "react";
import { Play, Sparkles, ExternalLink, Clock, Eye, Flame, Compass, Heart, Sun } from "lucide-react";

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
  isShort?: boolean;
}

const ASTRO_KC_SHARAN_VIDEOS: VideoItem[] = [
  {
    id: "s1",
    youtubeId: "LXb3EKWsInQ",
    title: "Signs of a Weak Sun & Mars: Symptoms & Authentic Vedic Remedies",
    category: "Graha Upaya",
    duration: "Short • 0:58",
    description:
      "Astro K.C. Sharan explains the psychological and health symptoms when Surya or Mangal are afflicted in your Kundali, and immediate remedies to strengthen your vitality.",
    views: "85K views",
    isShort: true,
  },
  {
    id: "s2",
    youtubeId: "kJQP7kiw5Fk",
    title: "Vastu Shastra: 3 Energy Mistakes Blocking Career & Financial Growth",
    category: "Vastu Science",
    duration: "Short • 0:54",
    description:
      "Crucial directional alignment guidelines for your workspace and home entrance to eliminate financial stagnation and invite positive cosmic vibrations.",
    views: "120K views",
    isShort: true,
  },
  {
    id: "s3",
    youtubeId: "fJ9rUzIMcZQ",
    title: "Kundali Milan: Why Ashtakoot Matching Alone Is Not Enough",
    category: "Kundali Milan",
    duration: "Short • 1:00",
    description:
      "Understanding Mangalik Dosha, Bhakoot, and planetary longevity factors in horoscope compatibility before finalizing marriage alliances.",
    views: "94K views",
    isShort: true,
  },
  {
    id: "s4",
    youtubeId: "9bZkp7q19f0",
    title: "Auspicious Timings & Planetary Transits: How to Choose a Muhurta",
    category: "Muhurta Guidance",
    duration: "Short • 0:52",
    description:
      "Astro K.C. Sharan shares the importance of Shubh Muhurtas for new business launches, Griha Pravesh, and sacred milestones.",
    views: "110K views",
    isShort: true,
  },
];

export default function YouTubeVideosSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(ASTRO_KC_SHARAN_VIDEOS[0]);
  const channelShortsUrl = "https://www.youtube.com/@AstroKCSharan/shorts";
  const channelHomeUrl = "https://www.youtube.com/@AstroKCSharan";

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
            Vedic Wisdom & Shorts
          </h2>
          <p className="text-white/60 text-base leading-relaxed">
            Watch astrological tips, Vastu remedies, and planetary transit insights by{" "}
            <span className="text-[#C9A24D] font-semibold">Astro K.C. Sharan</span> on his official
            YouTube Shorts and video discourses.
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
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
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
                  Creator: <strong className="text-white">Astro K.C. Sharan</strong> (@AstroKCSharan)
                </span>
                <a
                  href={channelShortsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C9A24D] hover:underline"
                >
                  Watch more on YouTube Shorts
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Playlist Column (1 col) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#C9A24D]" />
                Top Astrological Shorts
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
                    className={`text-left p-4 rounded-xl border transition-all flex gap-3.5 items-start ${
                      isSelected
                        ? "bg-[#C9A24D]/15 border-[#C9A24D]/40 text-white shadow-lg"
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
                      <div className="flex items-center gap-3 mt-1 text-[0.65rem] text-white/40">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.views}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Subscribe to @AstroKCSharan Box */}
            <div className="mt-4 p-5 rounded-2xl bg-gradient-to-br from-[#FF0000]/15 to-transparent border border-red-500/25 flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <IconYoutube className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-none">Astro K C Sharan</p>
                  <p className="text-white/40 text-xs mt-1">@AstroKCSharan</p>
                </div>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Watch daily Vedic horoscope insights, Rahu-Ketu remedies, and Vastu guidelines on YouTube Shorts.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={channelShortsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors shadow-md text-center"
                >
                  Explore Shorts
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={channelHomeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium px-3 py-2.5 rounded-lg transition-colors border border-white/15 text-center"
                >
                  Subscribe
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
