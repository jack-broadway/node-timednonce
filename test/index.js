var should = require('chai').should(),
	sleep = require('sleep'),
	scapegoat = require('../index'),
	create = scapegoat.create,
	verify = scapegoat.verify;

describe('#create', function() {
	it('should return false when args are incorrect datatypes', function() {
		create(22, 10).status.should.equal(false);
		create("secret", "10 seconds").status.should.equal(false);
		create(20, "10 seconds").status.should.equal(false);
	});
	it('nonce should contain three parts when split(",")', function() {
		var nonce = create("secret", 10);
		nonce.split(',').should.have.length(3);
	});
});
describe('#verify', function() {
	it('should return false when args are incorrect datatypes', function() {
		verify(22, "hash").status.should.equal(false);
		verify("secret", 10).status.should.equal(false);
		verify(20, 15).status.should.equal(false);
	});
	it('should return false when incomplete nonce is provided', function() {
		verify("secret", "part1,part2").status.should.equal(false);
		verify("secret", "part1").status.should.equal(false);
		verify("secret", "part1,part2").message.should.equal("incomplete nonce");
	})
	it('should return false when nonce has expired', function() {
		this.timeout(2500);
		var nonce = create('secret', 1);
		sleep.sleep(2);
		verify("secret", nonce).status.should.equal(false);
		verify("secret", nonce).message.should.equal('nonce expired');
	});
	it('should return false when nonce values have been tampered but datatype same', function() {
		var nonce = create("secret", 10);
		var nonceParts = nonce.split(',');
		var tampSaltParts = nonceParts;
		tampSaltParts[0] = "bad2bone";
		var tampSalt = tampSaltParts.join();
		verify("secret", tampSalt).status.should.equal(false);
		var tampTimeParts = nonceParts;
		tampTimeParts[1] = 1263217367;
		var tampTime = tampTimeParts.join()
		verify("secret", tampTime).status.should.equal(false);
		var tampHashParts = nonceParts;
		tampHashParts[2] = 'FA278334A4';
		var tampHash = tampHashParts.join()
		verify("secret", tampHash).status.should.equal(false);
	});
	it('should return false when nonce values are incorrect datatype', function() {
		var nonce = create('secret', 10);
		var nonceParts = nonce.split(',');
		var tampSaltParts = nonceParts;
		tampSaltParts[0] = 10;
		var tampSalt = tampSaltParts.join();
		verify("secret", tampSalt).status.should.equal(false);
		var tampTimeParts = nonceParts;
		tampTimeParts[1] = "i am a time";
		var tampTime = tampTimeParts.join()
		verify("secret", tampTime).status.should.equal(false);
		var tampHashParts = nonceParts;
		tampHashParts[2] = '%^&S%D&^%&^%&^%';
		var tampHash = tampHashParts.join()
		verify("secret", tampHash).status.should.equal(false);
	});
});