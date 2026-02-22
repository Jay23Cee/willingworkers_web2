const nextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push("redux");
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
