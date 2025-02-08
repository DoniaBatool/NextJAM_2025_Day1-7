/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"standalone",
  reactStrictMode: true,
    images: {
      remotePatterns: [
        { 
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com",
        },
      ],
    },
    experimental:{
    
      forceSwcTransforms:true
    },
  };
  
  export default nextConfig;
  