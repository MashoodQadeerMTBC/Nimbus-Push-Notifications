var webserviceURLS = {
    baseURL: 'https://uat-webservices.mtbc.com',
    notificationsFetch: "/LabourTrackerProjects/api/User/GetAlertNotificationCount",
    getNotificationsPath: function () {
        return this.baseURL + this.notificationsFetch;
    }
}

module.exports = webserviceURLS;
