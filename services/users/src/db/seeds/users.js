const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      const salt = bcrypt.getSaltSing();
      const hash = bcrypt.hashSync("lala", salt);
      // Inserts seed entries
      return knex("users").insert([
        { username: "john", password: hash },
        { username: "alex", password: hash },
        { username: "chris", password: hash }
      ]);
    })
    .catch(err => console.log(err));
};
