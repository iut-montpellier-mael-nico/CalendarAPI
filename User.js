
var event = require('./Event');
var lesEvents = [];
module.exports = class User {

    constructor(email, password) {
        //this.idUser = idUser;
        this.mail = email;
        this.password = password;
    }

    getUser(mail) {
        if (User.mail === mail)
            return User;
    }

    addEvent(event) {
        lesEvents.push(event);
    }

    getListEvent() {
        return lesEvents;
    }

    getUnEvent(idevent) {
        var monEvent = false;
        lesEvents.forEach(function (element) {
            if (element.idEvent === idevent) {
                monEvent = element;
            }
        });
        return monEvent;
    }

    deleteUnEvent(idevent) {
        lesEvents.forEach(function (element) {
            if (element.idEvent === idevent) {
                lesEvents.splice(lesEvents.indexOf(element), 1);
            }
        });
        return false;
    }

}