import withPWA from "next-pwa";

const nextConfig = {
  images: {
    unoptimized: true,
  },
};

const config = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

export default config;
