import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "machi-mise terms of service.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Legal / 法律情報
            </p>
            <h1 className="text-4xl font-black text-white">Terms of Service</h1>
            <p className="text-zinc-500 text-sm mt-1">
              利用規約 · Last updated: November 2026
            </p>
          </div>

          <hr className="border-white/5 mb-10" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              1. Acceptance of Terms
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              By accessing or using machi-mise (&ldquo;the Service&rdquo;), you agree to
              be bound by these Terms of Service. If you do not agree to these
              terms, please do not use the Service. We reserve the right to
              update these terms at any time; continued use of the Service
              following any changes constitutes acceptance of those changes.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              2. Use of Service / サービスの利用
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              machi-mise provides a platform for discovering Japanese restaurants
              and local shops. You agree to use the Service only for lawful
              purposes and in accordance with these Terms. The Service is
              intended for users who are at least 13 years of age. By using the
              Service, you represent that you meet this requirement.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              3. User Accounts / ユーザーアカウント
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              To access certain features of the Service, you must create an
              account using your phone number. You are responsible for
              maintaining the confidentiality of your account and for all
              activities that occur under your account. You agree to notify us
              immediately of any unauthorized use of your account.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              You must provide accurate and complete information when creating
              your account and keep this information up to date.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              4. Business Listings / ビジネス掲載
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              Business owners may submit listings for their restaurants or shops.
              By submitting a listing, you represent that you are authorized to
              act on behalf of the business. All listing content must be
              accurate, up to date, and comply with applicable laws. machi-mise
              reserves the right to remove or edit any listing that violates
              these Terms or our content guidelines.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              5. Prohibited Conduct / 禁止行為
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              You agree not to engage in any of the following prohibited
              activities:
            </p>
            <ul className="text-zinc-400 leading-relaxed mb-4 list-disc list-inside space-y-2">
              <li>Posting false, misleading, or fraudulent content</li>
              <li>
                Harassing, threatening, or abusing other users or business
                owners
              </li>
              <li>
                Using automated tools to scrape, crawl, or index the Service
                without permission
              </li>
              <li>
                Attempting to gain unauthorized access to any part of the
                Service
              </li>
              <li>
                Submitting spam reviews, fake listings, or manipulated ratings
              </li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              6. Termination / 解約
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We reserve the right to suspend or terminate your account at our
              discretion if you violate these Terms or engage in conduct that we
              determine to be harmful to the Service or its users.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              <strong className="text-zinc-300">Delete Account:</strong> You may
              delete your account at any time from your account settings. Upon
              deletion, your personal data will be removed in accordance with
              our Privacy Policy.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              7. Governing Law / 準拠法
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of Japan. Any disputes arising out of or in connection
              with these Terms shall be subject to the exclusive jurisdiction of
              the courts located in Tokyo, Japan.
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <section className="mb-10">
            <h2 className="text-xl font-bold text-white mt-10 mb-3">
              8. Contact
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              For legal enquiries, please contact us at:
            </p>
            <p className="text-zinc-400 leading-relaxed mb-1">
              📧{" "}
              <a
                href="mailto:legal@machi-mise.jp"
                className="text-red-400 hover:text-red-300 underline"
              >
                legal@machi-mise.jp
              </a>
            </p>
          </section>

          <hr className="border-white/5 my-8" />

          <Link href="/privacy" className="text-red-400 hover:text-red-300">
            View Privacy Policy →
          </Link>
        </div>
      </main>
    </>
  );
}

