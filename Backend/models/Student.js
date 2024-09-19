const User = require('./User');

class Student extends User {
    constructor(name, password, email) {
        super(name, password, email, 'student');  
        this.isAdmin = false;
    }

    getIsAdmin() {
        return this.isAdmin === 'admin';
    }
}

module.exports = Student;
