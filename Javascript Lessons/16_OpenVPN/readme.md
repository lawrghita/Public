Install https://swupdate.openvpn.org/community/releases/openvpn-install-2.4.7-I607-Win10.exe

Launch cmd as Administrator
put in PATH variable "c:\Program Files\OpenVPN\bin"
```
cd C:\"Program Files"\OpenVPN\easy-rsa
```
edit vars accordingly: best to use ServerVPN as you rename the TAP-Windows Adapter V9 from Network Connections to ServerVPN
```
vars.bat
clean-all
build-dh
build-ca
```
It will result an keys subdirectory with ca.crt ca.key dh4096.pem index.txt serial

```
build-key-server ServerVPN
```
result certificates for the server: ServerVPN crt csr key 
```

build-key ClientVPN  //att Common name must put ClientVPN
```
you can build multiple clients ClientVPN2 3 etc
result certificates for the client: ClientVPN crt csr key 

Generate the key for packet authentication:
```
openvpn --genkey --secret keys/ta.key 
```
Create Config files
https://www.youtube.com/watch?v=hKfHwQgAsUo
https://www.u4up.com/q/377953/
If OpenVpn service is automatic it is necessary to turn off the adapter, then turn on again and IMMEDIATELY start the openvpn server! 
If is set as manual it works as intendend

Create Config files server.ovpn
```
dev-node "ServerVPN"
mode server

port 12345

proto tcp4-server

dev tun

tls-server
tls-auth "c:\\Program Files\\OpenVPN\\easy-rsa\\keys\\ta.key" 0   # 0 for the server / 1 for the client

tun-mtu 1500
tun-mtu-extra 32
mssfix 1450

ca "c:\\Program Files\\OpenVPN\\easy-rsa\\keys\\ca.crt"
cert "c:\\Program Files\\OpenVPN\\easy-rsa\\keys\\ServerVPN.crt"
key "c:\\Program Files\\OpenVPN\\easy-rsa\\keys\\ServerVPN.key"  # This file should be kept secret

dh "c:\\Program Files\\OpenVPN\\easy-rsa\\keys\\dh2048.pem"

server 10.10.10.0 255.255.255.0

client-to-client

keepalive 10 120

cipher AES-256-CBC

comp-lzo

persist-key
persist-tun

client-config-dir "c:\\Program Files\\OpenVPN\\config"

verb 5

route-delay 5
route-method exe

push "route 192.168.0.0 255.255.255.0"   # client know the server subnet

route 192.168.182.0 255.255.255.0     #client subnet