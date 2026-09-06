"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, Variants } from "framer-motion";
import { MessageSquareWarning, Send, ShieldCheck, User, Mail, Phone, Building2 } from "lucide-react";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function ComplaintBox() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    complaint: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendComplaint = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.complaint.trim()) {
      alert("Please enter your complaint.");
      return;
    }

    setLoading(true);

    const message = `
New Complaint Received

Name: ${form.name || "Not Provided"}
Email: ${form.email || "Not Provided"}
Phone: ${form.phone || "Not Provided"}
Department: ${form.department || "Not Provided"}

Complaint:
${form.complaint}
`;

    try {
      await emailjs.send(
        "service_uowwx9f",     // Service ID
        "template_kcy9mmv",    // Template ID
        {
          message: message,    // Template variable
        },
        "K-th3dE-aiwvi_9NO"     // Public Key
      );

      alert("Complaint submitted successfully.");

      setForm({
        name: "",
        email: "",
        phone: "",
        department: "",
        complaint: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit complaint.");
    }

    setLoading(false);
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-neutral-100 overflow-hidden selection:bg-white/20">
      {/* Background Subtle Glow Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={fadeInUp} className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <MessageSquareWarning className="w-4 h-4 text-neutral-300" />
              Student Grievance Redressal
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-linear-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
              COMPLAINT & SUGGESTION BOX
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
              Share your concerns, grievances, welfare requests, or suggestions directly with the Cochin University Students&apos; Union. Only the complaint description is required—identity details are completely optional.
            </p>
          </motion.div>

          {/* Form Outer Card */}
          <motion.div variants={fadeInUp} className="relative">
            {/* Ambient Outer Glow */}
            <div className="absolute -inset-1 rounded-[28px] bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800 opacity-40 blur-xl pointer-events-none" />

            {/* Outer Soft Ring Frame */}
            <div className="relative rounded-[28px] border border-neutral-800/80 bg-neutral-900/40 p-3 sm:p-5 shadow-2xl backdrop-blur-md">
              {/* Inner Card Container */}
              <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8 space-y-6">
                
                <form onSubmit={sendComplaint} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name (Optional)"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 pl-10 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition duration-200 focus:border-neutral-500 focus:bg-neutral-900"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email (Optional)"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 pl-10 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition duration-200 focus:border-neutral-500 focus:bg-neutral-900"
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number (Optional)"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 pl-10 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition duration-200 focus:border-neutral-500 focus:bg-neutral-900"
                      />
                    </div>

                    {/* Department Field */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="department"
                        placeholder="Department (Optional)"
                        value={form.department}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 pl-10 pr-4 py-3 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition duration-200 focus:border-neutral-500 focus:bg-neutral-900"
                      />
                    </div>
                  </div>

                  {/* Complaint Textarea */}
                  <div>
                    <textarea
                      required
                      name="complaint"
                      rows={6}
                      placeholder="Describe your complaint or suggestion here... *"
                      value={form.complaint}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 text-sm text-neutral-100 placeholder-neutral-500 outline-none transition duration-200 focus:border-neutral-500 focus:bg-neutral-900 resize-none"
                    />
                  </div>

                  {/* Privacy / Security Notice Bar */}
                  <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/40 p-3 flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      Anonymous submission supported. Your privacy is guaranteed.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg"
                    >
                      <span>{loading ? "Submitting..." : "Submit Complaint"}</span>
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}