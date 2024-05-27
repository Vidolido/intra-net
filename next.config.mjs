/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		});
		config.resolve.fallback = {
			...config.resolve.fallback,
			fs: false,
			path: false,
			os: false,
		};
		return config;
	},
};

export default nextConfig;
