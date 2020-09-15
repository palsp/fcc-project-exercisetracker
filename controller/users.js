const User = require('../models/users')

exports.createUser = (req , res , next) => {
  const input_user = req.body.username
  const newUser = new User({ username : input_user})
  newUser.save()
  res.send({ username : newUser.username , _id : newUser._id})
  
}

exports.getUsers = (req , res , next) => {
  User.find()
  .then(users => {
    return users.map( i => {
      return { username : i.username , _id : i._id}
    })
  })
  .then(users => {
    res.send(users)
  })
  .catch(err => {
    console.log(err)
  })
}

exports.addExercise = (req,res,next) => {
  const userId = req.body.userId
  console.log('inputId',userId)
  const updatedDes = req.body.description
  const duration = req.body.duration
  const updatedDuration = parseInt(duration)
  const date  = req.body.date
  console.log(date)
  let updatedDate;
  if(date === null){
    updatedDate = new Date()
  }else{
    updatedDate = new Date(date)
  }
 

  User.findById(userId)
  .then(user => {
    console.log(user)
    user.exercise.push({
      description : updatedDes,
      duration : updatedDuration,
      date : updatedDate.toDateString()
    })
    return user.save()
  })
  .then(result => {
    console.log(result)
    res.send(result)
  })
  .catch(err => {
    console.log(err)
  })

}