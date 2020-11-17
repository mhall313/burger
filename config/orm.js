var connection = require("./connection.js");


//Object Relational Mapper (ORM) - aka dynamic database queries. Use ? for column name & ?? for value to pass into dynamic queries
var orm = {
    selectAll: function(tableInput, cb){ // tableInput and cb would be the values passed in. this is from the cats example, does this make sense? what is cb and why is it being passed in - cb is a callback function to avoid any async issues. 
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
        console.log(queryString);

        connection.query(queryString, vals, function(err, res){
            if (err) {throw err;}
            cb(res);
        });
    },

    updateOne: function (){ //i think this will need things passed in
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