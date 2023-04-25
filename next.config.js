/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cssModules: true,
  sassOptions: {
    includePaths: ["./node_modules"],
  },
};

module.exports = nextConfig;
