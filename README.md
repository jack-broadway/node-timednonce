# Timed Nonce
[![npm version](https://img.shields.io/npm/v/node-timednonce.svg)](https://npmjs.com/package/node-timednonce)
[![npm downloads](https://img.shields.io/npm/dm/node-timednonce.svg)](https://npmjs.com/package/node-timednonce)
[![license](https://img.shields.io/npm/l/node-timednonce.svg)](https://github.com/BaserPoison/node-timednonce/blob/master/LICENSE)

A small library for generating and verifying time based nonces using secrets.

## Installation
```js
npm install node-timednonce --save
```
## Usage
```js
var nonceHandler = require(node-timednonce);

=/=
var nonce = nonceHanlder.create("secret", 100);
//Returns the nonce ready to send
var valid = nonceHandler.verify("secret", nonce);
//Will return true otherwise return object with status and message
```
## Tests
	
	$ npm test
