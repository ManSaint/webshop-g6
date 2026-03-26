"use client";
 
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
 
type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
 
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
 
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
 
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message);
      }
 
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen bg-[#f5f2ed] font-serif">
      <Toaster position="top-center" toastOptions={{ style: { fontFamily: "sans-serif", fontSize: 13 } }} />
 
      <div className="relative h-52 md:h-72 bg-[#2c2a25] flex items-end overflow-hidden">
        <div className="absolute inset-0 opacity-30"
          style={{ background: "radial-gradient(ellipse at 70% 40%, #7a8c6a 0%, transparent 55%), radial-gradient(ellipse at 15% 75%, #b5a882 0%, transparent 50%)" }}
        />
        <div className="relative z-10 px-10 pb-8 md:px-16">
          <p className="text-[10px] tracking-[0.3em] uppercase font-sans text-white/50 mb-2">Maison</p>
          <h1 className="text-5xl md:text-6xl font-serif text-white tracking-tight leading-none">Contact</h1>
          <p className="mt-2 text-sm italic text-white/60 font-serif">We'd love to hear from you.</p>
        </div>
      </div>
 
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-[220px_1fr] gap-16 md:gap-24">
 
        <aside className="space-y-9 pt-1">
          {[
            { label: "Our Atelier", lines: ["12 Rue du Faubourg", "75008 Paris, France"] },
            { label: "Hours", lines: ["Monday – Friday", "10:00 – 18:00 CET"] },
          ].map(({ label, lines }) => (
            <div key={label}>
              <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#9a8f82] mb-2">{label}</p>
              {lines.map((l) => <p key={l} className="text-sm text-[#3a3530] leading-relaxed">{l}</p>)}
            </div>
          ))}
 
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#9a8f82] mb-2">Email</p>
            <a href="mailto:hello@maison.com"
              className="text-sm text-[#3a3530] border-b border-[#3a3530]/30 hover:border-[#3a3530] transition-colors pb-px">
              hello@maison.com
            </a>
          </div>
 
          <div className="w-6 h-px bg-[#c8bfb3]" />
          <p className="text-[11px] font-sans text-[#9a8f82] leading-relaxed">
            For press &amp; wholesale enquiries, please indicate your subject and our team will respond within two business days.
          </p>
        </aside>
 
        <div>
          {sent ? (
            <div className="flex flex-col gap-5 py-12">
              <div className="w-9 h-9 rounded-full bg-[#2c2a25] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h2 className="text-3xl font-serif text-[#1a1a1a]">Message received.</h2>
              <p className="text-sm font-sans text-[#7a7068] leading-relaxed max-w-sm">
                Thank you for reaching out. A member of our team will be in touch shortly.
              </p>
              <button onClick={() => setSent(false)}
                className="mt-3 w-fit text-[10px] tracking-[0.2em] uppercase font-sans text-[#3a3530] border-b border-[#3a3530]/30 hover:border-[#3a3530] transition-colors pb-px">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <InputField label="Full Name" name="name" type="text" value={form.name} onChange={handleChange} />
                <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} />
              </div>
 
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#9a8f82]">Subject</label>
                <div className="relative">
                  <select name="subject" value={form.subject} onChange={handleChange} required
                    className="w-full bg-transparent border-b border-[#c8bfb3] focus:border-[#2c2a25] outline-none py-2 pr-6 text-sm text-[#3a3530] font-sans appearance-none transition-colors cursor-pointer">
                    <option value="" disabled>Select a topic</option>
                    {["General Enquiry", "Order Support", "Press & Media", "Wholesale", "Careers", "Other"].map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                  <svg className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-[#9a8f82] pointer-events-none"
                    fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>
              </div>
 
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#9a8f82]">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Tell us how we can help…"
                  className="w-full bg-transparent border-b border-[#c8bfb3] focus:border-[#2c2a25] outline-none py-2 text-sm text-[#3a3530] font-sans placeholder:text-[#c8bfb3] resize-none transition-colors" />
              </div>
 
              <button type="submit" disabled={loading}
                className="px-8 py-3 bg-[#2c2a25] text-white text-[11px] tracking-[0.22em] uppercase font-sans hover:bg-[#1a1a1a] disabled:opacity-50 transition-colors">
                {loading ? "Sending…" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
 
function InputField({ label, name, type, value, onChange }: {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] tracking-[0.22em] uppercase font-sans text-[#9a8f82]">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required
        className="bg-transparent border-b border-[#c8bfb3] focus:border-[#2c2a25] outline-none py-2 text-sm text-[#3a3530] font-sans transition-colors" />
    </div>
  );
}