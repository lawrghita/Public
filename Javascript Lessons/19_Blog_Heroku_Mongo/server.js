'use strict';
require('dotenv').config();
const utilizator = process.env['UTILIZATOR'];
const parola = process.env['PAROLA'];
console.log(process.env, "utilizator", utilizator, parola);
const mongodb = require('mongodb');
const http = require('http');
const nconf = require('nconf');

const mydatabase = "blogherokumongo"; //my database name
let uri = `mongodb+srv://${utilizator}:${parola}@cluster0-8s7vx.gcp.mongodb.net/${mydatabase}?retryWrites=true&w=majority`;
if (nconf.get('mongoDatabase')) {
    uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

mongodb.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        throw err;
    }

    // Create a simple test little server.
    http.createServer((req, res) => {
        if (req.url === '/_ah/health') {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.write('OK');
            res.end();
            return;
        }
        let db = client.db(mydatabase); // chose the database f
        const collection = db.collection('Messages');
        var datetime = new Date();
        const msg = {
            msgDescription: '\nHello World received on ' + datetime
        };

        collection.insertOne(msg, (err) => {
            if (err) {
                throw err;
            }

            // push out a range
            let msglist = '';
            collection.find().toArray((err, data) => {
                if (err) {
                    throw err;
                }
                data.forEach((msg) => {
                    msglist += `${msg.msgDescription}; `;
                });

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write('Messages received so far:\n');
                res.end(msglist);
            });
        });
    }).listen(process.env.PORT || 8080, () => {
        console.log('started web process at http://127.0.0.1:8080/');
    });
});