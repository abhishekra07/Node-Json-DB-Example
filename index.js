const express = require('express')
const { JsonDB } = require('node-json-db')
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const uuid = require('uuid')

const app = express()
const PORT = process.env.PORT || 3200

const db = new JsonDB(new Config("JsonDB", true, false, '/'));

//adding middleware
app.use(express.json())

app.get('/', function (req, res) {
  res.status(200).json({
    message: "Welcome to the application. You can use below paths!",
    paths: "[ {'/user/add' to add user}]"
  })
})

app.post('/user/add', (req, res) => {
  // console.log('body ',req.body);
  try {
    const name = req.body.username
    const mobile = req.body.mobile
    const hobby = req.body.hobby
    const id = uuid.v4()
    db.push(`/users/${id}`, { id, name, mobile, hobby }, true)
    res.status(200).json({messgae:"user added!",id})
  } catch (e) {
    console.log("Error :- ",e);
    res.status(500).json({message: "Error in insert"})
  }
})


app.get('/user/get', (req, res) => {
  const data = Object.values(db.getData('/users'));
  data.map( value => {
    console.log("value ",value);
  })

  // console.log("data :- ",data);

  res.status(200).json({});
})

app.listen(PORT, () => console.log(`server running on port ${PORT}`))
