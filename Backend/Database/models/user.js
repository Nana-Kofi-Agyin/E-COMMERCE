// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs")

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         trim: true,
//     },

//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         trim: true,
//         lowercase:true, //added
//         match: [/.+\@.+\..+/, "please enter a valid email"],
//     },

//     password: {
//       type: String,
//       required: true,
//       minlength: 6,
//     },

//     role: {
//       type: String,
//       enum: ["customer", "vender", "admin"],
//       default: "customer"
//     },
// }, 
// {timestamps: true}
// )

// // password hash middleware
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// //match User password to hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// }

// module.exports = mongoose.model("User", userSchema); 

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["customer", "vendor", "admin"],
        default: "customer"
    },
}, {timestamps: true});

// CHANGED: No next parameter - modern async/await style
userSchema.pre("save", async function() {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);