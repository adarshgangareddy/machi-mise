"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

// ── OTP Input ─────────────────────────────────────────────────────────────────

function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  function handleChange(idx: number, char: string) {
    if (!/^\d?$/.test(char)) return;
    const next = digits
      .map((d, i) => (i === idx ? char || " " : d))
      .join("")
      .trimEnd();
    onChange(next);
    if (char && idx < 5) inputs.current[idx + 1]?.focus();
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !digits[idx].trim() && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
  }

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => { inputs.current[idx] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit.trim()}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className="w-11 h-14 text-center text-xl font-bold border-2 rounded-xl border-stone-300 focus:border-red-600 focus:outline-none transition-colors bg-white text-stone-900"
        />
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

type Step = "phone" | "otp";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+81");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (phone.replace(/\D/g, "").length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    // TODO: call API to send OTP
    startTransition(() => {
      setStep("otp");
    });
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (otp.trim().length < 6) {
      setError("Please enter the 6-digit code.");
      return;
    }
    // TODO: verify OTP via API
    startTransition(() => {
      router.push("/");
    });
  }

  function handleResend() {
    setOtp("");
    setError("");
    // TODO: re-trigger OTP send
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Top bar */}
      <div className="px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-red-700 text-2xl font-bold leading-none">店</span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-widest text-stone-900 uppercase">
              machi-mise
            </span>
            <span className="text-[10px] text-stone-400 tracking-wider">
              まちの店
            </span>
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-red-700 transition-colors"
        >
          ← Back to browse
        </Link>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-stone-200 shadow-sm p-8">
          {/* Decorative kanji */}
          <div className="text-center mb-6">
            <span className="text-5xl font-black text-red-100 select-none leading-none block">
              入
            </span>
            <h1 className="text-2xl font-extrabold text-stone-900 mt-1">
              {step === "phone" ? "Welcome back" : "Verify your number"}
            </h1>
            <p className="text-sm text-stone-500 mt-1.5">
              {step === "phone" ? (
                <>
                  Sign in with your phone number
                  <br />
                  <span className="text-stone-400 text-xs">
                    電話番号でサインイン
                  </span>
                </>
              ) : (
                <>
                  Enter the 6-digit code sent to
                  <br />
                  <span className="font-semibold text-stone-700">
                    {countryCode} {phone}
                  </span>
                </>
              )}
            </p>
          </div>

          {/* ── Step: Phone ── */}
          {step === "phone" && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5 tracking-wide uppercase">
                  Phone number 電話番号
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="shrink-0 w-24 px-2 py-3 rounded-xl border-2 border-stone-200 focus:border-red-500 focus:outline-none text-sm bg-white text-stone-700"
                  >
                    <option value="+81">🇯🇵 +81</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+82">🇰🇷 +82</option>
                    <option value="+86">🇨🇳 +86</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="090-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-red-500 focus:outline-none text-sm transition-colors"
                    autoFocus
                  />
                </div>
              </div>

              {/* Optional email */}
              <div>
                <button
                  type="button"
                  className="text-xs text-stone-400 hover:text-red-600 transition-colors underline-offset-2 hover:underline"
                  onClick={() => setShowEmail((v) => !v)}
                >
                  {showEmail ? "Hide email (optional)" : "+ Add email (optional)"}
                </button>
                {showEmail && (
                  <div className="mt-2">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-red-500 focus:outline-none text-sm transition-colors"
                    />
                  </div>
                )}
              </div>

              {error && (
                <p className="text-xs text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl bg-red-700 text-white font-bold hover:bg-red-800 disabled:opacity-60 transition-colors text-sm"
              >
                {isPending ? "Sending…" : "Send OTP コードを送る"}
              </button>

              <p className="text-center text-xs text-stone-400 leading-relaxed">
                By continuing you agree to our{" "}
                <a href="#" className="underline hover:text-red-600">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="underline hover:text-red-600">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          )}

          {/* ── Step: OTP ── */}
          {step === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <OtpInput value={otp} onChange={setOtp} />

              {error && (
                <p className="text-xs text-red-600 font-medium text-center">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isPending || otp.trim().length < 6}
                className="w-full py-3.5 rounded-xl bg-red-700 text-white font-bold hover:bg-red-800 disabled:opacity-60 transition-colors text-sm"
              >
                {isPending ? "Verifying…" : "Verify & Sign in 確認"}
              </button>

              <div className="text-center space-y-2">
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-xs text-stone-500 hover:text-red-600 transition-colors underline-offset-2 hover:underline"
                >
                  Didn't receive a code? Resend 再送信
                </button>
                <br />
                <button
                  type="button"
                  onClick={() => { setStep("phone"); setOtp(""); setError(""); }}
                  className="text-xs text-stone-400 hover:text-red-600 transition-colors"
                >
                  ← Change phone number
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-center text-xs text-stone-400 pb-6">
        New here?{" "}
        <Link href="/login" className="text-red-700 hover:underline font-medium">
          Signing in creates your account automatically.
        </Link>
      </p>
    </div>
  );
}
