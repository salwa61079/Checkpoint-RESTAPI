const mongoose = require('mongoose')

const { Schema, model } = mongoose;

//create user schema
const userSchema = new Schema({
    fullName: { type: String, required: true},
    IdCard:{type: Number, required: true},
    age: { type: Number , required: false},
    email: { type: String, unique:true},
    address: { type: String , required: false},   
});

module.exports = User = mongoose.model('User', userSchema)


//find all users
module.exports.findAllUsers = async (req,res ) => {
  try {
    const allUsers = await  User.find().sort([['fullName', 'ascending']]);
    res.status(200).send({message: "all users: ", allUsers});   
} 
catch (err) {
    res.status(500).send(err);
    console.log(err)
}
};


//create user
module.exports.createUser =(req,res) => {
  try {   
    const newUser = new User(req.body);
    newUser.save();
    res.status(200).send({
        message: "user added successfully",
        newUser,
    });
} catch (err) {
    res.status(500).send(err);
}
}

//edit  user by id
  module.exports.editById = async (req, res) => {
    try {
      const editUser = await User.updateOne(
          {_id: req.params.id},
          {$set: req.body}
      );
      res.status(200).send({
          message: "user is edited successfully: "});   
  } 
  catch (err) {
      res.status(500).send(err);
  }
  };
  
  //remove user by id
  module.exports.removeUserById =async (req, res) => {
    try {
      const deleteUser = await User.deleteOne({_id: req.params.id})       
      res.status(200).send({
          message: "user is deleted successfully: ",deleteUser});   
  } 
  catch (err) {
      res.status(500).send(err);
  }
  };
  