main();
function digRoot(n) {
    var sum;
    sum = sumDigits(n);
    if (sum < 10) {
        return sum;
    } else {
        return digRoot(sum);
    }
}
function main() {
    console.log(digRoot(695));
}
function sumDigits(n) {
    var digit, digits, sum;
    sum = 0;
    digits = String(n).split('');
    for (digit of digits) {
        sum += parseInt(digit, 10);
    }
    return sum;
}