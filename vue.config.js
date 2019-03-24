module.exports = {
    publicPath:'/zhongan/maintain/',
    devServer: {
        publicPath:'/zhongan/maintain/',
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