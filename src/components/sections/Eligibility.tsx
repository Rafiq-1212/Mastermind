"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Card from "@/components/ui/Card";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./Eligibility.module.css";

export default function Eligibility() {
  const [activeProfile, setActiveProfile] = useState<"founder" | "creator">("founder");
  const reduceMotion = useSafeReducedMotion();

  return (
    <section id="eligibility" className={styles.section}>
      <Reveal className={styles.sectionHeader}>
        <span className={styles.sectionTag}>TARGET AUDIENCE</span>
        <h2>Is This You?</h2>
        <p>
          The program is strictly vetted and curated to maintain an elite level of peer networking and
          peer-to-peer learning.
        </p>
      </Reveal>

      <Reveal className={styles.box}>
        <div className={styles.toggle}>
          <button
            className={
              activeProfile === "founder" ? `${styles.toggleBtn} ${styles.toggleBtnActive}` : styles.toggleBtn
            }
            onClick={() => setActiveProfile("founder")}
          >
            Founders &amp; Builders (80% of Cohort)
          </button>
          <button
            className={
              activeProfile === "creator" ? `${styles.toggleBtn} ${styles.toggleBtnActive}` : styles.toggleBtn
            }
            onClick={() => setActiveProfile("creator")}
          >
            Creators &amp; Personal Brands (20% of Cohort)
          </button>
        </div>

        <Card className={styles.container} hoverable={false}>
          <AnimatePresence mode="wait">
            {activeProfile === "founder" ? (
              <motion.div
                key="founder"
                className={styles.grid}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={styles.details}>
                  <h3>Execution-Driven Builders Under 29</h3>
                  <p className={styles.intro}>
                    You are already building something meaningful but feel stuck, overwhelmed, or unclear
                    about your next stage of growth.
                  </p>

                  <div className={styles.listGroup}>
                    <h4>Who is this for?</h4>
                    <ul>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Agency founders ready to break out of labor-intensive custom work</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>SaaS founders looking to scale monthly recurring revenue (MRR)</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>D2C founders scaling ecommerce brands and logistics</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Service and Consulting business owners seeking predictable clients</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Education &amp; content business founders scaling knowledge projects</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Family business successors modernizing operations for the digital age</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.sidebar}>
                  <div className={styles.eligibilityCard}>
                    <h4>Strict Requirements:</h4>
                    <ul>
                      <li>
                        <strong>Geography:</strong> Tamil Nadu-based founders and builders.
                      </li>
                      <li>
                        <strong>Age:</strong> Strictly under 29 years old.
                      </li>
                      <li>
                        <strong>Stage:</strong> Product or service already launched, generating revenue.
                      </li>
                      <li>
                        <strong>Volume:</strong> Generating &#8377;6L&ndash;&#8377;15L/month in business
                        revenue.
                      </li>
                      <li>
                        <strong>Intent:</strong> Comfortable investing &#8377;1.5L+ to solve structural
                        growth bottlenecks.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="creator"
                className={styles.grid}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className={styles.details}>
                  <h3>Creators Building Businesses, Not Just Audiences</h3>
                  <p className={styles.intro}>
                    You have built influence, but you want to transform that leverage into a scalable,
                    high-ticket, institutional asset.
                  </p>

                  <div className={styles.listGroup}>
                    <h4>Who is this for?</h4>
                    <ul>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Educators and course creators looking to automate operations</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Coaches scaling from 1-on-1 calls to high-ticket masterminds</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Personal brand entrepreneurs building scalable backend companies</span>
                      </li>
                      <li>
                        <ArrowRight size={14} aria-hidden="true" />
                        <span>Content business operators hiring editors and content strategists</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.sidebar}>
                  <div className={styles.eligibilityCard}>
                    <h4>Strict Requirements:</h4>
                    <ul>
                      <li>
                        <strong>Geography:</strong> Tamil Nadu-based creators.
                      </li>
                      <li>
                        <strong>Age:</strong> Strictly under 29 years old.
                      </li>
                      <li>
                        <strong>Stage:</strong> Already generating personal brand revenue, not just views.
                      </li>
                      <li>
                        <strong>Revenue:</strong> Personal income of &#8377;1L&ndash;&#8377;2L/month or
                        business revenue of &#8377;6L&ndash;&#8377;15L/month.
                      </li>
                      <li>
                        <strong>Scale:</strong> Actively scaling systems to offload editing, writing, or
                        coaching.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </Reveal>
    </section>
  );
}
