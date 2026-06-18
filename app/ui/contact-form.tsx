"use client";

import { FormEvent, useState } from "react";
import { CONTACT_COPY } from "../lib/content";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      building: String(formData.get("building") || ""),
      platform: String(formData.get("platform") || ""),
      timeline: String(formData.get("timeline") || ""),
      budget: String(formData.get("budget") || ""),
      source: String(formData.get("source") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string; ok?: boolean };

      if (!response.ok) {
        throw new Error(result.error || "Could not send your message.");
      }

      form.reset();
      setStatus("sent");
    } catch (caught) {
      setStatus("error");
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Email me directly: atharmushtaq9@gmail.com",
      );
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="included-block">
        <h3>{CONTACT_COPY.includedTitle}</h3>
        <ul>
          {CONTACT_COPY.included.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="field-pair">
        <label htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={100}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
        <label htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          required
          maxLength={120}
          placeholder="you@example.com"
          type="email"
        />
      </div>

      <label htmlFor="building">
        What are you building?
      </label>
      <textarea
        id="building"
        name="building"
        required
        maxLength={2000}
        minLength={10}
        placeholder="Describe the problem you're solving and who it's for."
        rows={6}
      />

      <div className="field-pair">
        <label htmlFor="platform">
          Platform
        </label>
        <select id="platform" name="platform" required defaultValue="">
          <option value="" disabled>Select one</option>
          <option>Mobile App</option>
          <option>Web App / SaaS</option>
          <option>iOS / Apple Platform</option>
          <option>Game</option>
          <option>AI Integration</option>
          <option>Internal Tool</option>
          <option value="deployment">Deployment / Cloud Support</option>
          <option>Other</option>
        </select>
        <label htmlFor="timeline">
          Timeline
        </label>
        <select id="timeline" name="timeline" required defaultValue="">
          <option value="" disabled>Select one</option>
          <option>Under 1 month</option>
          <option>1-3 months</option>
          <option>3-6 months</option>
          <option>Flexible / Not yet decided</option>
        </select>
      </div>

      <div className="field-pair">
        <label htmlFor="budget">
          Budget
        </label>
        <select id="budget" name="budget" required defaultValue="">
          <option value="" disabled>Select one</option>
          <option>Under $5K</option>
          <option>$5K - $15K</option>
          <option>$15K - $50K</option>
          <option>$50K+</option>
          <option>Let&apos;s discuss</option>
        </select>
        <label htmlFor="source">
          How did you find me?
        </label>
        <input
          id="source"
          name="source"
          maxLength={200}
          placeholder="LinkedIn, GitHub, referral..."
        />
      </div>

      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="button primary" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" ? (
        <p className="form-success">
          Got it{name.trim() ? `, ${name.trim()}` : ""}. I&apos;ll read this carefully
          and get back to you within 24 hours.
        </p>
      ) : null}
      {status === "error" ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
