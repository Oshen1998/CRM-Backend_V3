'use strict';

const accessRequestModel = require('../../../models/accessRequest.model');
const userModel = require('../../../models/user.model');
const sendMail = require('../../../utils/sendEmails.utils');
const { env } = require('process');


const activateAccessRequest = async (req, res, next) => {
	try {
        const { token } = req.params;

        let accessRequest = await accessRequestModel.findOne({ token });

        if (!accessRequest){
            return res.status(404).set('Content-Type', 'text/html').send(`
            <html>
            <head>
                <title>Access Request Accepted</title>
                <meta http-equiv="refresh" content="5;url=/">
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                    }
                    h1 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>Access request not found</h1>
                    <p>You will be redirected to the home page in 5 seconds...</p>
                </div>
                <script>
                    setTimeout(() => {
                        window.location.href = '${env.CLIENT_URL}';
                    }, 5000);
                </script>
            </body>
            </html>
        `);
        
        }

        if(accessRequest.status === 'accepted'){
            return res.status(202).set('Content-Type', 'text/html').send(`
            <html>
            <head>
                <title>Access Request Accepted</title>
                <meta http-equiv="refresh" content="5;url=/">
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                    }
                    h1 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>Access request already accepted</h1>
                    <p>You will be redirected to the home page in 5 seconds...</p>
                </div>
                <script>
                    setTimeout(() => {
                        window.location.href = '${env.CLIENT_URL}';
                    }, 5000);
                </script>
            </body>
            </html>
        `);
        
        }

        if(accessRequest.status === 'declined'){
            return res.status(201).set('Content-Type', 'text/html').send(`
            <html>
            <head>
                <title>Access Request Accepted</title>
                <meta http-equiv="refresh" content="5;url=/">
                <style>
                    body {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                    }
                    h1 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div>
                    <h1>Access request already declined</h1>
                    <p>You will be redirected to the home page in 5 seconds...</p>
                </div>
                <script>
                    setTimeout(() => {
                        window.location.href = '${env.CLIENT_URL}';
                    }, 5000);
                </script>
            </body>
            </html>
        `);
        
        }

        //update the access request status to accepted
        accessRequest.status = 'accepted';
        await accessRequest.save();

        return res.status(201).set('Content-Type', 'text/html').send(`
        <html>
        <head>
            <title>Access Request Accepted</title>
            <meta http-equiv="refresh" content="5;url=/">
            <style>
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    padding: 0;
                }
                h1 {
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div>
                <h1>Access request accepted successfully</h1>
                <p>You will be redirected to the home page in 5 seconds...</p>
            </div>
            <script>
                setTimeout(() => {
                    window.location.href = '${env.CLIENT_URL}';
                }, 5000);
            </script>
        </body>
        </html>
    `);
    


	} catch (error) {
        console.error('Error during sending access request:', error);
    return res.status(500).send({
      code: 500,
      error: { message: 'An internal server error occurred' },
    });
	}
};

module.exports = activateAccessRequest;
