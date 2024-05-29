
const User = require('../mongoDB/models').User;
const bcrypt = require('bcrypt');

// using 5
const pw = ["123", "456"];


const initUsers = async () => {

    pw[0] = await bcrypt.hash(pw[0], 5);
    pw[1] = await bcrypt.hash(pw[1], 5);

    return [
        {
            username: "Luffy",
            passwordHash: pw[0]
        },

        {
            username: "Sanji",
            passwordHash: pw[1]
        },
    ]
}


const nonExistingId = async () => {
  const user = new User({ userName: 'willremovethissoon', passwordHash: "$2y$05$5z4MMKX/8rSPCszd5VhFa.zlroQw7RmXw5Iyb5IZLHS0MvYz.H4g" })
  await user.save()
  await user.deleteOne()

  return user._id.toString()
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initUsers, nonExistingId, usersInDB
}