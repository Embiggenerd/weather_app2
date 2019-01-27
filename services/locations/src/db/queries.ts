import knex from './connection'

function getAllLocations() {
  return knex('locations').select();
}

function getAllLocationsByUser(userId: string) {
  return knex('locations').select().where('user_id', userId);
}

function getSingleLocation(jobId: string) {
  return knex('locations').select().where('id', jobId);
}

function addLocation(obj: string) {
  return knex('locations').insert(obj);
}

function updateLocation(jobId: string, obj: Object) {
  return knex('locations').update(obj).where('id', jobId);
}

function removeLocation(jobId: string) {
  return knex('locations').del().where('id', jobId);
}

module.exports = {
  getAllLocations,
  getAllLocationsByUser,
  getSingleLocation,
  addLocation,
  updateLocation,
  removeLocation,
};