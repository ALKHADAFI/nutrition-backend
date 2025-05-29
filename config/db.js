const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb+srv://alkhadafi:bS1hYBr9Z1ps4Pgm@cluster0.n61pkfd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
