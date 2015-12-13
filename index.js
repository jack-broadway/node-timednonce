var crypto = require('crypto');

module.exports.create = function(secret, timeout) {
	if (typeof(secret) == "string" && typeof(timeout) == "number") {
		var salt = generateSalt(10);
		var time = (Math.floor(Date.now() / 1000));
		var maxTime = time + timeout;
		var hmac = crypto.createHmac('sha512', secret);
		hmac.update(salt + maxTime + secret);
		var hash = hmac.digest('hex');
		var nonce = salt + ',' + maxTime + ',' + hash;
		return nonce;
	} else {
		return {
			status: false,
			message: "Arguments wrong datatype"
		};
	}
};
module.exports.verify = function(secret, nonce) {
	if (typeof(secret) == "string" && typeof(nonce) == "string") {
		var nonceParts = nonce.split(",");
		if(nonceParts.length == 3) {
		var	salt = nonceParts[0],
			maxTime = nonceParts[1],
			hash = nonceParts[2];
		} else {
			return {status: false, message: 'incomplete nonce'}
		}
		var time = (Math.floor(Date.now() / 1000));

		var hmac = crypto.createHmac('sha512', secret);
		hmac.update(salt + maxTime + secret);
		var calcHash = hmac.digest('hex');

		if (hash != calcHash) {
			return {
				status: false,
				message: 'hash mismatch'
			};
		}
		if (time > maxTime) {
			return {
				status: false,
				message: 'nonce expired'
			};
		}
		return true;
	} else {
		return {
			status: false,
			message: "Arguments wrong datatype"
		};
	}
};

function generateSalt(length) {
	return crypto.randomBytes(length).toString('base64');
}