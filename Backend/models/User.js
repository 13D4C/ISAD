class User {
    constructor(username, password, email, role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    getName() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }
}

module.exports = User;
