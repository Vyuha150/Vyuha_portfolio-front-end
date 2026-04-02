"use client";

import React, { useMemo, useState } from "react";

type Downloads = {
  yaml?: string;
  pdf?: string;
  typ?: string;
  md?: string;
  html?: string;
  png?: string[];
};

type ResumeResponse = {
  message?: string;
  name: string;
  storage?: {
    yaml_path: string;
    output_folder: string;
  };
  downloads?: Downloads;
};

type ExperienceEntry = {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string;
};

type EducationEntry = {
  institution: string;
  area: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string;
};

type ProjectEntry = {
  name: string;
  date: string;
  link: string;
  description: string;
  highlights: string;
};

type ResumeFormState = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  languages: string;
  frameworks: string;
  tools: string;
};

const createExperience = (): ExperienceEntry => ({
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
  highlights: "",
});

const createEducation = (): EducationEntry => ({
  institution: "",
  area: "",
  degree: "",
  location: "",
  startDate: "",
  endDate: "",
  summary: "",
  highlights: "",
});

const createProject = (): ProjectEntry => ({
  name: "",
  date: "",
  link: "",
  description: "",
  highlights: "",
});

const DEFAULT_FORM: ResumeFormState = {
  name: "",
  headline: "Software Engineer",
  email: "",
  phone: "",
  location: "",
  website: "",
  linkedin: "",
  github: "",
  summary: "",
  languages: "JavaScript, TypeScript, Python",
  frameworks: "React, Next.js, Node.js",
  tools: "Git, Docker, PostgreSQL",
};

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_RESUME_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
}

