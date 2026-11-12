"use client";

import { useState } from "react";

type Errors = Record<string, string>;

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const errs: Errors = {};
    if (!name.trim()) errs.name = "Name is required.";
    if (!email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!message.trim()) {
      errs.message = "Message is required.";
    } else if (message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters.";
    }
    return errs;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-white mb-2">Message sent!</h2>
        <p className="text-zinc-500">
          ありがとうございます。We&apos;ll get back to you within 48 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "bg-zinc-800 border-2 border-zinc-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 rounded-xl px-4 py-3 text-white text-sm w-full focus:outline-none transition-all";
  const labelClass = "text-xs text-zinc-400 uppercase tracking-wide mb-1 block";

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="Your name"
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} min-h-32 resize-y`}
          placeholder="How can we help you?"
        />
        {errors.message && (
          <p className="text-xs text-red-400 mt-1">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors text-sm"
      >
        Send Message 送信
      </button>
    </form>
  );
}

