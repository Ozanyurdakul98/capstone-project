/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'unsplash.com',
      'images.unsplash.com',
      'wallpaperaccess.com',
      'source.unsplash.com',
      'res.cloudinary.com',
    ],
  },
  env: { mapbox_key: 'pk.eyJ1IjoiaGF5dmFuYWRpOTgiLCJhIjoiY2xidmQ5emN3MWpncjNwcWRwZnhxd2RrcyJ9.6TDZMEs0UDWmbVdmu643TQ' },
};

module.exports = nextConfig;
