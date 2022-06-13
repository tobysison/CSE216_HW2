import { Person, Employee, Student } from "./People.js";

class Node {
    constructor(initKey, initData, initParent, initLeft, initRight) {
        this.key = initKey;
        this.data = initData;
        this.parent = initParent;
        this.left = initLeft;
        this.right = initRight;
    }
};

var nullPerson = new Person("NULL", "NULL", "NULL");
export default class BinarySearchTree {
    constructor(initKeyLength) {
        this.root = null;
        this.size = 0;
        this.keyLength = initKeyLength;
    }

    generateKey() {
        let key = "";
        for (let i = 0; i < this.keyLength; i++) {
            let randomNum = Math.floor(Math.random() * 26);
            let randomChar;
            randomNum += 97;
            randomChar = String.fromCharCode(randomNum);
            key += randomChar;
        }
        return key;
    }

    putValue(key, value) {
        if (this.root == null) {
            this.root = new Node(key, value, null, null, null);
            this.size++;
            return;
        }
        this.putValueHelper(this.root, key, value);
    }

    putValueHelper(temp, key, value) {
        if (temp.key == key) {
            temp.data = value;
            return;
        }
        if (key.localeCompare(temp.key) < 0) {
            if (temp.left == null) {
                temp.left = new Node(key, value, temp, null, null);
                this.size++;
                return;
            }
            this.putValueHelper(temp.left, key, value);
        }
        if (key.localeCompare(temp.key) > 0) {
            if (temp.right == null) {
                temp.right = new Node(key, value, temp, null, null);
                this.size++;
                return;
            }
            this.putValueHelper(temp.right, key, value);
        }
    }

    getValue(key) { 
        return this.getValueHelper(this.root, key); 
    }

    getValueHelper(temp, key) {
        if (temp == null) {
            return nullPerson;
        }
        if (temp.key == key) { 
            return temp.data;
        }
        if (key.localeCompare(temp.key) < 0) {
            return this.getValueHelper(temp.left, key);
        }
        if (key.localeCompare(temp.key) > 0) {
            return this.getValueHelper(temp.right, key);
        }
        return nullPerson;
    }

    removeValue(key) {
        let tempParent = null;
        this.removeValueHelper(this.root, key, tempParent);
    }
    
    removeValueHelper(temp, key, tempParent) {
        if (temp == null) {
            console.log("\nPerson with key " + key + " was not found.\n");
            return;
        }
        if (temp.key == key) {
            //if temp is left child
            if (key.localeCompare(tempParent.key) < 0) {
                //promote left
                if (temp.left != null) { // if temp's left exists
                    tempParent.left = temp.left; // set parent left = left temp
                    (tempParent.left).right = temp.right; // set promoted node's right to temp's right
                    this.size--;
                    return;
                }
                //promote right
                if (temp.right != null) { //if temp's right exists
                    tempParent.left = temp.right; //tempParent's left is temp's right
                    this.size--;
                    return;
                }
                //if node has no children
                tempParent.left = null;
                this.size--;
                return;
            }
            //if temp is right child
            if (key.localeCompare(tempParent.key) > 0) {
                //promote left
                if (temp.left != null) { // if temp's left exists
                    tempParent.right = temp.left; //tempParent's right becomes temp's left
                    (tempParent.left).right = temp.right; //tempParent's right get's temp's right
                    this.size--;
                    return;
                }
                //promote right
                if (temp.right != null) { //if temp's right exists
                    tempParent.right = temp.right; // tempParent's right gets temp's right
                    this.size--;
                    return;
                }
                //if node has no children
                tempParent.right = null;
                this.size--;
                return;
            }
        }
        if (key.localeCompare(temp.key) < 0) {
            tempParent = temp;
            this.removeValueHelper(temp.left, key, tempParent);
        }
        if (key.localeCompare(temp.key) > 0) {
            tempParent = temp;
            this.removeValueHelper(temp.right, key, tempParent);
        }
    }

    toStringRecursively(traveller, level) {
        let text = "";
        if (traveller.left != null)
            text += this.toStringRecursively(traveller.left, level+1);
        for (let i = 0; i < level; i++) {
            text += "   ";
        }
        text += "   " + traveller.data.toString() + "\n";
        if (traveller.right != null)
            text += this.toStringRecursively(traveller.right, level+1);
        return text;        
    }

    toString() {
        return this.toStringRecursively(this.root, 0);
    }
}