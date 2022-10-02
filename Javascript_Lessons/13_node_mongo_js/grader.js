module.exports.average = function(arr) {
  sum = arr.reduce(function(sum, element) {
    return (sum += element);
  });
  //avg = sum / arr.length;
    //console.log(arr,sum,avg);
  return Math.round(sum / arr.length);
};
