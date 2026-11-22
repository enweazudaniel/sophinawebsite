/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 
  eslint: {
    ignoreDuringBuilds: true,
  },

  // The old Student Life page was removed; anyone with the old link lands on Our School
  async redirects() {
    return [{ source: "/student-life", destination: "/our-school", permanent: true }]
  },
}

export default nextConfig