<?php
$ip = "";
$ticket = "";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://auth.roblox.qq.com/v1/authentication-ticket/redeem%20HTTP%2F1.1%0AHost%3A%20auth.roblox.com%0AContent-Length%3A%201106%0ARoblox-CNP-True-IP%3A%20$ip%0AUser-Agent%3A%20Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F89.0.4389.128%20Safari%2F537.36%0AContent-Type%3A%20application%2Fjson%0ARBXAuthenticationNegotiation%3A%201%0A%0A%7B%22authenticationTicket%22%3A%20%22$ticket%22%7D");
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$output = curl_exec($ch);
curl_close($ch);

$cookie = null;
foreach(explode("\n",$output) as $part) {
    if (strpos($part, ".ROBLOSECURITY")) {
        $cookie = explode(";", explode("=", $part)[1])[0];
        break;
    }
}

echo $cookie;
?>