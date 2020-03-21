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
```

Create on the config directory a file ClientVPN with:

```
ifconfig-push 10.10.10.5 10.10.10.6
iroute 192.168.182.0 255.255.255.0
# disable     //when you need this client disabled uncomment
```

#now client side
copy from the server ca.crt ClientVPN.\* ta.key on the config folder from the client
Here also create client.ovpn
But IP dynamic and connection from the same network as at home its very hard to setup

```
remote 172.29.227.1    //ip extern of the server, first showing on ipconfig.exe
;remote 192.168.1.106   #IP local for checking if the keys public/private are working


client

port 12345

proto tcp4-client

dev tun

tls-client

tls-auth "c:\\Program Files\\OpenVPN\\config\\ta.key" 1

remote-cert-tls server

tun-mtu 1500
tun-mtu-extra 32
mssfix 1450

ca "c:\\Program Files\\OpenVPN\\config\\ca.crt"
cert "c:\\Program Files\\OpenVPN\\config\\client.crt"
key "c:\\Program Files\\OpenVPN\\config\\client.key"

cipher AES-256-CBC

comp-lzo

persist-key
persist-tun

verb 5
mute 20

```

To enable ping testing enable routing and remote access on both server and client
regedit to IPEnableRouter from 0 to 1

To Remote connect from inside network... found on connections the IPv4 Address
example my desktop is 192.168.1.106, So remote connect from laptop to this address

If google my ip show a IPv6 address set the router to just use IPv4
now we have an external address

on Router LAN interface static/reserve a DHCP address ..106 and MAC memorized as MyDesktop
then forward the ports on ...106:12345 to external 12345
also Windows Firewalls must open those on both computers
