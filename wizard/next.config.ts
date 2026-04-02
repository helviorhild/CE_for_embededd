import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   output: 'standalone', 
   images: {
    unoptimized: true,
  },
   /*basePath: '/wizard',
   assetPrefix:'/wizard',
   trailingSlash: true,*/
  /*config options here */
};

export default nextConfig;
