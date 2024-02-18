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
    }
}