/*
We draw N discs on a plane. The discs are numbered from 0 to N − 1. An array A of N non-negative integers, specifying the radiuses of the discs, is given. The J-th disc is drawn with its center at (J, 0) and radius A[J].

We say that the J-th disc and K-th disc intersect if J ≠ K and the J-th and K-th discs have at least one common point (assuming that the discs contain their borders).

The figure below shows discs drawn for N = 6 and A as follows:

  A[0] = 1
  A[1] = 5
  A[2] = 2
  A[3] = 1
  A[4] = 4
  A[5] = 0


There are eleven (unordered) pairs of discs that intersect, namely:

discs 1 and 4 intersect, and both intersect with all the other discs;
disc 2 also intersects with discs 0 and 3.
Write a function:

function solution(A);

that, given an array A describing N discs as explained above, returns the number of (unordered) pairs of intersecting discs. The function should return −1 if the number of intersecting pairs exceeds 10,000,000.

Given array A shown above, the function should return 11, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..100,000];
each element of array A is an integer within the range [0..2,147,483,647].
*/

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');
function mergeAndCountOverlaps(leftEdge, rightEdge, maxLength) {
    var leftIndex = 0;
    var rightIndex = 0;
    var sum = 0;
    var total = 0;
    while ((leftIndex < leftEdge.length) || (rightIndex < rightEdge.length)) {
        if ((leftIndex < leftEdge.length) && (rightIndex < rightEdge.length)) {
            var compareLeftEdgeandRightEdge;
            if (leftEdge[leftIndex] < -2147483647 + maxLength) {
                compareLeftEdgeandRightEdge = leftEdge[leftIndex] <= rightEdge[rightIndex] + maxLength? true: false;
            } else {
                compareLeftEdgeandRightEdge = leftEdge[leftIndex] - maxLength <= rightEdge[rightIndex]? true: false;
            }
            if (compareLeftEdgeandRightEdge) {
                // a new left edge
                sum += total;
                if (sum > 10000000) {
                    return -1;
                }
                total++;
                leftIndex++;
            } else {
                // a new right edge
                total--;
                rightIndex++;
            }
        } else if (leftIndex < leftEdge.length) {
            // a new left edge
            sum += total;
            if (sum > 10000000) {
                return -1;
            }
            total++;
            leftIndex++;
        } else if (rightIndex < rightEdge.length) {
            // a new right edge
            total--;
            rightIndex++;
        }
    }
    return sum;
}


function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    var leftEdge = [];
    var rightEdge = [];

    var maxLength = 100000;
    // maxLength is used to prevent integers > 2147483647
    // and integers < -2147483647
    for (var i = 0; i < A.length; i++) {
        leftEdge[i] = i - A[i];
        rightEdge[i] = i - maxLength + A[i];
    }
    leftEdge.sort(function(a, b){return a-b});
    rightEdge.sort(function(a, b){return a-b});

    var sum = mergeAndCountOverlaps(leftEdge,rightEdge, maxLength);
    return sum;
}
