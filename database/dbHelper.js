let DB = require("./dbConfig");

function GetUsers()
{
    return DB.select("id", "username").from("users");
}

function GetUser(username)
{
    return DB.select("*").from("users").where("username", username).first();
}

function InsertUser(username, password)
{
    return DB.insert({username, password}).into("users");
}

function DeleteUser(id)
{
    return DB.from("users").where("id", id).del();
}

function ResetIncrement()
{
    DB.select("*").from("users").then((response)=>
    {
        let Last = 1;
        response.map((i)=>
        {
            return {username: i.username, password: i.password, id: Last++};
        });
        console.log(response);

        DB("users").del("*").then(()=>
        {
            DB.batchInsert("users", response).then(()=>
            {

            }).catch((error)=>
            {
                console.log(error);
            })
        });
    });
}

module.exports =
    {
        GetUsers,
        GetUser,
        InsertUser,
        DeleteUser
    };