/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Solución simple para ChunkLoadError
  assetPrefix: '',
  trailingSlash: false,
  
  // Configuración de webpack para estabilidad
  webpack: (config) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      maxSize: 250000,
    }
    return config
  },
}

export default nextConfig
