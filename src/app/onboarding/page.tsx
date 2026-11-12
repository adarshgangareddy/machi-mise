"use client";

import { useState } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3;
type Role = "customer" | "business" | null;

const CATEGORIES = [
  "Ramen",
  "Sushi",
  "Izakaya",
  "Tempura",
  "Udon",
  "Yakitori",
  "Wagashi",
  "Craft",
];

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<Role>(null);
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(cat: string) {
    setInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  }

  function goNext() {
    if (step < 3) setStep((s) => (s + 1) as Step);
  }

  function goBack() {
    if (step > 1) setStep((s) => (s - 1) as Step);
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Step indicator dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {([1, 2, 3] as Step[]).map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step
                  ? "bg-red-600"
                  : "bg-zinc-700 border border-zinc-600"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Role selection */}
        {step === 1 && (
          <div>
            <h1 className="text-2xl font-black text-white text-center mb-2">
              Tell us about you
            </h1>
            <p className="text-zinc-500 text-center text-sm mb-8">
              あなたについて教えてください
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setRole("customer")}
                className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                  role === "customer"
                    ? "border-red-500 bg-red-500/5"
                    : "border-zinc-700 bg-zinc-900 hover:border-red-500"
                }`}
              >
                <div className="text-4xl mb-3">🍜</div>
                <p className="text-white font-bold text-lg mb-1">
                  I&apos;m a Customer
                </p>
                <p className="text-zinc-500 text-sm">
                  Looking for restaurants &amp; local shops
                </p>
              </button>
              <button
                type="button"
                onClick={() => setRole("business")}
                className={`p-6 rounded-2xl border-2 text-left cursor-pointer transition-all ${
                  role === "business"
                    ? "border-red-500 bg-red-500/5"
                    : "border-zinc-700 bg-zinc-900 hover:border-red-500"
                }`}
              >
                <div className="text-4xl mb-3">🏪</div>
                <p className="text-white font-bold text-lg mb-1">
                  I&apos;m a Business Owner
                </p>
                <p className="text-zinc-500 text-sm">
                  Want to list my shop on machi-mise
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-black text-white text-center mb-2">
              Pick your interests
            </h1>
            <p className="text-zinc-500 text-center text-sm mb-8">
              興味のあるジャンル
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {CATEGORIES.map((cat) => {
                const selected = interests.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleInterest(cat)}
                    className={`py-3 px-4 rounded-full border-2 text-sm font-medium transition-all ${
                      selected
                        ? "border-red-500 bg-red-500/10 text-red-300"
                        : "border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-red-500"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: All set */}
        {step === 3 && (
          <div className="text-center">
            <div className="text-7xl mb-4">🎉</div>
            <h1 className="text-3xl font-black text-white mb-2">
              Welcome to machi-mise!
            </h1>
            <p className="text-zinc-500 mb-10">まちの店へようこそ</p>
            <Link
              href="/"
              className="inline-block px-10 py-3.5 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition-colors"
            >
              Start Exploring →
            </Link>
          </div>
        )}

        {/* Navigation buttons */}
        {step < 3 && (
          <div className="flex items-center justify-between gap-4 mt-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={goBack}
                className="px-6 py-3 rounded-full border border-zinc-700 text-zinc-400 text-sm font-medium hover:border-zinc-500 hover:text-zinc-300 transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            <button
              type="button"
              onClick={goNext}
              disabled={step === 1 && role === null}
              className="px-8 py-3 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-red-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

