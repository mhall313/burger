var connection = require("./connection.js");


//Object Relational Mapper (ORM)
var orm = {
    selectAll: function(tableInput, cb){
        var queryString = "SELECT * FROM" + tableInput + ";";
        connection.query(queryString, function(err,res){
            if (err) {throw err;}
            cb(res);
        });
    },

    insertOne: function (table, cols, vals, cb){
        var queryString = "INSERT INTO" + table;
        //copied from cats - what is this doing really?
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

    updateOne: function (){
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