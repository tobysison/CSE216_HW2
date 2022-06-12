class KeyValuePair {
    constructor(initKey, initValue) {
        this.key = initKey;
        this.value = initValue;
    }
    
    toString() {
        return "(" + this.key + ", " + this.value.toString() + ")";
    }
}

export default class OpenAddressHashTable {
    constructor(initLength, initKeyLength) {
        this.length = initLength;
        this.size = 0;
        this.keyLength = initKeyLength;
        this.hashTable = [];
    }

    hashCode(key) {
        let charsSum = 0;
        for (let i = 0; i < key.length; i++) {
            let keyChar = key.charAt(i);
            let charAsNum = keyChar.charCodeAt(0);
            charsSum += charAsNum;
        }
        return charsSum % this.length;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 36);
            let randomChar;
            if (randomNum < 10) {
                randomNum += 48;
                randomChar = String.fromCharCode(randomNum);
            }
            else {
                randomNum += 55;
                randomChar = String.fromCharCode(randomNum);
            }
            key += randomChar;
        }
        return key;
    }
    
    getValue(key) {
        return null;
    }
    
    // @todo - YOU MUST DEFINE THIS METHOD
    removeValue(key) {   
    }

    rehash(newLength) {
        let temp = [];
        temp.fill(null, 0, this.length);
        for (let i = 0; i < this.length; i++) {
            temp[i] = this.hashTable[i];
        }
        let tempLength = this.length;
        this.length = newLength;
        this.size = 0;
        this.hashTable = [];
        this.hashTable.fill(null, 0, this.length);
        let hash, pos;
        for (let i = 0; i < tempLength; i++) {
            if (temp[i] == null) { continue; }
            hash = this.hashCode(temp[i].key);
            pos = hash;
            do {
                if (this.hashTable[pos] == null) {
                    this.hashTable[pos] = temp[i];
                    this.size++;
                    break;
                }
                pos = (pos+1)%this.length;
            } while (pos != hash);
        }
    }

    putValue(key, item) {
        if (this.size == 0) { this.hashTable.fill(null, 0, length); }
        let hash = this.hashCode(key);
        let pos = hash;
        do {
            if (this.hashTable[pos] == null) { 
                this.hashTable[pos] = new KeyValuePair(key, item);
                this.size++;
                return;
            }
            if (this.hashTable[pos].key == key) {
                this.hashTable[pos].value = item;
                return;
            }
            pos = (pos+1)%this.length;
            if (pos == hash && this.size == this.length) {
                this.rehash(this.length*2);
                hash = this.hashCode(key);
                pos = hash;
            }
        } while (true);
    }
    
    toString() {
        let text = "[\n";
        for (let i = 0; i < this.length; i++) {
            let kvp = this.hashTable[i];
            let kvpDescription = "null";
            if (kvp != null) {
                kvpDescription = kvp.toString();
            }
            text += "   " + i + ": " + kvpDescription + "\n";
        }
        text += "]\n";
        return text;
    }
};