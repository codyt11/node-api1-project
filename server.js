const express = require('express'); //imports the express package

const shortid = require('shortid');

const server = express(); // this creates the server

server.use(express.json())

let users =  [
    {
        id: shortid.generate(),
        name: "Jane Doe",
        bio: "Not Tarzan's Wife, anothe Jane"
    },

    {
        id:shortid.generate(),
        name: "Tarzan",
        bio: "King of the Jungle"  
    }
]

server.get('/', (req, res) => {
    res.json({message: "hello"})
})

server.post('/api/users', (req, res) => {
    const newUser = req.body;

  newUser.id = shortid.generate();

  if (
    (newUser.id == null || newUser.id == "",
    newUser.name == null || newUser.name == "",
    newUser.bio == null || newUser.bio == "")
  ) {
    alert("Please Fill All Required Field");
    res.status(404).json({ message: "user not added!" });
    return false;
  } else {
    users.push(newUser);
    res.status(201).json(newUser);
  }
})

server.get('/api/users', (req, res) => {
    res.json(users)
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const singleUser = req.body;

    let foundUser = users.find((user) => user.id === id);

    if (foundUser) {
        Object.assign(foundUser, singleUser);
        res.status(200).json(foundUser);
    } else {
        res.status(404).json({message: "user not found"});
    }
    res.status(201).json(res.params.id);
});

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

  const userDeleted = users.find((user) => user.id === id);

  if (userDeleted) {
    users = users.filter((user) => user.id !== id);
    res.status(200).json(userDeleted);
  } else {
    res.status(404).json({ message: "id not found" });
  }
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  let userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== 1) {
    users[userIndex] = changes;
    res.status(200).json(users[userIndex]);
  } else {
    res.status(404).json({ message: "could not find the user!" });
  }
})


server.listen(5000, () => {
console.log('Server is running on http://localhost:5000')
});
