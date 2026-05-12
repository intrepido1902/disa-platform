// Quitamos el ": NextConfig" estricto para que no marque error con propiedades nuevas
const nextConfig = {
  // Permitimos los orígenes locales que pide tu consola
  allowedDevOrigins: ['192.168.56.1', 'localhost', 'localhost:3000'],
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;