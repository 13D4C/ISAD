class User {
    constructor(name, password, email, role) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    getName() {
        return this.name;
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
