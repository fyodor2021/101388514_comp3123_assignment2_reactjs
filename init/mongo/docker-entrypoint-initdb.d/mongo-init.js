print('START');

empDb = db.getSiblingDB('app-service');

empDb.createUser({
    user:'root',
    pwd: 'root',
    roles: [{role: 'readWrite', db: 'app-service'}],
});

empDb.createCollection('app');

print('END');