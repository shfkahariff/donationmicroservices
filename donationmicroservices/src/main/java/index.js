/**
 * 
 */const express = require('express');
const postgresql = require('postgresql');
const cors = require('cors');

const app = express();
app.use(cors());

var connect = postgresql.createPool({
  host: "ec2-44-196-174-238.compute-1.amazonaws.com",
  user: "hlrbheqbczvkck",
  password: "fb1bb3afb74dce1181912d32f2115b7380b1eee6081e20073d4de3d522f6e8de",
  database: "d3t8dfkls27nvs"
});

app.get('/', (req, res) => {
  res.send('hello world!');
  console.log('Running');
});

app.get('/display', (req, res) => {
  var micro_username = req.query.username;

  console.log("username: " + micro_username);

  connect.getConnection(function (err, connection) {
    if (err) { res.send('Error Database Connection'); }
    else {
      var sql = "SELECT * FROM donation";
      connect.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      connection.release();
      });
    }
  });
});


app.listen(process.env.PORT, () => {
  console.log('Example app listening to port 4005');
});
