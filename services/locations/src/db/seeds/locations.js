exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("locations")
    .del()
    .then(function() {
      // Inserts seed entries
      return Promise.join(
        knex("locations").insert([
          {
            user_id: 1,
            lat: 40.7128,
            long: 74.006
          },
          {
            user_id: 2,
            lat: 37.5665,
            long: 126.978
          }
        ])
      ).catch(err => {
        console.log(err);
      });
    });
};
