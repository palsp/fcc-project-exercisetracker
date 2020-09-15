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
  const updatedDes = req.body.description
  const duration = req.body.duration
  const updatedDuration = parseInt(duration)
  const date  = req.body.date
  let updatedDate;
  if(!date){
    updatedDate = new Date()
  }else{
    updatedDate = new Date(date)
  }
 
  let currentAdded;
  User.findById(userId)
  .then(user => {
    //console.log(user)
    currentAdded = {
      description : updatedDes,
      duration : updatedDuration,
      date : updatedDate.toDateString()
    }
    user.exercise.push(currentAdded)
    return user.save()
  })
  .then(result => {
    res.send({
      _id : result._id,
      username : result.username,
      date : currentAdded.date,
      duration : currentAdded.duration,
      description : currentAdded.description

    })
  })
  .catch(err => {
    console.log(err)
  })

}

exports.getLog = (req , res , next ) => {
   const userId = req.query.userId;
   const logFrom = req.query.from
   const to = req.query.to
   const limit = req.query.limit
   console.log('id' , userId)
   console.log('from',logFrom ,'to' ,to , 'limit' ,limit)
   let rv =[];
   let currentUser;
   User.findById(userId)
   .then(user => {
     currentUser = user
     if(logFrom  && to  ){
       console.log('yes')
      const fromDate = new Date(logFrom);
      const toDate = new Date(to);
      rv =  user.exercise.filter( i => {
          return new Date(i.date) >= fromDate && new Date(i.date) <= toDate})
       res.send({
            _id : currentUser._id,
            username : currentUser.username,
            "from" : fromDate.toDateString(),
            to : toDate.toDateString(),
            count : rv.length,
            log : rv.map(i=>{
              return {
                  description : i.description,
                  date : i.date,
                  duration : i.duration
              }
            })
      })
    }else if(limit){
       for(let i = 0 ; i < parseInt(limit) ; i++){
        rv.push(user.exercise[i])
       }

       res.send({
         _id : currentUser._id,
            username : currentUser.username,
            count : rv.length,
            log : rv.map(i=>{
              return {
                  description : i.description,
                  date : i.date,
                  duration : i.duration
              }
            })

       })  
     }else{
        res.send({
         _id : currentUser._id,
            username : currentUser.username,
            count : currentUser.exercise.length,
            log : currentUser.exercise.map(i=>{
              return {
                  description : i.description,
                  date : i.date,
                  duration : i.duration
              }
            })

       }) 

     }

       });
     

}



