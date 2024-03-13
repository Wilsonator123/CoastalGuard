import svgr from '@svgr/webpack';

export default {
    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // This prevents SVGs from being imported on the server side
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false, // Prevent importing fs module, which causes errors in the browser
            };
        }

        return config;
    },
};


