const koa = require('koa')
const path = require('path')
const fs = require('fs')



const app = new koa()

const mimes = {
    css: 'text/css',
    less: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    ico: 'image/x-icon',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'text/javascript',
    json: 'application/json',
    pdf: 'application/pdf',
    png: 'image/png',
    svg: 'image/svg+xml',
    swf: 'application/x-shockwave-flash',
    tiff: 'image/tiff',
    txt: 'text/plain',
    wav: 'audio/x-wav',
    wma: 'audio/x-ms-wma',
    wmv: 'video/x-ms-wmv',
    xml: 'text/xml',
}
//解析请求的资源类型
function parseMime(url) {
    // path.extname获取路径中文件的后缀名
    let extName = path.extname(url)
    extName = extName ? extName.slice(1) : 'unknown'
    return mimes[extName]
}
//  fs读取文件
const parseStatic = (dir) => {
    return new Promise((resolve) => {
        resolve(fs.readFileSync(dir), 'binary')
    })
}


app.use(async ctx => {
    // ctx.body='koa 1234'

    const url = ctx.request.url
    if (url === '/') {
        ctx.set('Content-Type', 'text/html')
        ctx.body = await parseStatic('./index.html')
    } else {
        const filePath=path.resolve(__dirname,`.${url}`)
        ctx.set('Content-Type', parseMime(url))
        ctx.set('Expires',(new Date(Date.now()+30000)).toUTCString())
        ctx.body=await parseStatic(filePath)
        ctx.set('Cache-Control', 'max-age=300')
        console.log('这是什么时间',(new Date(Date.now()+30000)),(new Date(Date.now()+30000)).toUTCString())
        
        // ctx.body = await parseStatic(path.relative('/', url))
    }



})
app.listen("1234", () => console.log('接口1234启动'))