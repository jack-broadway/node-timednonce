# Timed Nonce

A small library for generating and verifying time based nonces using secrets.

## Installation

	npm install node-timednonce --save

## Usage

	var nonceHandler = require(node-timednonce);

	=/=
	var nonce = nonceHanlder.create("secret", 100);
	//Returns the nonce ready to send
	var valid = nonceHandler.verify("secret", nonce);
	//Will return true otherwise return object with status and message

## Tests
	
	npm test //Requires make
