class AlertNotification {

    constructor(employeeName,
                employeeId,
                deviceToken,
                employeeTemperature,
                totalEmployeesWithHighTemperature,
                totalEmployeesWithLowBattery) {
        this.employeeName = employeeName;
        this.employeeId = employeeId;            
        this.deviceToken = deviceToken;
        this.employeeTemperature = employeeTemperature;
        this.totalEmployeesWithHighTemperature = totalEmployeesWithHighTemperature;
        this.totalEmployeesWithLowBattery = totalEmployeesWithLowBattery;
    }

    get notificationMessageTitle() {

        var messageText = "";
        if (this.totalEmployeesWithHighTemperature == 1) {
            const tempFloat = parseFloat(this.employeeTemperature); 
            const roundedTemp = tempFloat.toFixed(1);
            messageText = this.employeeName + " has a body temperature of " + roundedTemp + "°F";     
        } else if (this.totalEmployeesWithHighTemperature > 1) {
            messageText = "There are " + this.totalEmployeesWithHighTemperature + " no of employees having alarming temperatue need your attention."
        } 
 
        return messageText;

    } 

    get notificationMessage() {

        return "Ensure they cool down soon to avoid an emergency";

    } 

}

class NotificationResponse {

    constructor(data) {
        this.data = data.map(item => new AlertNotification(
            item.employeeName,
            item.employeeId,
            item.deviceToken,
            item.employeeTemperature,
            item.totalEmployeesWithHighTemperature,
            item.totalEmployeesWithLowBattery
        ));
    }

}

module.exports = {
    AlertNotification,
    NotificationResponse
};