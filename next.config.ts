import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ Esto hace que los errores de ESLint no detengan el build en producción
    ignoreDuringBuilds: true,
  },
  // (Opcional) Si tu proyecto usa imágenes externas
  images: {
    domains: ["localhost", "tuservidor.com"], // agregá tus dominios si los usás
  },
};

export default nextConfig;

