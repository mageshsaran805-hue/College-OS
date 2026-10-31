import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  serverExternalPackages: ["@prisma/client", "bcryptjs", "nodemailer"],
};

export default nextConfig;
