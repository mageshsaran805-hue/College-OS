import {
  CollegeStatus,
  MembershipRole,
  MembershipStatus,
  PrismaClient,
  TermStatus,
} from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

const password = process.env.SEED_DEMO_PASSWORD?.trim() || "CollegeOS!2026";

if (process.env.NODE_ENV === "production" && !process.env.SEED_DEMO_PASSWORD) {
  throw new Error("SEED_DEMO_PASSWORD must be set before seeding in production.");
}

const colleges = [
  {
    slug: "apex-institute",
    name: "Apex Institute of Technology",
    code: "APEX-US",
    region: "US-EAST",
    term: {
      name: "AY 2026–27 · Semester 1",
      code: "2026-27-S1",
      startDate: new Date("2026-08-01T00:00:00.000Z"),
      endDate: new Date("2026-12-20T00:00:00.000Z"),
    },
    users: [
      {
        name: "Elena Rostova",
        email: "student@apex.edu",
        role: MembershipRole.STUDENT,
        department: "Computer Science",
        designation: "B.Tech · Semester 5",
      },
      {
        name: "Dr. Marcus Vance",
        email: "faculty@apex.edu",
        role: MembershipRole.FACULTY,
        department: "Computer Science",
        designation: "Associate Professor",
      },
      {
        name: "Dr. Elena Finch",
        email: "admin@apex.edu",
        role: MembershipRole.ADMIN,
        department: "Administration",
        designation: "Registrar",
      },
      {
        name: "Sam Okafor",
        email: "auditor@apex.edu",
        role: MembershipRole.AUDITOR,
        department: "Governance",
        designation: "Internal Auditor",
      },
    ],
  },
  {
    slug: "horizon-business",
    name: "Horizon Business School",
    code: "HORIZON-UK",
    region: "UK-LONDON",
    term: {
      name: "AY 2026–27 · Semester 1",
      code: "2026-27-S1",
      startDate: new Date("2026-09-01T00:00:00.000Z"),
      endDate: new Date("2027-01-15T00:00:00.000Z"),
    },
    users: [
      {
        name: "Owen Hart",
        email: "student@horizon.edu",
        role: MembershipRole.STUDENT,
        department: "Business Analytics",
        designation: "BBA · Semester 3",
      },
      {
        name: "Dr. Priya Nair",
        email: "faculty@horizon.edu",
        role: MembershipRole.FACULTY,
        department: "Business Analytics",
        designation: "Senior Lecturer",
      },
      {
        name: "Amara Cole",
        email: "admin@horizon.edu",
        role: MembershipRole.ADMIN,
        department: "Administration",
        designation: "Dean of Operations",
      },
    ],
  },
] as const;

async function main() {
  const passwordHash = await hash(password, 12);

  for (const fixture of colleges) {
    const college = await prisma.college.upsert({
      where: { slug: fixture.slug },
      update: {
        name: fixture.name,
        code: fixture.code,
        region: fixture.region,
        status: CollegeStatus.ACTIVE,
      },
      create: {
        name: fixture.name,
        slug: fixture.slug,
        code: fixture.code,
        region: fixture.region,
        status: CollegeStatus.ACTIVE,
      },
    });

    await prisma.academicTerm.updateMany({
      where: { collegeId: college.id, isCurrent: true },
      data: { isCurrent: false },
    });

    await prisma.academicTerm.upsert({
      where: {
        collegeId_code: {
          collegeId: college.id,
          code: fixture.term.code,
        },
      },
      update: {
        name: fixture.term.name,
        startDate: fixture.term.startDate,
        endDate: fixture.term.endDate,
        status: TermStatus.ACTIVE,
        isCurrent: true,
      },
      create: {
        collegeId: college.id,
        name: fixture.term.name,
        code: fixture.term.code,
        startDate: fixture.term.startDate,
        endDate: fixture.term.endDate,
        status: TermStatus.ACTIVE,
        isCurrent: true,
      },
    });

    for (const member of fixture.users) {
      const user = await prisma.user.upsert({
        where: { email: member.email },
        update: {
          name: member.name,
          passwordHash,
          emailVerified: new Date(),
        },
        create: {
          name: member.name,
          email: member.email,
          passwordHash,
          emailVerified: new Date(),
        },
      });

      await prisma.membership.upsert({
        where: {
          userId_collegeId: {
            userId: user.id,
            collegeId: college.id,
          },
        },
        update: {
          role: member.role,
          status: MembershipStatus.ACTIVE,
          department: member.department,
          designation: member.designation,
        },
        create: {
          userId: user.id,
          collegeId: college.id,
          role: member.role,
          status: MembershipStatus.ACTIVE,
          department: member.department,
          designation: member.designation,
        },
      });
    }

    console.log(`Seeded ${college.name} (${fixture.users.length} users)`);
  }

  console.log(
    `Seed complete. Demo password: ${process.env.SEED_DEMO_PASSWORD ? "from SEED_DEMO_PASSWORD" : "default development password"}.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
