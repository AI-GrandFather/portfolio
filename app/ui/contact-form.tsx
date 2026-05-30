"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      projectType: projectType === "Other" 
        ? `Other: ${formData.get("otherProject")}` 
        : projectType,
      budget: String(formData.get("budget") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""), // Honeypot
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
      setProjectType("");
      setStatus("sent");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Could not send your message.");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-pair">
        <label>
          Name
          <input name="name" required maxLength={80} placeholder="Your name" />
        </label>
        <label>
          Email
          <input
            name="email"
            required
            maxLength={120}
            placeholder="you@example.com"
            type="email"
          />
        </label>
      </div>

      <div className="field-pair">
        <label>
          Project category
          <select 
            name="projectCategory" 
            required 
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="" disabled>Select category</option>
            <option value="Mobile App (Flutter/iOS)">Mobile App (Flutter/iOS)</option>
            <option value="Web App or SaaS">Web App or SaaS</option>
            <option value="AI Agent / MCP Server">AI Agent / MCP Server</option>
            <option value="Business Dashboard">Business Dashboard</option>
            <option value="Game Development">Game Development</option>
            <option value="Other">Other Project</option>
          </select>
        </label>
        <label>
          Budget range
          <select name="budget" required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Exploring</option>
            <option>Under $2,500</option>
            <option>$2,500 - $10,000</option>
            <option>$10,000+</option>
          </select>
        </label>
      </div>

      {projectType === "Other" && (
        <label className="animate-fade-in-up">
          Custom Project Type
          <input 
            name="otherProject" 
            required 
            maxLength={100} 
            placeholder="e.g. Chrome Extension, Desktop Utility, etc." 
          />
        </label>
      )}

      {/* Honeypot field - hidden from users */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label>
        Project brief
        <textarea
          name="message"
          required
          maxLength={1800}
          placeholder="What do you want to build, improve, or launch?"
          rows={5}
        />
      </label>

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Submit Query"}
      </button>

      {status === "sent" ? (
        <p className="form-success">Vision received. I will review and reach out soon.</p>
      ) : null}
      {status === "error" ? <p className="form-error">{error}</p> : null}
    </form>
  );
}
