function dateNotValid(d) {
  const value = Date.parse(d);
  return isNaN(value);
}

function capFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Get raw json
const fs = require('fs');
// Set limit
const resultsLimit = null;
const rawdata = fs.readFileSync('raw-hunt-data2.json'),
  dataDir = '../app/data',
  subCollections = ['season', 'wma', 'weapon', 'huntType', 'hunterType'],
  countProperties = ['bucks', 'does', 'boars', 'sows', 'quota', 'hunterCount'];

let hunts = JSON.parse(rawdata);

if (resultsLimit !== null) {
  hunts = hunts.filter((item, index) => index < resultsLimit);
}

console.log(`####################################################
Processing ${hunts.length} Hunts ...`);

// Quick cleanup
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

let removedByDateCount = 0,
  remmovedByWeaponCount = 0;
// Iterate all Hunts
for (let [i, hunt] of hunts.entries()) {
  //  - Set IDs
  hunt.id = i + 1;
  //  - Update "count" props
  countProperties.forEach(prop => {
    // convertEmptyToZero(item, i);
    if (hunt[prop] === '' || hunt[prop] === '-') {
      hunts[i][prop] = 0;
    }
  });

  //  - Remove entries with missing dates
  if (!(dateNotValid(hunt.startDate) || dateNotValid(hunt.endDate))) {
    // Convert date properties to UNIX timestamp (milliseconds) ...
    hunt.startDate = Date.parse(hunt.startDate);
    hunt.endDate = Date.parse(hunt.endDate);
  } else { // Hunts with invalid start/end dates, throw out ...
    hunts.splice(i, 1);
    removedByDateCount++;
  }

  if (hunt.weapon.trim() === '' || hunt.weapon === null) {
    hunts.splice(i, 1);
    remmovedByWeaponCount++;
  }

}

if (removedByDateCount > 0) {
  console.log(`---------------------------------------------------
*** Removed ${removedByDateCount} Hunt(s) because of invalid start or end date. ***`);
}

if (remmovedByWeaponCount > 0) {
  console.log(`---------------------------------------------------
*** Removed ${remmovedByWeaponCount} Hunt(s) because of missing weapon. ***`);
}

// Parse out unique subcollection values from Hunts...
let subCollectionData = [];
for (let sub of subCollections) {
  subCollectionData.push((() => {
    return [...new Set(hunts.map(item => item[sub]))]
      .map((sub, index) => ({ name: sub, id: index + 1 }))
  })(sub));
}

// console.log(subCollectionData[0]);
// console.log(subCollectionData);

// Iterate all Hunts again
for (let [huntIndex, hunt] of hunts.entries()) {
  //  - Update subcollection fields
  for (let [subIndex, sub] of subCollections.entries()) {
    // console.log(hunt[sub]);
    hunt[sub] =
      (subCollectionData[subIndex].find(e => e.name === hunt[sub])).id;
  }
}

// console.log(hunts);
console.log(`Finished processing ${hunts.length} Hunts!`);

// Create huntData data file ...
const huntDataContent = `import { Hunt } from './../model';
export class HuntData {
static huntData: Hunt[] = ${JSON.stringify(hunts)}}`;

fs.writeFileSync(`${dataDir}/huntData.ts`, huntDataContent);

console.log(`####################################################
Saved huntData file to: ${dataDir}/huntData.ts`);

// Create each of the subCollection data files ...
for (let [i, sub] of subCollections.entries()) {
  const fileContent = `import { ${capFirstLetter(sub)} } from './../model';
export class ${capFirstLetter(sub)}Data {
static ${sub}Data: ${capFirstLetter(sub)}[] = ${JSON.stringify(subCollectionData[i])}}`;

  fs.writeFileSync(`${dataDir}/${sub}Data.ts`, fileContent);

  console.log(`---------------------------------------------------
Saved ${sub}Data file to: ${dataDir}/${sub}Data.ts`);

}

console.log('DONE');

