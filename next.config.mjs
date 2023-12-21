/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/vercel/next.js/discussions/55393
  // https://github.com/vercel/next.js/issues/54393
  // output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist' // Changes the build output directory to `./dist/`.
}

export default nextConfig
