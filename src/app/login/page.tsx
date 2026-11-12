'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef, useState, useEffect, useTransition } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useLanguage } from '@/context/LanguageContext'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav'
import Footer from '@/components/Footer'

type Step = 'phone' | 'otp'
type FieldError = string | null

// ─── Rate limit helpers ───────────────────────────────────────────────────────

function getRateLimitData(): { count: number; firstAttempt: number } {
  if (typeof window === 'undefined') return { count: 0, firstAttempt: 0 }
  try {
    const raw = localStorage.getItem('otp-rate-limit')
    return raw ? JSON.parse(raw) : { count: 0, firstAttempt: 0 }
  } catch { return { count: 0, firstAttempt: 0 } }
}

function incrementRateLimit() {
  const data = getRateLimitData()
  const now = Date.now()
  const windowMs = 60_000
  if (now - data.firstAttempt > windowMs) {
    localStorage.setItem('otp-rate-limit', JSON.stringify({ count: 1, firstAttempt: now }))
  } else {
    localStorage.setItem('otp-rate-limit', JSON.stringify({ count: data.count + 1, firstAttempt: data.firstAttempt }))
  }
}

function isRateLimited(): boolean {
  const { count, firstAttempt } = getRateLimitData()
  return count >= 3 && Date.now() - firstAttempt < 60_000
}

function getRateLimitSecondsLeft(): number {
  const { firstAttempt } = getRateLimitData()
  return Math.ceil((60_000 - (Date.now() - firstAttempt)) / 1000)
}

// ─── Phone validation ─────────────────────────────────────────────────────────

function validatePhone(phone: string): FieldError {
  const digits = phone.replace(/\D/g, '')
  if (!digits) return 'Phone number is required. / 電話番号を入力してください。'
  if (digits.length < 7) return 'Phone number is too short. / 電話番号が短すぎます。'
  if (digits.length > 15) return 'Phone number is too long. / 電話番号が長すぎます。'
  return null
}

// ─── OTP Input ────────────────────────────────────────────────────────────────

