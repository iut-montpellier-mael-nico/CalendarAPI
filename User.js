module.exports = class User {


    constructor(idUser, email , password) {
        this.idUser = idUser;
        this.mail = email;
        this.password = password;
        var lesEvents = [];
    }

     getUser(mail){
        if(User.mail === mail)
        return User;
    }

     addEvent(event){
        lesEvents.push(event);
    }

     getListEvent(){
        return lesEvents
    }


}