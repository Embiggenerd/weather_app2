const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync("lala", salt);
      // Inserts seed entries
      return knex("users").insert([
        { username: "john", password: hash }
      ]);
    })
    .catch(err => console.log(err));
};
