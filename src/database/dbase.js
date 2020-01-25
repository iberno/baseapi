const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://taskman:MhFUexmiQzr4XK2J@cluster0-sxuij.mongodb.net/nodeapi?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

module.exports = mongoose;