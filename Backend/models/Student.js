const User = require('./User');

class Student extends User {
    constructor(username, email, password) {
        super(username, email, password, 'student');  
        this.isAdmin = false;
    }

    getIsAdmin() {
        return this.isAdmin === 'admin';
    }
}

module.exports = Student;
