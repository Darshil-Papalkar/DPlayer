module.exports = {
    pageExtensions: ["ts", "tsx"],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/dashboard',
                permanent: true,
            }
        ]
    },
    reactStrictMode: true,
    env: {
        BASE_URI: process.env.SERVER_URL,
    }
}