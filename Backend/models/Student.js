const User = require('./User');

class Student extends User {
    constructor(username, password, email) {
        super(username, password, email, 'student');  
        this.isAdmin = false;
    }

    getIsAdmin() {
        return this.isAdmin === 'admin';
    }
}

module.exports = Student;
