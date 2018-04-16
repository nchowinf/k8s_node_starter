// Load express module with `require` directive
const express = require('express');

const app = express();

// Define request response in root URL (/)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Launch listening server on port 3000
app.listen(3000, () => {
  console.log('app listening on port 3000!');
  console.log(process.env);
});
