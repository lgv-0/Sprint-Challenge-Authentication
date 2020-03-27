let DB = require("./dbConfig");

function GetUsers()
{
    return DB.select("id", "username").from("users");
}

function GetUser(username)
{
    return DB.select("*").from("users").where("username", username);
}

function InsertUser(username, password)
{
    return DB.insert({username, password}).into("users");
}

module.exports =
    {
        GetUsers,
        GetUser,
        InsertUser
    };