//Link up to MYSQL via the connection file
var connection = require("./connection.js");

//Helper Functions to parse query strings
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }

function objToSql(ob) {
    var arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {devoured: true} => ["devoured=true"]
        arr.push(key + "=" + value);
      }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

//Object Relational Mapper (ORM) - aka dynamic database queries. Use ? for column name & ?? for value to pass into dynamic queries
var orm = {
    selectAll: function(tableInput, cb){ // tableInput and cb are the values passed in - cb is a callback function to avoid any async issues. 
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err,res){
            if (err) {throw err;}
            cb(res);
        });
    },

    insertOne: function (table, cols, vals, cb){
        var queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
        //console.log(queryString);

        connection.query(queryString, vals, function(err, res){
            if (err) {throw err;}
            cb(res);
        });
    },

    updateOne: function (table, objColVals, condition, cb){ 
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, res) {
        if (err) {throw err;}

        cb(res);
        });
    }


};
module.exports = orm;