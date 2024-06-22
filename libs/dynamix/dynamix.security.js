class Encryption {
    #privateKey = BigInt(Math.round(Math.random()*10_000_000)); // this is the largest privateKey that can be achieved by node.js as far as I know.
    #keys = {}; // Object to store established keys
    #messages = {} // Object to carry unreplied messages
    constructor(base = 29n, modulo = 5937137n, privateKeyMax = -1){
        this.hashLength = 16;
        if(privateKeyMax == -1) privateKeyMax = modulo/(base**2n);
        this.#privateKey = BigInt(Math.round(Math.random()*Number(privateKeyMax)));
        this.base = BigInt(base); // Base for the encryption calculations
        this.modulo = BigInt(modulo); // Modulo for the encryption calculations
        console.log("Generating public key");
        this.publicKey = (this.base**this.#privateKey) % this.modulo; // Public key derived from base and private key
        console.log("Public key", this.publicKey);
    }

    hash(number, length){
        number = Number(number);
        let hash = '';
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < length; i++) {
            hash += chars[(number + i) % chars.length];
        }
        return hash;
    }

    // Establish a shared key using another party's public key
    establishKey(publicKey){
        console.log("Establishing key with public key", publicKey);
        const sharedSecret = (BigInt(publicKey)**this.#privateKey) % this.modulo;
        console.log("Shared secret", sharedSecret);
        this.#keys[publicKey] = sharedSecret;
        this.#messages[publicKey] = [];
    }
    
    // Encrypt a unique message once using a previously established key
    encrypt(message, publicKey){
        if(!this.#keys[publicKey]) this.establishKey(publicKey);
        const key = Number(this.#keys[publicKey]);
        this.#messages[publicKey].push({message, hash: this.hash(key, this.hashLength)});
        message = this.hash(key, this.hashLength) + message;
        const payload = message.split('').map((char, i) => {
            const encodedChar = (char.charCodeAt(0) + Math.round(Math.sin((i + key) * key) * key)); // Use modulo to wrap around Unicode range
            return String.fromCharCode(encodedChar);
        }).join('');
        // const numberModulo = Number(this.modulo);
        // this.#keys[publicKey] = BigInt(Math.round(((Math.sin(Number(this.#keys[publicKey]))**2)+numberModulo/2)*numberModulo)%numberModulo);
        return payload;
    }

    // Decrypt a unique message once using a previously established key
    decrypt(message, publicKey){
        if(!this.#keys[publicKey]) this.establishKey(publicKey);
        const key = Number(this.#keys[publicKey]);
        const payload = message.split('').map((char, i) => {
            const decodedChar = (char.charCodeAt(0) - Math.round(Math.sin((i + key) * key) * key)); // Use modulo to wrap around Unicode range and handle negative values
            return String.fromCharCode(decodedChar);
        }).join('');
        const hash = payload.slice(0, this.hashLength);
        const content = payload.slice(this.hashLength);
        if(hash!==this.hash(key, this.hashLength)) throw new Error("Hash mismatch");
        this.#messages[publicKey] = [];
        // const numberModulo = Number(this.modulo);
        // this.#keys[publicKey] = BigInt(Math.round(((Math.sin(Number(this.#keys[publicKey]))**2)+numberModulo/2)*numberModulo)%numberModulo);
        return content;
    }

    // Implement Automatic Repeat reQuest (ARQ)
    receiveARQ(ARQ, publicKey){
        const sharedSecret = (BigInt(publicKey)**this.#privateKey) % this.modulo;
        const key = Number(ARQ)-Number(sharedSecret);
        this.#keys[publicKey] = BigInt(key);
        const lastMessageHash = this.hash(key, this.hashLength);
        const lastMessageIndex = this.#messages[publicKey].findIndex(message => message.hash === lastMessageHash);
        if(lastMessageIndex === -1) return Error("No unreplied messages found!");
        return this.#messages[publicKey].slice(lastMessageIndex).map(payload => this.encrypt(payload.message, publicKey));
    }

    sendARQ(publicKey){
        const sharedSecret = (BigInt(publicKey)**this.#privateKey) % this.modulo;
        return Number(this.#keys[publicKey] + sharedSecret);
    }
}

// Function to get the i-th prime number
function getPrime(i) {
    const isPrime = n => {
        for (let j = 2; j * j <= n; j++)
            if (n % j === 0) return false;
        return n > 1;
    };

    for (let num = 2, count = 0;; num++) {
        if (isPrime(num) && ++count === i) return num;
    }
}

function compression(inputString) {
    let compressedString = inputString;
    let substituteChar = '';
    let patternFound = true;
    let pairOfReplacement = [];

    // Loop until no more patterns can be compressed
    while (patternFound) {
        const uniqueChars = new Set(compressedString);
        substituteChar = '';

        // Find a unique character to use as a substitute
        for (let i = 0; i < 0xfff; i++) {
            const char = String.fromCharCode(i);
            if (!uniqueChars.has(char)) {
                substituteChar = char;
                break;
            }
        }

        if (!substituteChar) {
            break;
        }

        const patterns = {};
        // Identify patterns that appear more than once
        for (let length = 3; length <= compressedString.length / 2; length++) {
            for (let start = 0; start <= compressedString.length - length; start++) {
                const substr = compressedString.substring(start, start + length);
                if (patterns[substr]) continue;
                const regex = new RegExp(substr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
                const count = (compressedString.match(regex) || []).length;
                if (count > 1) {
                    patterns[substr] = { count: count, length: substr.length };
                }
            }
        }

        let bestPattern = '';
        let bestScore = 0;
        // Select the most effective pattern to replace
        Object.keys(patterns).forEach(pattern => {
            const score = patterns[pattern].count * patterns[pattern].length;
            if (score > bestScore) {
                bestPattern = pattern;
                bestScore = score;
            }
        });

        // Replace the best pattern with the substitute character
        if (bestPattern&&bestPattern!=='') {
            compressedString = compressedString.split(bestPattern).join(substituteChar);
            pairOfReplacement.push([bestPattern, substituteChar]);
            patternFound = true;
        } else {
            patternFound = false;
        }
    }

    // Construct the final compressed string with header information
    return `${String.fromCharCode(pairOfReplacement.length)}${pairOfReplacement.map(pair => `${String.fromCharCode(pair[0].length)}${pair[0]}${pair[1]}`).join('')}${compressedString}`;
}

function decompression(compressedString) {
    // Extract the header information
    const headerLength = compressedString.charCodeAt(0);
    let index = 1;
    const replacements = [];

    // Retrieve all patterns and their substitutions
    for (let i = 0; i < headerLength; i++) {
        const patternLength = compressedString.charCodeAt(index);
        const pattern = compressedString.substring(index + 1, index + 1 + patternLength);
        const substitute = compressedString[index + 1 + patternLength];
        replacements.push([pattern, substitute]);
        index += 1 + patternLength + 1;
    }

    // The remaining part of the string is the compressed data
    let decompressedString = compressedString.substring(index);

    // Replace all substitute characters with their original patterns
    replacements.reverse().forEach(replacement => {
        const [pattern, substitute] = replacement;
        const regex = new RegExp(substitute, 'g');
        decompressedString = decompressedString.replace(regex, pattern);
    });

    return decompressedString;
}

function stringToInt(string){
    let hash = 1;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = Math.abs(Math.sin(hash*(char+i)));
    }
    return hash;
}

module.exports = { Encryption, compression, decompression, getPrime, stringToInt };