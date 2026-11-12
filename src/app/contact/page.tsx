import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the machi-mise team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-zinc-950 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Get in touch
            </p>
            <h1 className="text-4xl font-black text-white">
              Contact Us / お問い合わせ
            </h1>
            <p className="text-zinc-500 text-sm mt-2">
              We&apos;d love to hear from you. Send us a message and we&apos;ll
              respond within 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Contact info */}
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-8 h-fit">
              <h2 className="text-lg font-bold text-white mb-6">
                Contact Information
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:contact@machi-mise.jp"
                      className="text-red-400 hover:text-red-300 underline text-sm"
                    >
                      contact@machi-mise.jp
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🏢</span>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="text-zinc-300 text-sm">Tokyo, Japan 🇯🇵</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                      Hours
                    </p>
                    <p className="text-zinc-300 text-sm">
                      Weekdays 9AM–6PM JST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Contact form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

