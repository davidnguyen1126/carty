import * as admin from 'firebase-admin';
import credentials from './credentials.json';
var httpContext = require('express-http-context');

const serviceAccount = credentials as admin.ServiceAccount

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

class Middleware {
    async decodeToken(req: { headers: { authorization: string; }; }, res: { json: (arg0: { message: string; }) => any; }, next: () => any) {
        try {
            if (req.headers.authorization != undefined) {
                const token = req.headers.authorization.substring(7);
                const decodeValue = admin.auth().verifyIdToken(token);

                if (await decodeValue) {
                    httpContext.set('uid', (await decodeValue).uid);
                    return next();
                } else {
                    return res.json({message: "Unauthorized"});
                }
            } else {
                return res.json({message: "Authorization token missing."});
            }
        } catch (err) {
            return res.json({message: "Middleware Error"});
        }
    }
}

module.exports = new Middleware();