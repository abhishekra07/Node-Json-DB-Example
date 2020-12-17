const express = require('express')
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const uuid = require('uuid')

const app = express()
const PORT = process.env.PORT || 3200

//gettig json db instance
const db = new JsonDB(new Config('JsonDB', true, false, '/'));

//adding middleware
app.use(express.json())

//root url
app.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to the application. You can use below paths!',
    paths: "[ {'/user/add' to add user}]"
  })
})


app.post('/user/add', (req, res) => {
  try {
    const { name, mobile, hobby } = req.body
    const id = uuid.v4()
    db.push(`/users/${id}`, { id, name, mobile, hobby }, true)
    res.status(200).json({messgae:'user added!',id})
  } catch (e) {
    console.log('Error :- ',e);
    res.status(500).json({message: 'Error in insert'})
  }
})

app.get('/user/get', (req, res) => {
  const data = Object.values(db.getData('/users'));
  let users = []
  data.map( value => {
    users.push(value)
  })
  res.status(200).json({ users });
})


app.post('/user/delete', (req, res) => {
  try {
    const { userId } = req.body
    // const userData = db.getData(`/users/${userId}`)
    db.delete(`/users/${userId}`)
    res.status(200).json({ message: 'user deleted!' });
  } catch (e) {
    res.status(404).json({ message: 'User Not Found' })
  }

})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
