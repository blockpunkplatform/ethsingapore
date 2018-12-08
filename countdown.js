function startCounter() {
  auctionNetworkInstance.endTime((err, res) => {
    if (err) {
      console.error("getEndTime error: ", err);
    } else {
      console.log('getEndTime(): ', res);
      var endTime = res.c[0];
      console.log("endTime: ", endTime);
      web3.eth.getBlockNumber((err, res) => {
        if (err) {
          console.error("web3.eth.blockNumber error: ", err);
        } else {
          console.log("web3.eth.blockNumber ", res);
          var blockNumber = res;
          web3.eth.getBlock(blockNumber, (err, res) => {
            if (err) {
              console.error("web3.eth.getBlock error: ", err);
            } else {
              // console.log("web3.eth.getBlock ", res);
              var currentTime = res.timestamp;
              console.log("current timestamp: ", currentTime);
              var distance = endTime - currentTime;
              console.log("distance = ", distance);
              this.runCounter(distance);
            }
          });
        }
      });
    }
  });
}

function runCounter(distance) {
  // Update the count down every 1 second
  var x = setInterval(function() {
    var distance = - 1000;

    // Time calculations for days, hours, minutes and seconds
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="demo"
    document.getElementById("countdown_txt").innerHTML = hours + "h "
    + minutes + "m " + seconds + "s Remaining";
    
    // If the count down is over, write some text 
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown_txt").innerHTML = "EXPIRED";
        document.getElementById("bid_eth_btn").disabled = true;
        document.getElementById("bid_dai_btn").disabled = true;
        document.getElementById("bid_knc_btn").disabled = true;
    }
  }, 1000);
}
