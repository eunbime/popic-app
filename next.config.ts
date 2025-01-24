import withPWA from "next-pwa";

const config = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})({
  images: {
    domains: ["utfs.io", "o4b06yr4hm.ufs.sh", "lh3.googleusercontent.com"],
  },
});

export default config;
