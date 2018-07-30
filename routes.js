const path = require("path");

module.exports = function(app, database) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
  });

      //READ
      app.get("/get-students", function(req, res) {
        database.query(`SELECT * FROM studentinfo`, function(error, results, fields) {
          if (error) throw error;
    
          console.log("results: ", results);
    
          res.send(results);
        });
    });

    //READ SPECIFIC 
    app.get("/get-studentinfo/:id", function(req, res) {
        let id = req.params.id;
        let first_name =req.params.first_name;
        database.query(`SELECT * FROM studentinfo WHERE first_name =${first_name}`, function(
          error,
          result,
          fields
        ) {
          if (error) throw error;
    
          console.log("results: ", result);
    
          res.send(result);
        });
    });
  
  // CREATE
  app.put("/add-studentinfo", function(req, res) {
        let first_name =req.body.first_name
        let last_name = req.body.last_name
        let email = req.body.email
        let gender = req.body.gender
        let ip_address = req.body.ip_address
        
        database.query(
            `INSERT INTO studentinfo (first_name,last_name,email,gender,ip_address)
                VALUES (
                  '${first_name}',
                '${last_name}',
                '${email}',
                '${gender}',
                '${ip_address}')`,
                function(error, result, fields) {
                if (error) throw error;

                console.log("results: ", result);

                res.send(result);
            }
        );
    });



    //UPDATE
    app.post("/update-studentinfo", function(req, res) {
        let id = req.body.id;
        let first_name = req.body.first_name;
       
        let last_name = req.body.last_name
        let email = req.body.email
        let gender = req.body.gender
        let ip_address = req.body.ip_address
        database.query(
          `UPDATE studentinfo 
            SET first_name=${first_name},
            last_name = ${last_name},
            email = ${email},
            gender = ${gender},
            ip_address = ${ip_address}

         
           WHERE id=${id}`,
          function(error, result, fields) {
            if (error) throw error;
    
            console.log("results: ", result);
    
            res.send(result);
          }
        );
    });

    //DELETE
    app.delete("/delete", function(req, res) {
        let id = req.body.id;
        database.query(`DELETE FROM studentinfo WHERE id=${id}`, function(
          error,
          result,
          fields
        ) {
          if (error) throw error;
    
          console.log("results: ", result);
    
          res.send(result);
        });
      });




    



};


