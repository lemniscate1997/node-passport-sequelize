const dbConnection = () => {
    return mongoose.connect(`mongodb://localhost:27017/facebook`, {
        user: "fbuser",
        pass: "123",
        useNewUrlParser: true
    });
};

module.exports = { dbConnection };