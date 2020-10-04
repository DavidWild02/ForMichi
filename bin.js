const extractData = require('.');

const args = process.argv.slice(2);
const FILE = args[0] || 'trains.json';
const MIN = parseInt(args[1]) || 0;
const MAX = parseInt(args[2]) || 999;

extractData(FILE, MIN, MAX);