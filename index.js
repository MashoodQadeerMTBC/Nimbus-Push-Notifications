const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert( require('./key/configurations.json') )
});

//For The Path
const path = require('path');

//For Express
const messaging = admin.messaging();
const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const webserviceURLS= require('./Resources/Resources');
const { AlertNotification, NotificationResponse } = require('./Models/Models.js');

// app.set('views', './views');
// app.set('views', __dirname + '/../views');
// app.set('view engine', 'ejs');
// app.use(express.static('public'));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

//BASE PATH
app.get('/', (req, res) => {
    res.render('index', { title: 'NIMBUS Application', message: 'Welcome to Nimbus Home Page' });
});

app.get('/notify', (req, res) => {

    const url = webserviceURLS.getNotificationsPath();
    axios.get(url, {
        headers: {
            'accept': '*/*'
        }
    })
        .then(response => {

            let notificationResponse;

            try {
              notificationResponse = new NotificationResponse(response.data.data);
            } catch (error) {
              console.error('Error creating NotificationResponse:', error);
              return res.status(200).json({ error: 'Failed to send notifications since Webservice response could not be parsed.' });
              notificationResponse = null; 
            }

            if (notificationResponse.data.length == 0) {
                return res.status(200).json({ error: 'Response does not have any device' });
            }

            devicesListToNotify(
                notificationResponse.data,
                (error, successCount) => {
                    if (error) {
                        return res.status(200).json({ error: 'Failed to send notifications' });
                    } else {
                        return  res.json({ successCount });
                    }
                }
            );

        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

});

// Starting the server service
app.listen(port, () => {
    console.log(`Nimbus Application is up`);
});

/**
 * Processes a list of devices to notify and sends notifications.
 * @param {AlertNotification[]} devicesList - An array of AlertNotification objects.
 * @param {function} callback - A callback function to handle the response or error.
 */

function devicesListToNotify( devicesList, callback ){

    var messages = Array();
    devicesList.forEach(device => {

        console.log(device);
        var messageData = {
            token: device.deviceToken,
            notification: {
                title: device.notificationMessageTitle,
                body:  device.notificationMessage
            },
            data: {
                key1: 'Temperature Alert!',
                employeeId: device.employeeId,
                totalEmployee: String(device.totalEmployeesWithHighTemperature)
            }
        };
        messages.push(messageData);

    });
    console.log(messages);
    admin.messaging().sendEach(messages).then((response) => {
          console.log("The server response is " + response.successCount);
          // Log the full response for debugging
          console.log("Full response: ", JSON.stringify(response, null, 2));
          callback(null, response.successCount);
    }).catch((error) => {
          console.log("The server response is " + error);
          callback(error, null);
    });

}