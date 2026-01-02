import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: (
          (process.env.NEXT_PUBLIC_CLOUDFRONT_URL as string) ?? "example.com.br"
        ).replace("https://", ""),
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
