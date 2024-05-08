const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
} catch (err) {
    console.log(err);
}
const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
});
const User = mongoose.model("User", userSchema);

const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account
};
