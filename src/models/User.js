const users = [];

module.exports = {
    users,
    findByEmail: (email) => users.find(user => user.email === email),
    findById: (id) => users.find(user => user.id === id),
    create: (user) => {
        users.push(user);
        return user;
    }
};
