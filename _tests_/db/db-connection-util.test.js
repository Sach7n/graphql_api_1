const dbConfig = require('../../db/db-connection-util'); 
const mongoose = require('mongoose');
describe('test dbConfig  function', () => {

  test('should connect to the database', async () => {
    const connection = await dbConfig();
    expect(connection.readyState).toBe(1); 
  });

  test('should throw an error on connection failure', async () => {
    jest.spyOn(mongoose, 'connect').mockRejectedValue(new Error('Connection error'));

    await expect(dbConfig()).rejects.toThrow('Connection error');
  });
});
