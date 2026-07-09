"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FloatingField from "@/components/ui/FloatingField";
import Select from "@/components/ui/Select";
import { useSafeReducedMotion } from "@/lib/useSafeReducedMotion";
import styles from "./ApplyForm.module.css";

const ROLE_OPTIONS = [
  { value: "founder", label: "Founder / CEO (80% Cohort)" },
  { value: "creator", label: "Creator / Business Brand (20% Cohort)" },
];

const REVENUE_OPTIONS = [
  { value: "under_6L", label: "Under ₹6,00,000 / month" },
  { value: "6L_10L", label: "₹6,00,000 – ₹10,00,000 / month" },
  { value: "10L_15L", label: "₹10,00,000 – ₹15,00,000 / month" },
  { value: "over_15L", label: "Over ₹15,00,000 / month" },
];

const INITIAL_FORM = {
  name: "",
  email: "",
  age: "",
  company: "",
  revenue: "",
  role: "founder",
  bottleneck: "",
};

export default function ApplyForm() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const reduceMotion = useSafeReducedMotion();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.age || !formData.company || !formData.revenue) {
      setFormError("Please fill in all required fields to submit your application.");
      return;
    }

    const parsedAge = parseInt(formData.age);
    if (isNaN(parsedAge) || parsedAge >= 30) {
      setFormError("This program is strictly designed for founders & creators under 30 years old.");
      return;
    }

    setFormSubmitted(true);
    setFormError("");
  };

  return (
    <section id="apply" className={styles.section}>
      <div className={styles.container}>
        <Reveal className={styles.intro}>
          <span className="gradientAccent">STRICTLY LIMITED COHORT</span>
          <h2>Apply for the Residency</h2>
          <p>
            This is a premium, high-ticket, transformational experience. Admission is strictly via
            application and interview to ensure peer quality.
          </p>
          <Card className={styles.priceAnchor} hoverable={false}>
            <span className={styles.priceLabel}>PROGRAM INVESTMENT</span>
            <h3>&#8377;1,50,000+</h3>
            <p>
              Includes premium 3-day luxury residency boarding, meals, curriculum templates, and
              post-residency mentorship.
            </p>
          </Card>
        </Reveal>

        <Reveal delay={0.15}>
          <Card className={styles.formBox} hoverable={false}>
            <AnimatePresence mode="wait">
              {formSubmitted ? (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <div className={styles.successIcon}>
                    <Check size={30} aria-hidden="true" />
                  </div>
                  <h3>Application Received</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. We have successfully received your
                    application for the 10X Founder Residency.
                  </p>
                  <p className={styles.successNext}>
                    Our coordinator will review your company details and schedule a 15-minute
                    qualification call via <strong>{formData.email}</strong> within 24 hours.
                  </p>
                  <Button
                    variant="secondary"
                    className={styles.resetBtn}
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData(INITIAL_FORM);
                    }}
                  >
                    Submit another application
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className={styles.form}
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formError && (
                    <div className={styles.errorAlert} role="alert">
                      {formError}
                    </div>
                  )}

                  <FloatingField
                    label="Full Name *"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Adhithya Kumar"
                    required
                    error={!!formError && !formData.name}
                  />

                  <div className={styles.grid2}>
                    <FloatingField
                      label="Work Email *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. adhi@yourcompany.com"
                      required
                      error={!!formError && !formData.email}
                    />
                    <FloatingField
                      label="Age *"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Strictly < 30 (e.g. 25)"
                      min="18"
                      max="40"
                      required
                      error={!!formError && (!formData.age || parseInt(formData.age) >= 30)}
                    />
                  </div>

                  <div className={styles.grid2}>
                    <FloatingField
                      label="Company / Project Name *"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Apex Digital"
                      required
                      error={!!formError && !formData.company}
                    />
                    <Select
                      label="Primary Role *"
                      name="role"
                      value={formData.role}
                      onValueChange={handleSelectChange("role")}
                      options={ROLE_OPTIONS}
                      required
                    />
                  </div>

                  <Select
                    label="Current Monthly Revenue (INR) *"
                    name="revenue"
                    value={formData.revenue}
                    onValueChange={handleSelectChange("revenue")}
                    options={REVENUE_OPTIONS}
                    placeholder="Select range..."
                    required
                    error={!!formError && !formData.revenue}
                  />

                  <FloatingField
                    label="What is your biggest business bottleneck right now?"
                    name="bottleneck"
                    as="textarea"
                    rows={3}
                    value={formData.bottleneck}
                    onChange={handleInputChange}
                    placeholder="e.g. I am stuck firefighting client problems, I have no sales systems, or my team needs constant supervision..."
                  />

                  <Button type="submit" variant="primary" className={styles.submitBtn}>
                    Submit Qualification Application
                  </Button>
                  <p className={styles.formNotice}>* Vetting is strict. Only qualifying profiles will be contacted.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
