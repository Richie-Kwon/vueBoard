const mongoose = require("mongoose")
const Author = new mongoose.Schema({
    username: { type: String, default: "", require = True, unique = True },
    password: { type: String, default: "", require = True },
})

module.exports = Author  