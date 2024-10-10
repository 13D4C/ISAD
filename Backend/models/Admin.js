const User = require('./User');
require('dotenv').config();

class Admin extends User {
    constructor(username, email, password) {
        super(username, email, password, 'admin');
        this.isAdmin = true;
    }
    static getAdminCredentials() {
        return {
            adminId: process.env.ADMIN_ID,
            adminPassword: process.env.ADMIN_PASSWORD,
        };
    }

    getIsAdmin() {
        return this.role === 'admin';
    }

    static verifyAdmin(id, password) {
        const { adminId, adminPassword } = Admin.getAdminCredentials();
        return id === adminId && password === adminPassword;
    }
}

module.exports = Admin;