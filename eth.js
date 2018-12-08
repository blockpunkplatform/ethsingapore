const kyberNetworkAddress = "0x91a502C678605fbCe581eae053319747482276b9";
const auctionNetworkAddress = "0xcbf7B14076FE2C62D293E4c62F403b14B1fEa2eb";
var kyberNetworkInstance = null;
var auctionNetworkInstance = null;
var userEthAddress = null;
var highestBidValue = null;
var userBidValue = null;
var selected_coin = "eth";

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

function doBid(
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