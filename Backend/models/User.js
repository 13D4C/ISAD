class User {
    constructor(username, email, password, role, schedule) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.schedule = schedule;
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