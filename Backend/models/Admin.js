const User = require('./User');

class Admin extends User {
    constructor(name, password, email) {
        super(name, password, email, 'admin');
        this.isAdmin = true;
    }

    getIsAdmin() {
        return this.isAdmin === 'admin';
    }
}

module.exports = Admin;
