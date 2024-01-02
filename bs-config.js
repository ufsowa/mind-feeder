module.exports = {
    "proxy": {
        "target": "localhost:3131",
        "proxyReq": [
            function(proxyReq) {
                proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
            }
        ]
    },
};