var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/omicron';

router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if(err) {
      res.sendStatus(500);
    }

    client.query('SELECT * FROM favpets', function (err, result) {
      done();
      if(err) {
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });
});


router.post('/', function (req, res) {
  var favPet = req.body;
  console.log(req.body);
  pg.connect(connectionString, function (err, client, done) {
    if(err) {
      res.sendStatus(500);
    }

    client.query('INSERT INTO favpets (petID, petName, petImageUrl, petDescription) '
                 + 'VALUES ($1, $2, $3, $4)',
                 [favPet.petID, favPet.petName, favPet.imageURL, favPet.description],
                 function(err, result) {
                   done();

                   if (err) {
                     res.sendStatus(500);
                   } else {
                     res.sendStatus(201);
                   }
                 });
  });
});

router.delete('/:id', function (req, res) {
  var id = req.params.id;
  pg.connect(connectionString, function(err, client, done) {
  if (err) {
    res.sendStatus(500);
  }

  client.query('DELETE FROM favpets ' +
               'WHERE id= $1',
                [id],
                function(err, result) {
                  done();
                  if(err){
                    res.sendStatus(500);
                  }
                  res.sendStatus(200);
                }
              )
                })

})

module.exports = router;