function OtpInput({ value, onChange, hasError }: { value: string; onChange: (v: string) => void; hasError: boolean }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([])
  const digits = Array.from({ length: 6 }, (_, i) => value[i] ?? '')

  function handleChange(idx: number, char: string) {
    if (!/^\d?$/.test(char)) return
    const next = digits.map((d, i) => i === idx ? char : d).join('')
    onChange(next)
    if (char && idx < 5) inputs.current[idx + 1]?.focus()
  }

  function handleKeyDown(idx: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace') {
      if (!digits[idx] && idx > 0) {
        const next = digits.map((d, i) => i === idx - 1 ? '' : d).join('')
        onChange(next)
        inputs.current[idx - 1]?.focus()
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    onChange(pasted)
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  const baseCell = "w-11 h-14 text-center text-xl font-bold rounded-xl border-2 bg-zinc-800 text-white transition-all focus:outline-none"
  const normalCell = "border-zinc-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
  const errorCell = "border-red-500 bg-red-500/5"

  return (
    <div className={`flex gap-2 justify-center ${hasError ? 'animate-shake' : ''}`} onPaste={handlePaste}>
      {digits.map((digit, idx) => (
        <input
          key={idx}
          ref={el => { inputs.current[idx] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(idx, e.target.value)}
          onKeyDown={e => handleKeyDown(idx, e)}
          className={`${baseCell} ${hasError ? errorCell : normalCell}`}
        />
      ))}
    </div>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <svg className="animate-spin-slow w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()
  const { user, isAuthenticated, login, logout } = useAuth()
  const { lang, t } = useLanguage()
  const [step, setStep] = useState<Step>('phone')
  const [mounted, setMounted] = useState(false)
  const [countryCode, setCountryCode] = useState('+81')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const [showEmail, setShowEmail] = useState(false)
  const [phoneError, setPhoneError] = useState<FieldError>(null)
  const [otpError, setOtpError] = useState<FieldError>(null)
  const [rateLimited, setRateLimited] = useState(false)
  const [rateLimitSeconds, setRateLimitSeconds] = useState(0)
  const [resendSeconds, setResendSeconds] = useState(60)
  const [phoneShake, setPhoneShake] = useState(false)
  const [otpShake, setOtpShake] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => { setMounted(true) }, [])

  // Rate limit countdown
  useEffect(() => {
    if (!rateLimited) return
    const id = setInterval(() => {
      const s = getRateLimitSecondsLeft()
      setRateLimitSeconds(s)
      if (s <= 0) { setRateLimited(false); clearInterval(id) }
    }, 1000)
    return () => clearInterval(id)
  }, [rateLimited])

  // OTP resend countdown
  useEffect(() => {
    if (step !== 'otp') return
    setResendSeconds(60)
    const id = setInterval(() => setResendSeconds(s => s <= 1 ? (clearInterval(id), 0) : s - 1), 1000)
    return () => clearInterval(id)
  }, [step])

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    const err = validatePhone(phone)
    if (err) {
      setPhoneError(err)
      setPhoneShake(true)
      setTimeout(() => setPhoneShake(false), 500)
      return
    }
    if (isRateLimited()) {
      setRateLimited(true)
      setRateLimitSeconds(getRateLimitSecondsLeft())
      return
    }
    incrementRateLimit()
    // TODO: call API
    startTransition(() => { setStep('otp') })
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    if (otp.length < 6) {
      setOtpError('Please enter the full 6-digit code. / 6桁のコードを入力してください。')
      setOtpShake(true)
      setTimeout(() => setOtpShake(false), 500)
      return
    }
    // Perform authentication
    login(`${countryCode} ${phone}`, email)
    startTransition(() => {
      router.push('/')
    })
  }

  function handleResend() {
    if (resendSeconds > 0) return
    setOtp('')
    setOtpError(null)
    setResendSeconds(60)
    // TODO: re-trigger OTP send
  }

  // Shared input class helpers
  const inputBase = "w-full px-4 py-3.5 rounded-xl border-2 bg-zinc-800 text-white placeholder:text-zinc-500 focus:outline-none transition-all text-sm"
  const inputNormal = "border-zinc-700 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
  const inputError = "border-red-500 bg-red-500/5"

  // suppress unused warning for otpShake (used for future animation hook)
  void otpShake

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100 pb-16 sm:pb-0">
      {/* Global Navbar with Language & Theme Switchers */}
      <Navbar />

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className={`w-full max-w-sm bg-zinc-900 border border-white/5 rounded-3xl shadow-2xl p-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>

          {/* Already Logged In State */}
          {isAuthenticated && user ? (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border border-red-500/40 mx-auto flex items-center justify-center text-3xl">
                👤
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-xs text-zinc-400 mt-1">{user.phone}</p>
                {user.email && <p className="text-xs text-zinc-500">{user.email}</p>}
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                  ● Signed in
                </span>
              </div>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block w-full py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 transition-colors text-sm glow-red"
                >
                  Go to Directory →
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="block w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs border border-white/5 transition-colors"
                >
                  Log out of this device
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Decorative kanji */}
              <div className="text-center mb-6 relative">
                <span className="text-8xl font-black text-white/[0.04] select-none absolute -top-2 left-1/2 -translate-x-1/2 leading-none">入</span>
                <div className="relative">
                  <h1 className="text-2xl font-extrabold text-white">
                    {step === 'phone' ? 'Welcome back' : 'Enter your code'}
                  </h1>
                  <p className="text-sm text-zinc-500 mt-1.5">
                    {step === 'phone' ? (
                      <>Sign in with your phone number<br/><span className="text-zinc-600 text-xs">電話番号でサインイン</span></>
                    ) : (
                      <>6-digit code sent to <strong className="text-white">{countryCode} {phone}</strong></>
                    )}
                  </p>
                </div>
              </div>

              {/* Quick Demo Sign-in Banner for Testing */}
              <div className="p-3.5 rounded-2xl bg-zinc-800/80 border border-white/10 space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{lang === "ja" ? "テスト用お試しログイン" : "Instant Demo Testing Login"}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Free / 即時
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 leading-tight">
                  {lang === "ja"
                    ? "会員限定機能（全店舗閲覧・予約・決済）をワンクリックでお試しいただけます。"
                    : "Test all member features (viewing all shops, reservations, payments) in 1-click."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    login("+81 90-1234-5678", "demo@machi-mise.jp");
                    router.push("/");
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs shadow glow-red transition-all"
                >
                  {lang === "ja" ? "ワンクリックでお試しログイン →" : "1-Click Demo Sign In →"}
                </button>
              </div>

              {/* STEP: phone */}
              {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2 tracking-wide uppercase">
                  Phone number 電話番号
                </label>
                <div className={`flex gap-2 ${phoneShake ? 'animate-shake' : ''}`}>
                  <select
                    value={countryCode}
                    onChange={e => { setCountryCode(e.target.value); setPhoneError(null) }}
                    className="shrink-0 w-24 px-2 py-3.5 rounded-xl border-2 border-zinc-700 bg-zinc-800 text-white text-sm focus:outline-none focus:border-red-500"
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
                    onChange={e => { setPhone(e.target.value); setPhoneError(null) }}
                    className={`${inputBase} ${phoneError ? inputError : inputNormal}`}
                    autoFocus
                  />
                </div>
                {phoneError && <p className="text-xs text-red-400 mt-2">{phoneError}</p>}
              </div>

              {/* Optional email */}
              <div>
                <button
                  type="button"
                  className="text-xs text-zinc-500 hover:text-red-400 transition-colors underline-offset-2 hover:underline"
                  onClick={() => setShowEmail(v => !v)}
                >
                  {showEmail ? '− Hide email' : '+ Add email (optional)'}
                </button>
                {showEmail && (
                  <div className="mt-2">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className={`${inputBase} ${inputNormal}`}
                    />
                  </div>
                )}
              </div>

              {rateLimited && (
                <div className="p-3 rounded-xl bg-red-900/20 border border-red-800/50">
                  <p className="text-xs text-red-400 font-medium">Too many attempts. Try again in {rateLimitSeconds}s.</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isPending || rateLimited}
                className="w-full py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-2"
              >
                {isPending ? <><Spinner /> Sending…</> : 'Send OTP コードを送る'}
              </button>

              <p className="text-center text-xs text-zinc-600 leading-relaxed">
                By continuing you agree to our{' '}
                <Link href="/terms" className="text-zinc-500 hover:text-red-400 underline underline-offset-2">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-zinc-500 hover:text-red-400 underline underline-offset-2">Privacy Policy</Link>.
              </p>
            </form>
          )}

          {/* STEP: otp */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5" noValidate>
              <div className="p-2.5 rounded-xl bg-zinc-800/80 border border-white/10 text-center">
                <span className="text-[11px] text-zinc-400">
                  {lang === "ja" ? "テスト用認証コード: " : "Test Verification Code: "}
                  <strong className="text-white font-mono bg-zinc-950 px-2 py-0.5 rounded border border-white/10">123456</strong>
                </span>
              </div>
              <OtpInput value={otp} onChange={v => { setOtp(v); setOtpError(null) }} hasError={!!otpError} />

              {otpError && (
                <p className="text-xs text-red-400 font-medium text-center">{otpError}</p>
              )}

              <button
                type="submit"
                disabled={isPending || otp.length < 6}
                className="w-full py-3.5 rounded-xl bg-red-600 text-white font-bold hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-2"
              >
                {isPending ? <><Spinner /> Verifying…</> : 'Verify & Sign in 確認'}
              </button>

              <div className="text-center space-y-2.5">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendSeconds > 0}
                  className="text-xs text-zinc-500 hover:text-red-400 disabled:cursor-default disabled:hover:text-zinc-500 transition-colors"
                >
                  {resendSeconds > 0 ? `Resend in ${resendSeconds}s` : 'Resend OTP 再送信'}
                </button>
                <br/>
                <button
                  type="button"
                  onClick={() => { setStep('phone'); setOtp(''); setOtpError(null) }}
                  className="text-xs text-zinc-500 hover:text-white transition-colors"
                >
                  ← Change phone number
                </button>
              </div>
            </form>
          )}
          </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-zinc-600 pb-6">
        New here?{' '}
        <Link href="/login" className="text-red-500 hover:text-red-400 font-medium">
          Signing in creates your account automatically.
        </Link>
      </p>

      {/* Global Footer & Mobile Nav */}
      <Footer />
      <MobileNav />
    </div>
  )
}
