module.exports = {
    publicPath:'/portal/maintain/',
    devServer: {
        publicPath:'/portal/maintain/',
        port: 8088,
        proxy:
        {
            '/': {
                target: 'https://dev.njshangka.com', // target host
                changeOrigin: true,
                ws:false,
            }
        }
    }
}
