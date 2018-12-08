const kyberNetworkAddress = "0x91a502C678605fbCe581eae053319747482276b9";
const auctionNetworkAddress = "0xcbf7B14076FE2C62D293E4c62F403b14B1fEa2eb";
var kyberNetworkInstance = null;
var auctionNetworkInstance = null;
var userEthAddress = null;
var highestBidValue = null;
var userBidValue = null;
var selected_coin = "eth";
var artwork = null;

function formatEthPrice(price) {
  const displayPrice = price / 1000000000000000000;
  return displayPrice.toFixed(2);
}

function updateHighestBid() {
  auctionNetworkInstance.methods.getHighestBid().call().then((res) => {
    console.log('getHighestBid(): ', res);
    highestBidValue = formatEthPrice(res);
    updateUi();
  }).catch((err) => {
    console.error("getHighestBid error: ", err);
  });
}

function updateFundsByBidder() {
  auctionNetworkInstance.methods.fundsByBidder(userEthAddress).call().then((res) => {
    console.log('fundsByBidder(): ', res);
    userBidValue = formatEthPrice(res);
    updateUi();
  }).catch((err) => {
    console.error("fundsByBidder error: ", err);
  });
}

function swapToken(
  source,
  srcAmount,
  dest,
  destAddress,
  maxDestAmount,
  minConversionRate,
  walletId
) {
  options = {from: web3.givenProvider.selectedAddress}
  if (source == '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee') {
    options.value = srcAmount
  }
  return kyberNetworkInstance.methods.trade(
    source,
    srcAmount,
    dest,
    destAddress,
    maxDestAmount,
    minConversionRate,
    walletId
  )
  .send(options)
  .then((res) => {
    console.log(res);
  });
}

function doBiddingWithDai(amount) {
  // swap DAI token to ETH first
}

function doBiddingWithKnc(amount) {
  // swap KNC token to ETH first
}

function doBidding(amount) {
  auctionNetworkInstance.methods.placeBid(amount).call().then((res) => {
    console.log('placeBid(): ', res);
    this.updateFundsByBidder();
    this.updateHighestBid();
  }).catch((err) => {
    console.error("placeBid error: ", err);
  });
}

function startCounter() {
  auctionNetworkInstance.methods.endTime().call().then((res) => {
    console.log('endTime(): ', res);
    var endTime = res;
    var now = new Date().getTime() / 1000;
    var distance = endTime - now;
    this.runCounter(distance * 1000);

    // web3.eth.getBlockNumber().then((res) => {
    //     console.log("web3.eth.blockNumber ", res);
    //     var blockNumber = res;
    //     web3.eth.getBlock(blockNumber).then((res) => {
    //       // console.log("web3.eth.getBlock ", res);
    //       var currentTime = res.timestamp;
    //       console.log("current timestamp: ", currentTime);
    //       var distance = endTime - currentTime;
    //       console.log("distance = ", distance);
    //       this.runCounter(distance);
    //     }).catch((err) => {
    //       console.error("web3.eth.getBlock error: ", err);
    //       return 0;
    //     });
    // }).catch((err) => {
    //   console.error("getBlockNumber error: ", err);
    //   return 0;
    // });
  }).catch((err) => {
    console.error("endTime error: ", err);
    return 0;
  });
}

function runCounter(distance) {
  // Update the count down every 1 second
  var x = setInterval(function() {
    distance -= 1000;

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

// create window.web3
if (window.ethereum) {
  window.web3 = new Web3(ethereum)
  ethereum.enable()
} else if (window.web3) {
  window.web3 = new Web3(web3.currentProvider)
} else {
  window.web3 = new Web3("https://ropsten.infura.io/v3/ca8261a97ffc47c19f43526ff6b3fa7b")
  console.error(
    'Non-Ethereum browser detected. You should consider trying MetaMask!'
  )
}

// Create network objs
try {
  kyberNetworkInstance = new web3.eth.Contract(
    kyberNetworkABI,
    kyberNetworkAddress
  );
  console.log(kyberNetworkInstance);

  auctionNetworkInstance = new web3.eth.Contract(
    auctionABI,
    auctionNetworkAddress
  );
  console.log(auctionNetworkInstance);
  
  console.log(web3);
  web3.eth.getAccounts((accountsErr, accounts) => {
    if (accountsErr) {
      console.error("Get user eth_address error: ",accountsErr)
    } else {
      console.log("getAccounts: ", accounts);
      if (accounts && accounts.length > 0) {
        userEthAddress = accounts[0];
        this.updateFundsByBidder();
        this.updateHighestBid();
      }
    }
  });

  this.startCounter();
} catch (err) {
  console.error("Create network objs error: ", err);
}
