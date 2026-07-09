"use client";

import { useId, useState } from "react";
import type { ChangeEvent } from "react";
import styles from "./FloatingField.module.css";

interface FloatingFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  as?: "input" | "textarea";
  rows?: number;
  min?: string | number;
  max?: string | number;
  error?: boolean;
}

export default function FloatingField({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  as = "input",
  rows,
  min,
  max,
  error,
}: FloatingFieldProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;

  const sharedProps = {
    id,
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: `${styles.field} ${error ? styles.fieldError : ""}`,
    placeholder: focused ? placeholder : "",
    required,
    "aria-required": required,
  };

  return (
    <div className={`${styles.group} ${error ? styles.groupError : ""}`}>
      {as === "textarea" ? (
        <textarea {...sharedProps} rows={rows ?? 3} />
      ) : (
        <input {...sharedProps} type={type} min={min} max={max} />
      )}
      <label htmlFor={id} className={`${styles.label} ${floated ? styles.labelFloated : ""}`}>
        {label}
      </label>
    </div>
  );
}
