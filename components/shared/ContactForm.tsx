'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Dataset or Calculation Query');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.trim().length < 15) {
      setError('Please enter a message of at least 15 characters.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg font-bold">Message Prepared</h2>
            <p className="mt-1 text-sm leading-relaxed">
              Thank you, {name}. Your feedback regarding &ldquo;{topic}&rdquo; has been validated. For urgent payroll or tax queries, please contact your Trust payroll team, NHSBSA, or HMRC directly, or email hello@nhsstaffcalculator.co.uk.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="mt-4 rounded-lg border border-emerald-300 bg-white px-4 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-100"
            >
              Send another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6">
      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold text-[#2F3432]">
          Your Name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-[#2F3432]">
          Email Address
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="contact-topic" className="block text-xs font-semibold text-[#2F3432]">
          Enquiry Topic
        </label>
        <select
          id="contact-topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1.5 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-[#2F3432]"
        >
          <option>Dataset or Calculation Query</option>
          <option>Report an Outdated Pay Circular</option>
          <option>Accessibility or Technical Feedback</option>
          <option>Editorial &amp; General Enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-[#2F3432]">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please avoid including sensitive personal identifiers such as your National Insurance number or ESR payroll ID."
          className="mt-1.5 w-full rounded-lg border border-slate-200 p-3 text-sm text-[#2F3432] focus:border-[#149777] focus:outline-none"
          required
        />
      </div>

      {error && (
        <p role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#149777] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#108266]"
      >
        Submit Enquiry
      </button>
    </form>
  );
}
