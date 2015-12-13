var crypto = require('crypto');

module.exports.create = function(secret, timeout) {
	var salt = generateSalt(10);
	var time = (Math.floor(Date.now() / 1000));
	var maxTime = time + timeout;
	var hmac = crypto.createHmac('sha512', secret);
	hmac.update(salt + maxTime + secret);
	var hash = hmac.digest('hex');
	var nonce = salt + ',' + maxTime + ',' + hash;
	return nonce;
};
module.exports.verify = function(secret, nonce) {
	var nonceParts = nonce.split(","),
		salt = nonceParts[0],
		maxTime = nonceParts[1],
		hash = nonceParts[2],
		time = (Math.floor(Date.now() / 1000));

	var hmac = crypto.createHmac('sha512', secret);
	hmac.update(salt + maxTime + secret);
	var calcHash = hmac.digest('hex');

	if(hash != calcHash) {
		return false;
	}
	if(time > maxTime) {
		return false;
	}
	return true;
};

function generateSalt(length) {
	return crypto.randomBytes(length).toString('base64');
}