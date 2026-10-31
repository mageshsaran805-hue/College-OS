import Link from "next/link";
import { KPICard, PageHeader, StatusBadge, buttonStyles } from "@/components/ui";
import { announcements, studentKpis, timetableToday } from "@/data/demo";
import { demoUsers } from "@/config/site";

export const metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const firstName = demoUsers.student.name.split(" ")[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Student portal"
        title={`Welcome back, ${firstName}`}
        description="Your academic snapshot, today's schedule, and the latest institutional updates."
        actions={
          <Link href="/timetable" className={buttonStyles({ variant: "secondary", size: "sm" })}>
            <span className="material-symbols-outlined text-base" aria-hidden="true">calendar_month</span>
            View timetable
          </Link>
        }
      />

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {studentKpis.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-card xl:col-span-2">
          <div className="flex items-center justify-between border-b border-surface-container px-5 py-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Today&apos;s timetable</h2>
              <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                Monday, 4 November 2024 · Semester 5
              </p>
            </div>
            <StatusBadge label="4 sessions" variant="info" />
          </div>

          <div className="divide-y divide-surface-container">
            {timetableToday.map((session) => (
              <div
                key={`${session.code}-${session.time}`}
                className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 font-code-metric text-code-metric text-on-surface-variant">
                    {session.time}
                  </div>
                  <div className="min-w-0">
                    <p className="font-label-md text-label-md font-medium text-on-surface">{session.course}</p>
                    <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">
                      {session.code} · {session.faculty} · {session.room}
                    </p>
                  </div>
                </div>
                <StatusBadge
                  label={session.status === "live" ? "Live now" : "Scheduled"}
                  variant={session.status === "live" ? "live" : "neutral"}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-card">
          <div className="flex items-center justify-between border-b border-surface-container px-5 py-4">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Announcements</h2>
            <Link
              href="/notifications"
              className="font-label-md text-label-md text-secondary transition-colors hover:text-secondary-container"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-surface-container">
            {announcements.map((announcement) => (
              <article key={announcement.title} className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <StatusBadge label={announcement.tag} variant="neutral" />
                  <span className="font-body-sm text-body-sm text-outline">{announcement.date}</span>
                </div>
                <h3 className="mt-2 font-label-md text-label-md font-medium leading-snug text-on-surface">
                  {announcement.title}
                </h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
