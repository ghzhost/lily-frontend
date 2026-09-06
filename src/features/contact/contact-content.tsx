"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { FormField } from "@/components/ui/form-field";

import { contactChannels, faqItems, responseGuidance } from "./contact-data";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactContent() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-16">
      {/* Contact Channels Grid */}
      <section aria-labelledby="channels-heading">
        <h2 id="channels-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          Direct Channels
        </h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Choose the best route for your inquiry to connect with the right team member.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {contactChannels.map((channel) => (
            <div
              key={channel.id}
              className="flex flex-col justify-between rounded-2xl border border-(--color-line) bg-(--color-panel) p-6 shadow-sm transition hover:border-(--color-accent)"
            >
              <div>
                <h3 className="text-lg font-semibold text-(--color-ink)">{channel.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-(--color-muted)">{channel.description}</p>
              </div>
              <div className="mt-6">
                <a
                  href={channel.href}
                  className="inline-flex items-center text-sm font-medium text-(--color-accent) hover:underline"
                >
                  {channel.actionLabel} &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Response Guidance Banner */}
      <section
        aria-label="Response time guidance"
        className="rounded-2xl border border-(--color-line) bg-(--color-panel-muted) p-6"
      >
        <h3 className="text-base font-semibold text-(--color-ink)">Response Expectations</h3>
        <div className="mt-3 grid gap-2 text-sm text-(--color-muted) sm:grid-cols-3">
          <div>
            <span className="font-medium text-(--color-ink)">General: </span>
            {responseGuidance.general}
          </div>
          <div>
            <span className="font-medium text-(--color-ink)">Security: </span>
            {responseGuidance.security}
          </div>
          <div>
            <span className="font-medium text-(--color-ink)">Availability: </span>
            {responseGuidance.availability}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section aria-labelledby="inquiry-heading">
        <h2 id="inquiry-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          Send an Inquiry
        </h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Fill out the form below and we will route your inquiry to the relevant engineering or support lead.
        </p>

        {submitted ? (
          <div
            role="status"
            className="mt-6 rounded-2xl border border-(--color-accent) bg-(--color-panel-muted) p-6 text-(--color-accent)"
          >
            <h3 className="text-lg font-semibold">Message Received</h3>
            <p className="mt-1 text-sm text-(--color-muted)">
              Thank you for reaching out. We have logged your inquiry and will be in touch shortly.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-6 max-w-xl space-y-5 rounded-2xl border border-(--color-line) bg-(--color-panel) p-6 sm:p-8"
          >
            <FormField
              label="Full Name"
              name="name"
              id="contact-name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              placeholder="Ada Lovelace"
            />

            <FormField
              label="Email Address"
              name="email"
              type="email"
              id="contact-email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="ada@example.com"
            />

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                aria-invalid={errors.message ? "true" : undefined}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={[
                  "rounded-md border px-3 py-2 text-sm outline-none transition-colors",
                  "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                  errors.message
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-slate-300",
                ].join(" ")}
                placeholder="How can we help you?"
              />
              {errors.message && (
                <p id="contact-message-error" className="text-xs text-red-600" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) focus-visible:ring-offset-2 sm:w-auto"
            >
              Submit Inquiry
            </button>
          </form>
        )}
      </section>

      {/* Frequently Asked Questions */}
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-2xl font-semibold tracking-tight text-(--color-ink)">
          Frequently Asked Questions
        </h2>
        <p className="mt-1 text-sm text-(--color-muted)">
          Quick answers to common questions regarding support, security, and open source collaboration.
        </p>

        <div className="mt-6 rounded-2xl border border-(--color-line) bg-(--color-panel) p-6">
          <Accordion>
            {faqItems.map((item) => (
              <AccordionItem key={item.question} title={item.question}>
                <p className="text-sm leading-relaxed">{item.answer}</p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
