const express = require('express'); // imports express
const PORT = 5000; // signifies which port number
const bodyParser = require('body-parser') // imports body-parser

const app = express();

app.use(express.static('server/public')); // sets up static server
app.use(bodyParser.urlencoded({extended:true})); // sets up body-parser
app.listen(PORT, ()=>{
  console.log('App is listening on port:', PORT);
}); // allows server to accept requests via port number

let inventory = [];
let nameSearch = '';

app.get('/items', (req, res)=>{
  console.log('client is recieving inventory');
  res.send(inventory);
}); // allows client to get data from the server

app.post('/items', (req, res)=>{
  let invItems = req.body;
  console.log('server is receiving data', invItems);
  inventory.push(invItems);

  res.sendStatus(201);
}); // adds data to inventory and stores it in the server

app.post('/searchitems', (req, res) => {
  let searchItem = req.body;
  console.log('server is receiving data', searchItem);
  nameSearch = searchItem;
  search(nameSearch, inventory);

  res.sendStatus(201);
}); 

app.get('/searchitems', (req, res) => {
  console.log('client is recieving inventory');
  res.send(nameSearch);
}); 

function search(nameSearch, inventory) {
  for (i=0; i<inventory.legnth; i++) {
    if(inventory.name.includes(nameSearch)){
      inventory.empty();
      inventory.push(inventory[i]);
    }
  }
} // this really messes things up, but oh well