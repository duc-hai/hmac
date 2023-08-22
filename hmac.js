//Declare hash function libraries
const md5 = require("md5");
const sha256 = require("sha256");
const sha1 = require("sha1");

function calculateHMAC(message, key, hashFunction) {
  const blocksize = 64; // Block length corresponding to hash functions (sha1, md5 and sha256 all share 512 bit ~ 64 byte block length)
  const ipad = 0x36; //initialize ipad and opad initial values (these values are often used)
  const opad = 0x5c; //These 2 strings help to create diversity as well as randomness in the calculation of HMAC

  // In JavaScript, Buffer is an object class provided by Node.js for working with byte ranges, especially when you need to deal with binary data like in encoding related tasks, hash, or work with files. That's why in this case, I will use buffer datatype
  key = Buffer.from(key, "utf-8")
  message = Buffer.from(message, "utf-8")

  //check the size of the key, if the size of the key is smaller than the block size, then pad the 0 bits after to ensure the length, if it is larger, then pass it to the hash function
  if (key.length < blocksize) {
    //Buffer.alloc is a method to create an empty buffer with n size bytes (n is the arguments passed)
    key = Buffer.concat([key, Buffer.alloc(blocksize - key.length)]) //Concentrate key with n empty bytes to ensure length (n is the number of bytes )
  } else if (key.length > blocksize) {
    key = hashFunction(key);
  }
  
  //Inner key calcultation: inner key = key XOR ipad
  const innerKey = Buffer.from(key).map((byte) => byte ^ ipad) //Map is the method to allow traversing for all the elements in array, object... , XOR is demonstrated in by ^

  //Outer key = key XOR opad
  const outerKey = Buffer.from(key).map((byte) => byte ^ opad)

  //Inner data = HASH (inner key XOR message) (use hash function below)
  const innerData = Buffer.concat([innerKey, message])

  //Outer data = HASH (outer key XOR innerData)
  const outerData = Buffer.concat([
    outerKey,
    Buffer.from(hashFunction(innerData), "utf-8"),
  ])

  return hashFunction(outerData).toString("hex") //The final result
}

//Library available for hmac algorithm
const crypto = require("crypto");

// using crypto library to demo for sha3 hash function
function calculateHMACwithLibary(message, key, hashFunction) {
  return crypto.createHmac(hashFunction, key).update(message).digest("hex"); //Output is hex or base64
}

//Export methods to use in other files
module.exports = {
  calculateHMAC,
  calculateHMACwithLibary,
};
