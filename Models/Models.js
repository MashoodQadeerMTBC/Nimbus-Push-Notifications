class AlertNotification {

    constructor(deviceToken, totalEmployeesWithHighTemperature, totalEmployeesWithLowBattery) {
        this.deviceToken = deviceToken;
        this.totalEmployeesWithHighTemperature = totalEmployeesWithHighTemperature;
        this.totalEmployeesWithLowBattery = totalEmployeesWithLowBattery;
    }

}

class NotificationResponse {

    constructor(data) {
        this.data = data.map(item => new AlertNotification(
            item.deviceToken,
            item.totalEmployeesWithHighTemperature,
            item.totalEmployeesWithLowBattery
        ));
    }

}

module.exports = {
    AlertNotification,
    NotificationResponse
};