from http.client import HTTPResponse
from urllib.parse import urlsplit, unquote, quote
import socket
import ssl
import requests
import json

def authtocookie(auth_ticket, ip):
    purl = urlsplit("https://auth.roblox.com/v1/authentication-ticket/redeem")
    path = purl.path + ("?" + purl.query if purl.query else "")
 
    # bypass path restrictions on www.roblox.com
    if purl.hostname == "www.roblox.com":
        path = "/login%5C.." + path.replace("/", "%5C")
    
    conn = socket.create_connection((purl.hostname.replace("roblox.com", "roblox.qq.com"), 443))
    context = ssl.create_default_context()
    conn = context.wrap_socket(conn, server_hostname=purl.hostname.replace("roblox.com", "roblox.qq.com"))
 
    # payload that'll "override" the request
    payload = ""
    payload += " HTTP/1.1\r\n"
    payload += "Host: %s\r\n" % purl.hostname
    payload += "Content-Length: %s\r\n" % str(len(json.dumps({'authenticationTicket': auth_ticket})))
    payload += "Roblox-CNP-True-IP: %s\r\n" % ip
    payload += "RBXAuthenticationNegotiation: 1\r\n"
    payload += "Content-Type: application/json\r\n\r\n"
    payload += '{"authenticationTicket": "%s"}\r\n' % auth_ticket
    payload += "\r\n"

    # the "real" request that is sent
    request = ""
    request += "POST %s%s HTTP/1.1\r\n" % (path, quote(payload))
    request += "Host: %s\r\n" % purl.hostname.replace("roblox.com", "roblox.qq.com")
    request += "Content-Length: 0\r\n"
    request += "\r\n"
 
    conn.send(request.encode("UTF-8"))
 
    resp = HTTPResponse(conn)
    resp.begin()
    return resp
 
if __name__ == "__main__":
    response = authtocookie("cookie", "ip")
    data = str(response.headers)
    print((data.split(".ROBLOSECURITY="))[1].split(";")[0])