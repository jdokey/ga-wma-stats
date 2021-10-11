'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('raw-hunt-data.json'),
  hunts = JSON.parse(rawdata),
  subCollections =  ['season', 'wma', 'weapon', 'huntType', 'hunterType'],
  countProperties = ['bucks', 'does', 'boars', 'sows', 'quota', 'hunterCount'];

hunts = hunts.filter((item, index) => index < 500);
// console.log(hunts.length);

// Quick n dirty data cleanup ...
hunts.forEach(item => {
  if (item.weapon === 'Primative') item.weapon = 'Primitive';
  if (item.weapon === 'firearms' || item.weapon === 'FIrearms') item.weapon = 'Firearms';
  if (item.weapon === 'archery') item.weapon = 'Archery';
  if (item.hunterType === 'general') item.hunterType = 'General';
  if (item.wma === 'Alexander WMA') item.wma = 'Alexander';
  if (item.wma === 'Allatoona WMA') item.wma = 'Allatoona';
  if (item.wma === 'Phiziny Swamp') item.wma = 'Phinizy Swamp';
  if (item.hunterType === 'Hunt & Learn') item.hunterType = 'Hunt and Learn'
  if (item.isCheckIn === '') item.isCheckIn = false;
});

// Create each of the associated hunt data collections ...
subCollections.forEach(item => {
  createSubCollectionData(item);
});

for (let i = 0; i < hunts.length; i++) {

  // Set hunt id ...
  hunts[i].id = i + 1;

  // Update empty string values with 0 in these props ...
  countProperties.forEach(item => {
    convertEmptyToZero(item, i);
  });

  // Update properties with associated data ids ...
  subCollections.forEach(prop => {
    hunts[i][prop] = findFieldId(
      fs.readFileSync(`${prop}s.json`),
      prop, i
    );
  });

  // Convert date properties to UNIX timestamp (milliseconds) ...
  hunts[i].startDate = Date.parse(hunts[i].startDate);
  hunts[i].endDate = Date.parse(hunts[i].endDate);

  // console.log(hunts[i]);

}

// Create primary hunts.json document ...
fs.writeFileSync('hunts.json', JSON.stringify(hunts));

// ******* Helper Functions ******* //

function convertEmptyToZero(propName, index) {
  if (hunts[index][propName] === '' || hunts[index][propName] === '-') hunts[index][propName] = 0;
}

function findFieldId(array, propName, index) {
  // console.log('looking for: ', hunts);
  if (hunts[index][propName] === '') {
    return null;
  }
  return JSON.parse(array)
    .find(value => value.name === hunts[index][propName]).id;
}

function createSubCollectionData(propName) {
  let results = [];
  const uniqueValues = [...new Set(hunts.map(item => item[propName]))];
  for (let i = 0; i < uniqueValues.length; i++) {
    if (uniqueValues[i] !== '') {
      results.push({
        'id': i + 1,
        'name': uniqueValues[i]
      });
    }
  }
  results.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  fs.writeFileSync(`${propName}s.json`, JSON.stringify(results));
}
