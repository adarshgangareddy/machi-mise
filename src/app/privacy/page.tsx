import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "machi-mise privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Legal / 法律情報
            </p>
            <h1 className="text-4xl font-black text-white">Privacy Policy</h1>
            <p className="text-zinc-500 text-sm mt-1">
              プライバシーポリシー · Last updated: November 2026
            </p>
          </div>

          <hr className="border-white/5 mb-10" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              1. Information We Collect / 収集する情報
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We collect the following information when you use machi-mise:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-2">
              <li>
                <strong className="text-zinc-300">Phone number</strong> — used
                for account authentication via OTP
              </li>
              <li>
                <strong className="text-zinc-300">Optional email address</strong>{" "}
                — for account recovery and notifications
              </li>
              <li>
                <strong className="text-zinc-300">Browsing behavior</strong> —
                pages visited, searches performed, listings viewed
              </li>
              <li>
                <strong className="text-zinc-300">Device information</strong> —
                browser type, operating system, IP address
              </li>
            </ul>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              2. How We Use Your Information / 利用目的
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Your information is used for the following purposes:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-2">
              <li>Account authentication and security</li>
              <li>
                Improving our service based on how users interact with the
                platform
              </li>
              <li>
                Sending communications and updates — only with your explicit
                consent
              </li>
              <li>
                Personalizing your experience with relevant restaurant and shop
                recommendations
              </li>
            </ul>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              3. Data Storage / データの保存
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              All user data is stored securely on Japan-based servers. Data is
              encrypted at rest using industry-standard AES-256 encryption and
              in transit using TLS 1.3. We retain data only as long as necessary
              to provide our services or as required by Japanese law.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              4. Cookies / クッキー
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              machi-mise uses two categories of cookies:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-2">
              <li>
                <strong className="text-zinc-300">Essential cookies</strong> —
                required for authentication sessions and core site functionality.
                These cannot be disabled.
              </li>
              <li>
                <strong className="text-zinc-300">Analytics cookies</strong> —
                optional cookies that help us understand how visitors use the
                site. You may opt out at any time from your account settings.
              </li>
            </ul>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              5. Your Rights / お客様の権利
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Under applicable Japanese privacy law, you have the right to:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request deletion of your account and associated data</li>
              <li>Export your data in a portable format</li>
              <li>
                Withdraw consent for optional communications at any time
              </li>
            </ul>
            <p className="text-zinc-400 leading-relaxed mb-4">
              To exercise these rights, contact us at{" "}
              <a
                href="mailto:privacy@machi-mise.jp"
                className="text-red-400 hover:text-red-300 underline"
              >
                privacy@machi-mise.jp
              </a>
              .
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              6. Contact / お問い合わせ
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              For privacy-related enquiries, please reach out to us:
            </p>
            <p className="text-zinc-400 leading-relaxed mb-1">
              📧{" "}
              <a
                href="mailto:privacy@machi-mise.jp"
                className="text-red-400 hover:text-red-300 underline"
              >
                privacy@machi-mise.jp
              </a>
            </p>
            <p className="text-zinc-400 leading-relaxed mb-1">
              🏢 machi-mise Inc. · Tokyo, Japan 🇯🇵
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <Link
            href="/terms"
            className="text-red-400 hover:text-red-300"
          >
            View Terms of Service →
          </Link>
        </div>
      </main>
    </>
  );
}

