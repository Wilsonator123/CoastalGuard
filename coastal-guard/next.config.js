const svgr = require('@svgr/webpack');

module.exports = {
    webpack: (config, { isServer }) => {
        // Add SVGR rule for SVG files
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // This prevents SVGs from being imported on the server side
        if (!isServer) {
            if (!config.resolve.fallback) {
                config.resolve.fallback = {};
            }
            config.resolve.fallback.fs = false; // Prevent importing fs module, which causes errors in the browser
        }


        return config;
    },
    compiler: {
        styledComponents: true,
    },
};
