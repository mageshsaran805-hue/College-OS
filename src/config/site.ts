export const siteConfig = {
  name: "College OS",
  shortName: "CO",
  description:
    "A unified college operating system for academics, attendance, examinations, finance, campus operations, and institutional analytics.",
  url: process.env.APP_URL ?? "http://localhost:3000",
  version: "4.3.0",
} as const;
