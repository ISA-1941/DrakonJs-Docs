const map = new Map();
for (let i = 0; i < 100; i++) {
  map.set(i, i);
}
console.log(`initial size: ${map.size}, buckets: ${map.buckets}, capacity: ${map.buckets * 2}`);
 
let prevBuckets = 0;
for (let i = 0; i < 100; i++) {
  map.delete(i);
  if (prevBuckets !== map.buckets) {
    console.log(`size: ${map.size}, buckets: ${map.buckets}, capacity: ${map.buckets * 2}`);
    prevBuckets = map.buckets;
  }
}