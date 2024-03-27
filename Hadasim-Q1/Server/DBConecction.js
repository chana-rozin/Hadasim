import mysql from 'mysql2/promise'

const con = await mysql.createConnection({
    host: "localhost",
    user: "hadasim",
    password: "vsxho"
  });

  con.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  try{
  //con.query("insert into hmo.vaccination values (2, 'a')");
  }
  catch(ex){
    console.log(ex);
  }

  export {con};