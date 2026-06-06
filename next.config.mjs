// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['localhost'],
//   },



// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL
const remotePatterns = [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/uploads/**',
  },
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '3000',
    pathname: '/api/uploads/file/**',
  },
]
if (appUrl) {
  try {
    const u = new URL(appUrl)
    const base = {
      protocol: u.protocol.replace(':', '') === 'http' ? 'http' : 'https',
      hostname: u.hostname,
      ...(u.port ? { port: u.port } : {}),
    }
    remotePatterns.push(
      { ...base, pathname: '/uploads/**' },
      { ...base, pathname: '/api/uploads/file/**' },
    )
  } catch {
    // ignore invalid NEXT_PUBLIC_APP_URL at build time
  }
}

const nextConfig = {
  serverExternalPackages: ['mongoose'],
  images: {
    unoptimized: true,
    remotePatterns,
  },
}

export default nextConfig
