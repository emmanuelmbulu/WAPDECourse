function max(a, b) { if(a > b) return a; else return b; }

function maxOfThree(a, b, c) {
    return a > b ? (a > c ? a : c) : (b > c ? b : c);
}

function isVowel(letter) {
    if('string' != typeof letter) return false;
    if(letter.length < 1 || letter.length > 1) return false;
    letter = letter.toLowerCase();
    return ["a", "e", "i", "o", "u", "y"].includes(letter);
}

function sum(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'number') result += arr[i];
    }
    return result;
}

function multiply(arr) {
    let result = 1;
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'number') result *= arr[i];
    }
    return result;
}

function reverse(text) {
    if(typeof text !== 'string') return null;
    if(text.length <= 1) return text;
    let reversedText = text.charAt(text.length - 1);
    for (let i = text.length - 2; i >= 0; i--) {
        reversedText += text.charAt(i);
    }
    return reversedText;
}

function findLongestWord(arr) {
    let result = 0;
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'string' && arr[i].length > result) result = arr[i].length;
    }
    return result;
}

function filterLongWords(arr, len) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if(typeof arr[i] === 'string' && arr[i].length > len) result[result.length] = arr[i];
    }
    return result;
}

function mapFilterReduceFind() {
    const a = [1,3,5,3,3]; 
    const b = a.map(function(elem, i, array) {
        return elem * 10;
    });
    console.log("Expected output of [1,3,5,3,3].map() is [10, 30, 50, 30, 30] and  " + myFunctionTest([10, 30, 50, 30, 30], b));

    const c = a.filter(function(elem, i, array){
        return elem === 3;
    });
    console.log("Expected output of [1,3,5,3,3].filter() is [3, 3, 3] and  " + myFunctionTest([3, 3, 3], c));

    const d = a.reduce(function(prevValue, elem, i, array){
        if(i === 0) return elem;
        return prevValue * elem;
    });
    console.log("Expected output of [1,3,5,3,3].reduce() is 135 and  " + myFunctionTest(135, d));
}

function myFunctionTest(expected, func) {
    if(typeof expected === 'object') {
        if(expected.length !== func.length) return "TEST FAILED";
        for (let i = 0; i < expected.length; i++) {
            if(expected[i] !== func[i]) return "TEST FAILED";            
        }
        return "TEST SUCCEEDED";
    }
    if(expected === func) return "TEST SUCCEEDED";
    return "TEST FAILED";
}

console.log("Expected output of max(20,10) is 20 and  " + myFunctionTest(20, max(10, 20)));
console.log("Expected output of maxOfThree(20, 10, 50) is 50 and  " + myFunctionTest(50, maxOfThree(50, 10, 20)));
console.log("Expected output of isVowel('A') is true and  " + myFunctionTest(true, isVowel('A')));
console.log("Expected output of sum([20, 10, 50]) is 80 and  " + myFunctionTest(80, sum([50, 10, 20])));
console.log("Expected output of multiply([20, 10, 50]) is 10000 and  " + myFunctionTest(10000, multiply([50, 10, 20])));
console.log("Expected output of reverse('Emmanuel') is 'leunammE' and  " + myFunctionTest('leunammE', reverse('Emmanuel')));
console.log("Expected output of findLongestWord(['hello', 'beautiful', 'world']) is 9 and  " + myFunctionTest(9, findLongestWord(['hello', 'beautiful', 'world'])));
console.log("Expected output of filterLongWords(['hello', 'beautiful', 'world'], 5) is ['beautiful'] and  " + myFunctionTest(['beautiful'], filterLongWords(['hello', 'beautiful', 'world'], 5)));

mapFilterReduceFind();