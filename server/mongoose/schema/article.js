const mongoose = require ("mongoose")
const Article = new mongoose.Schema({
    content: {type: String, default: "", require : true },
    createdAt: {type: Date, default: Date.now, require : true },

})

module.exports = Article