function normalizeDownloadUrl(baseUrl: string, value?: string) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${baseUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

function trimLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitList(value: string) {
  return value
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function yamlQuote(value: string) {
  return JSON.stringify(value);
}

function indent(level: number) {
  return "  ".repeat(level);
}

function pushKeyValue(lines: string[], level: number, key: string, value: string) {
  lines.push(`${indent(level)}${key}: ${yamlQuote(value)}`);
}

function pushOptionalKeyValue(lines: string[], level: number, key: string, value: string) {
  if (value.trim()) {
    pushKeyValue(lines, level, key, value.trim());
  }
}

function toHandle(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    const lastSegment = url.pathname.split("/").filter(Boolean).pop() ?? "";
    return lastSegment.replace(/^@/, "");
  } catch {
    return trimmed.replace(/^@/, "");
  }
}

function normalizeHttpUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function isValidUrl(value: string) {
  if (!value.trim()) return true;
  try {
    const normalized = normalizeHttpUrl(value);
    const url = new URL(normalized);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizePhone(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function isLikelyInternationalPhone(value: string) {
  if (!value.trim()) return true;
  const compact = value.replace(/[\s()-]/g, "");
  return /^\+[1-9]\d{6,14}$/.test(compact);
}

function isValidEmail(value: string) {
  if (!value.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function buildResumeYaml(
  form: ResumeFormState,
  experiences: ExperienceEntry[],
  educations: EducationEntry[],
  projects: ProjectEntry[]
) {
  const lines: string[] = [];

  lines.push("cv:");
  pushKeyValue(lines, 1, "name", form.name.trim());
  pushOptionalKeyValue(lines, 1, "headline", form.headline);
  pushOptionalKeyValue(lines, 1, "location", form.location);
  pushOptionalKeyValue(lines, 1, "email", form.email);
  pushOptionalKeyValue(lines, 1, "phone", normalizePhone(form.phone));
  pushOptionalKeyValue(lines, 1, "website", normalizeHttpUrl(form.website));

  const socialNetworks = [
    { network: "LinkedIn", username: toHandle(form.linkedin) },
    { network: "GitHub", username: toHandle(form.github) },
  ].filter((entry) => entry.username);

  if (socialNetworks.length > 0) {
    lines.push(`${indent(1)}social_networks:`);
    socialNetworks.forEach((network) => {
      lines.push(`${indent(2)}- network: ${yamlQuote(network.network)}`);
      lines.push(`${indent(3)}username: ${yamlQuote(network.username)}`);
    });
  }

  lines.push(`${indent(1)}sections:`);

  if (form.summary.trim()) {
    lines.push(`${indent(2)}summary:`);
    trimLines(form.summary).forEach((line) => {
      lines.push(`${indent(3)}- ${yamlQuote(line)}`);
    });
  }

  const skillLines = [
    form.languages.trim() ? `Languages: ${splitList(form.languages).join(", ")}` : "",
    form.frameworks.trim() ? `Frameworks: ${splitList(form.frameworks).join(", ")}` : "",
    form.tools.trim() ? `Tools: ${splitList(form.tools).join(", ")}` : "",
  ].filter(Boolean);

  if (skillLines.length > 0) {
    lines.push(`${indent(2)}skills:`);
    skillLines.forEach((line) => {
      lines.push(`${indent(3)}- ${yamlQuote(line)}`);
    });
  }

  if (experiences.length > 0) {
    lines.push(`${indent(2)}experience:`);
    experiences.forEach((experience) => {
      if (!experience.company.trim() && !experience.position.trim()) {
        return;
      }

      lines.push(`${indent(3)}- company: ${yamlQuote(experience.company.trim())}`);
      pushOptionalKeyValue(lines, 4, "position", experience.position);
      pushOptionalKeyValue(lines, 4, "location", experience.location);

      const dateRange = [experience.startDate.trim(), experience.endDate.trim()]
        .filter(Boolean)
        .join(" - ");
      pushOptionalKeyValue(lines, 4, "date", dateRange);
      pushOptionalKeyValue(lines, 4, "summary", experience.description);

      const highlights = trimLines(experience.highlights);
      if (highlights.length > 0) {
        lines.push(`${indent(4)}highlights:`);
        highlights.forEach((highlight) => {
          lines.push(`${indent(5)}- ${yamlQuote(highlight)}`);
        });
      }
    });
  }

  if (educations.length > 0) {
    lines.push(`${indent(2)}education:`);
    educations.forEach((education) => {
      if (!education.institution.trim() && !education.degree.trim()) {
        return;
      }

      lines.push(`${indent(3)}- institution: ${yamlQuote(education.institution.trim())}`);
      pushOptionalKeyValue(lines, 4, "area", education.area);
      pushOptionalKeyValue(lines, 4, "degree", education.degree);
      pushOptionalKeyValue(lines, 4, "location", education.location);

      const dateRange = [education.startDate.trim(), education.endDate.trim()]
        .filter(Boolean)
        .join(" - ");
      pushOptionalKeyValue(lines, 4, "date", dateRange);
      pushOptionalKeyValue(lines, 4, "summary", education.summary);

      const highlights = trimLines(education.highlights);
      if (highlights.length > 0) {
        lines.push(`${indent(4)}highlights:`);
        highlights.forEach((highlight) => {
          lines.push(`${indent(5)}- ${yamlQuote(highlight)}`);
        });
      }
    });
  }

  if (projects.length > 0) {
    lines.push(`${indent(2)}projects:`);
    projects.forEach((project) => {
      if (!project.name.trim()) {
        return;
      }

      lines.push(`${indent(3)}- name: ${yamlQuote(project.name.trim())}`);
      pushOptionalKeyValue(lines, 4, "date", project.date);
      pushOptionalKeyValue(lines, 4, "link", normalizeHttpUrl(project.link));
      pushOptionalKeyValue(lines, 4, "summary", project.description);

      const highlights = trimLines(project.highlights);
      if (highlights.length > 0) {
        lines.push(`${indent(4)}highlights:`);
        highlights.forEach((highlight) => {
          lines.push(`${indent(5)}- ${yamlQuote(highlight)}`);
        });
      }
    });
  }

  return lines.join("\n");
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-3">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {subtitle ? <p className="text-sm text-gray-400">{subtitle}</p> : null}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-orange-500"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-white">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none transition focus:border-orange-500"
      />
    </label>
  );
}

export default function ResumeBuilder() {
  const apiBase = useMemo(getApiBase, []);
  const [form, setForm] = useState<ResumeFormState>(DEFAULT_FORM);
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([createExperience()]);
  const [educations, setEducations] = useState<EducationEntry[]>([createEducation()]);
  const [projects, setProjects] = useState<ProjectEntry[]>([createProject()]);
  const [overwrite, setOverwrite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [storage, setStorage] = useState<ResumeResponse["storage"] | null>(null);
  const [downloads, setDownloads] = useState<Downloads | null>(null);

  const buildUrl = (path: string) => {
    if (!apiBase) return path;
    return `${apiBase}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const fetchJson = async (path: string, init?: RequestInit) => {
    const response = await fetch(buildUrl(path), init);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data?.detail || data?.message || "Request failed.");
    }

    return data as ResumeResponse;
  };

  const updateExperience = (index: number, key: keyof ExperienceEntry, value: string) => {
    setExperiences((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index ? { ...entry, [key]: value } : entry
      )
    );
  };

  const updateEducation = (index: number, key: keyof EducationEntry, value: string) => {
    setEducations((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index ? { ...entry, [key]: value } : entry
      )
    );
  };

  const updateProject = (index: number, key: keyof ProjectEntry, value: string) => {
    setProjects((current) =>
      current.map((entry, currentIndex) =>
        currentIndex === index ? { ...entry, [key]: value } : entry
      )
    );
  };

  const handleGenerate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!apiBase) {
      setError("Resume service is not configured. Please try again later.");
      return;
    }

    if (!form.name.trim()) {
      setError("Resume name is required.");
      return;
    }

    if (!form.headline.trim()) {
      setError("Please enter a professional headline.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!isLikelyInternationalPhone(form.phone)) {
      setError("Phone must include country code, e.g. +91XXXXXXXXXX.");
      return;
    }

    if (!isValidUrl(form.website)) {
      setError("Please enter a valid website URL.");
      return;
    }

    const hasInvalidProjectLink = projects.some(
      (project) => project.link.trim() && !isValidUrl(project.link)
    );
    if (hasInvalidProjectLink) {
      setError("One or more project links are invalid URLs.");
      return;
    }

    const yamlContent = buildResumeYaml(form, experiences, educations, projects);

    if (!yamlContent.trim()) {
      setError("Please fill in at least one resume section.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchJson("/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          yaml_content: yamlContent,
          overwrite,
        }),
      });

      setStorage(data.storage ?? null);
      setDownloads(data.downloads ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadExisting = async () => {
    if (!apiBase) {
      setError("Resume service is not configured. Please try again later.");
      return;
    }

    if (!form.name.trim()) {
      setError("Resume name is required to load an existing resume.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchJson(`/resumes/${encodeURIComponent(form.name.trim())}`);
      setStorage(data.storage ?? null);
      setDownloads(data.downloads ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load resume.");
    } finally {
      setLoading(false);
    }
  };

  const downloadItems = ["yaml", "pdf", "typ", "md", "html"] as const;

  return (
    <div className="w-full max-w-6xl rounded-2xl border border-orange-500/40 bg-black/20 p-6 shadow-2xl shadow-orange-500/10 md:p-8">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-orange-500 md:text-3xl">
          Resume Builder
        </h2>
        <p className="text-sm text-gray-300">
          Fill in your details and generate a professional resume.
        </p>
      </div>

      <form onSubmit={handleGenerate} className="space-y-8">
        <section className="rounded-xl border border-gray-800 bg-black/30 p-5">
          <SectionTitle title="Personal details" subtitle="These fields become the top of the resume." />
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput
              label="Full name"
              value={form.name}
              onChange={(value) => setForm((current) => ({ ...current, name: value }))}
              placeholder="John Doe"
            />
            <TextInput
              label="Professional headline"
              value={form.headline}
              onChange={(value) => setForm((current) => ({ ...current, headline: value }))}
              placeholder="Frontend Engineer"
            />
            <TextInput
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => setForm((current) => ({ ...current, email: value }))}
              placeholder="john@example.com"
            />
            <TextInput
              label="Phone"
              value={form.phone}
              onChange={(value) => setForm((current) => ({ ...current, phone: value }))}
              placeholder="+1 555 123 4567"
            />
            <TextInput
              label="Location"
              value={form.location}
              onChange={(value) => setForm((current) => ({ ...current, location: value }))}
              placeholder="San Francisco, CA"
            />
            <TextInput
              label="Website"
              value={form.website}
              onChange={(value) => setForm((current) => ({ ...current, website: value }))}
              placeholder="https://your-website.com"
            />
            <TextInput
              label="LinkedIn profile or handle"
              value={form.linkedin}
              onChange={(value) => setForm((current) => ({ ...current, linkedin: value }))}
              placeholder="linkedin.com/in/johndoe"
            />
            <TextInput
              label="GitHub profile or handle"
              value={form.github}
              onChange={(value) => setForm((current) => ({ ...current, github: value }))}
              placeholder="github.com/johndoe"
            />
          </div>
          <div className="mt-4">
            <TextArea
              label="Professional summary"
              value={form.summary}
              onChange={(value) => setForm((current) => ({ ...current, summary: value }))}
              placeholder="Write 2-4 sentences about your background and strengths."
              rows={4}
            />
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-black/30 p-5">
          <SectionTitle title="Skills" subtitle="Use commas to separate skills in each category." />
          <div className="grid gap-4 md:grid-cols-3">
            <TextArea
              label="Languages"
              value={form.languages}
              onChange={(value) => setForm((current) => ({ ...current, languages: value }))}
              placeholder="JavaScript, TypeScript, Python"
              rows={5}
            />
            <TextArea
              label="Frameworks"
              value={form.frameworks}
              onChange={(value) => setForm((current) => ({ ...current, frameworks: value }))}
              placeholder="React, Next.js, Node.js"
              rows={5}
            />
            <TextArea
              label="Tools"
              value={form.tools}
              onChange={(value) => setForm((current) => ({ ...current, tools: value }))}
              placeholder="Git, Docker, PostgreSQL"
              rows={5}
            />
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-black/30 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <SectionTitle title="Experience" subtitle="Add one or more jobs or internships." />
            <button
              type="button"
              onClick={() => setExperiences((current) => [...current, createExperience()])}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-white transition hover:border-orange-500"
            >
              Add experience
            </button>
          </div>
          <div className="space-y-5">
            {experiences.map((experience, index) => (
              <div key={`experience-${index}`} className="rounded-lg border border-gray-800 p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold text-white">Experience {index + 1}</h4>
                  {experiences.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setExperiences((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                      className="text-sm text-red-300 transition hover:text-red-200"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput
                    label="Company"
                    value={experience.company}
                    onChange={(value) => updateExperience(index, "company", value)}
                    placeholder="Company name"
                  />
                  <TextInput
                    label="Role"
                    value={experience.position}
                    onChange={(value) => updateExperience(index, "position", value)}
                    placeholder="Software Engineer"
                  />
                  <TextInput
                    label="Location"
                    value={experience.location}
                    onChange={(value) => updateExperience(index, "location", value)}
                    placeholder="Remote"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Start date"
                      value={experience.startDate}
                      onChange={(value) => updateExperience(index, "startDate", value)}
                      placeholder="2023-01"
                    />
                    <TextInput
                      label="End date"
                      value={experience.endDate}
                      onChange={(value) => updateExperience(index, "endDate", value)}
                      placeholder="Present"
                    />
                  </div>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <TextArea
                    label="Short summary"
                    value={experience.description}
                    onChange={(value) => updateExperience(index, "description", value)}
                    placeholder="Describe the role in one short paragraph."
                  />
                  <TextArea
                    label="Highlights"
                    value={experience.highlights}
                    onChange={(value) => updateExperience(index, "highlights", value)}
                    placeholder="One bullet per line"
                    rows={5}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-black/30 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <SectionTitle title="Education" subtitle="Add school, degree, and dates." />
            <button
              type="button"
              onClick={() => setEducations((current) => [...current, createEducation()])}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-white transition hover:border-orange-500"
            >
              Add education
            </button>
          </div>
          <div className="space-y-5">
            {educations.map((education, index) => (
              <div key={`education-${index}`} className="rounded-lg border border-gray-800 p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold text-white">Education {index + 1}</h4>
                  {educations.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setEducations((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                      className="text-sm text-red-300 transition hover:text-red-200"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput
                    label="Institution"
                    value={education.institution}
                    onChange={(value) => updateEducation(index, "institution", value)}
                    placeholder="University name"
                  />
                  <TextInput
                    label="Degree"
                    value={education.degree}
                    onChange={(value) => updateEducation(index, "degree", value)}
                    placeholder="Bachelor of Technology"
                  />
                  <TextInput
                    label="Area of study"
                    value={education.area}
                    onChange={(value) => updateEducation(index, "area", value)}
                    placeholder="Computer Science"
                  />
                  <TextInput
                    label="Location"
                    value={education.location}
                    onChange={(value) => updateEducation(index, "location", value)}
                    placeholder="Bengaluru, India"
                  />
                  <TextInput
                    label="Start date"
                    value={education.startDate}
                    onChange={(value) => updateEducation(index, "startDate", value)}
                    placeholder="2019-08"
                  />
                  <TextInput
                    label="End date"
                    value={education.endDate}
                    onChange={(value) => updateEducation(index, "endDate", value)}
                    placeholder="2023-05"
                  />
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <TextArea
                    label="Summary"
                    value={education.summary}
                    onChange={(value) => updateEducation(index, "summary", value)}
                    placeholder="Optional short note about the degree or result."
                  />
                  <TextArea
                    label="Highlights"
                    value={education.highlights}
                    onChange={(value) => updateEducation(index, "highlights", value)}
                    placeholder="Awards, CGPA, thesis, or achievements"
                    rows={5}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-black/30 p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <SectionTitle title="Projects" subtitle="Add projects that show impact." />
            <button
              type="button"
              onClick={() => setProjects((current) => [...current, createProject()])}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-white transition hover:border-orange-500"
            >
              Add project
            </button>
          </div>
          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={`project-${index}`} className="rounded-lg border border-gray-800 p-4">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h4 className="text-sm font-semibold text-white">Project {index + 1}</h4>
                  {projects.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => setProjects((current) => current.filter((_, currentIndex) => currentIndex !== index))}
                      className="text-sm text-red-300 transition hover:text-red-200"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <TextInput
                    label="Project name"
                    value={project.name}
                    onChange={(value) => updateProject(index, "name", value)}
                    placeholder="Portfolio website"
                  />
                  <TextInput
                    label="Date"
                    value={project.date}
                    onChange={(value) => updateProject(index, "date", value)}
                    placeholder="2024"
                  />
                  <TextInput
                    label="Link"
                    value={project.link}
                    onChange={(value) => updateProject(index, "link", value)}
                    placeholder="https://project-link.com"
                  />
                  <TextArea
                    label="Short summary"
                    value={project.description}
                    onChange={(value) => updateProject(index, "description", value)}
                    placeholder="Describe the project, purpose, or result."
                  />
                </div>
                <div className="mt-4">
                  <TextArea
                    label="Highlights"
                    value={project.highlights}
                    onChange={(value) => updateProject(index, "highlights", value)}
                    placeholder="One bullet per line"
                    rows={5}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-black/30 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <label className="flex items-center gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={overwrite}
                onChange={(event) => setOverwrite(event.target.checked)}
                className="h-4 w-4 rounded border-gray-600 bg-black text-orange-500"
              />
              Overwrite existing resume if it already exists
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleLoadExisting}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-4 py-3 text-sm font-medium text-white transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Load existing resume
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Processing..." : "Generate resume"}
              </button>
            </div>
          </div>
        </section>

        {error ? (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}
      </form>

      {storage ? (
        <div className="mt-6 rounded-xl border border-gray-800 bg-black/30 p-4 text-sm text-gray-300">
          <div className="mb-2 text-white">Saved files</div>
          <div className="break-all">
            <span className="text-gray-400">YAML:</span> {storage.yaml_path}
          </div>
          <div className="break-all">
            <span className="text-gray-400">Output:</span> {storage.output_folder}
          </div>
        </div>
      ) : null}

      {downloads ? (
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Downloads</h3>

          <div className="flex flex-wrap gap-3">
            {downloadItems.map((item) => {
              const rawUrl = downloads[item];
              if (!rawUrl || Array.isArray(rawUrl)) return null;

              return (
                <a
                  key={item}
                  href={normalizeDownloadUrl(apiBase, rawUrl)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-orange-500/70 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-500/10"
                >
                  {item.toUpperCase()}
                </a>
              );
            })}
          </div>

          {Array.isArray(downloads.png) && downloads.png.length > 0 ? (
            <div>
              <div className="mb-2 text-sm font-semibold text-white">PNG pages</div>
              <div className="flex flex-wrap gap-3">
                {downloads.png.map((rawUrl, index) => (
                  <a
                    key={`${rawUrl}-${index}`}
                    href={normalizeDownloadUrl(apiBase, rawUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-600 px-4 py-2 text-sm text-white transition hover:border-orange-500"
                  >
                    Page {index + 1}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
