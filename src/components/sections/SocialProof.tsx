"use client";

import { useState } from "react";
import { Play, Star, User, X, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import RevealItem from "@/components/RevealItem";
import styles from "./SocialProof.module.css";

interface Testimonial {
  name: string;
  role: string;
  videoUrl?: string;
  posterUrl?: string;
  title?: string;
  description?: string;
  rating?: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Richard",
    role: "Sales, CNC",
    videoUrl: "https://www.youtube.com/shorts/-3jo1GHUrVc",
    posterUrl: "/thumnial.jpg",
  },
  {
    name: "[Founder Name]",
    role: "[Title, Company]",
    title: "[Result headline goes here]",
    description: "[Client testimonial quote goes here — replace with a real result.]",
  },
  {
    name: "[Founder Name]",
    role: "[Title, Company]",
    title: "[Result headline goes here]",
    description: "[Client testimonial quote goes here — replace with a real result.]",
  },
  // {
  //   name: "[Founder Name]",
  //   role: "[Title, Company]",
  //   title: "[Result headline goes here]",
  //   description: "[Client testimonial quote goes here — replace with a real result.]",
  // },
];

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function SocialProof() {
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);

  return (
    <section id="testimonials" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>Trusted & Proven</span>
        <h2>Real Success Stories</h2>
        <p>Trusted by ambitious entrepreneurs and backed by proven results.</p>
      </Reveal>

      <Reveal stagger className={styles.grid}>
        {TESTIMONIALS.map((t, idx) => {
          const videoId = t.videoUrl ? getYouTubeId(t.videoUrl) : null;
          const isPlaying = playingIdx === idx && videoId;

          const isVideoCard = Boolean(videoId);
          const initials = t.name
            .replace(/[[\]]/g, "")
            .split(" ")
            .map((part) => part[0])
            .slice(0, 2)
            .join("")
            .toUpperCase();

          if (isVideoCard) {
            return (
              <RevealItem className={styles.card} key={`${t.name}-${idx}`}>
                <div className={styles.thumb}>
                  {isPlaying ? (
                    <>
                      <iframe
                        key={videoId}
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title={`${t.name} video testimonial`}
                        className={styles.video}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                      />
                      <button
                        type="button"
                        className={styles.stopBtn}
                        onClick={() => setPlayingIdx(null)}
                        aria-label="Stop video"
                      >
                        <X size={16} aria-hidden="true" />
                      </button>
                    </>
                  ) : (
                    <>
                      {t.posterUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={t.posterUrl}
                          alt=""
                          className={styles.posterImg}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className={styles.avatarFallback}>
                          <User size={28} aria-hidden="true" />
                        </div>
                      )}

                      <div className={styles.scrim} aria-hidden="true" />

                      <button
                        type="button"
                        className={styles.playBtn}
                        onClick={() => setPlayingIdx(idx)}
                        aria-label={`Play video testimonial from ${t.name}`}
                      >
                        <Play size={18} fill="currentColor" aria-hidden="true" />
                      </button>

                      <div className={styles.overlayAuthor}>
                        <span className={styles.name}>{t.name}</span>
                        <span className={styles.role}>{t.role}</span>
                      </div>
                    </>
                  )}
                </div>
              </RevealItem>
            );
          }

          return (
            <RevealItem className={styles.card} key={`${t.name}-${idx}`}>
              <div className={styles.body}>
                <Quote size={18} className={styles.quoteIcon} aria-hidden="true" />

                <div className={styles.author}>
                  <span className={styles.avatarInitials} aria-hidden="true">
                    {initials}
                  </span>
                  <div>
                    <span className={styles.name}>{t.name}</span>
                    <span className={styles.role}>{t.role}</span>
                  </div>
                </div>

                {t.title && <h3 className={styles.cardTitle}>{t.title}</h3>}
                {t.description && <p className={styles.description}>{t.description}</p>}

                {typeof t.rating === "number" && (
                  <div className={styles.rating} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill={i < t.rating! ? "currentColor" : "none"} />
                    ))}
                  </div>
                )}
              </div>
            </RevealItem>
          );
        })}
      </Reveal>
    </section>
  );
}
