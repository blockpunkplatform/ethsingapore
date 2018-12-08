const kyberNetworkAddress = "0x91a502C678605fbCe581eae053319747482276b9";
const auctionNetworkAddress = "0xcbf7B14076FE2C62D293E4c62F403b14B1fEa2eb";
var kyberNetworkInstance = null;
var auctionNetworkInstance = null;
var userEthAddress = null;
var highestBidValue = null;
var userBidValue = null;
var selected_coin = "eth";

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
  // var kyberContract = web3.eth.contract(kyberNetworkABI);
  // kyberNetworkInstance = kyberContract.at(kyberNetworkAddress);
  console.log(kyberNetworkInstance);

  auctionNetworkInstance = new web3.eth.Contract(
    auctionABI,
    auctionNetworkAddress
  );
  // var auctionContract = web3.eth.contract(auctionABI)
  // auctionNetworkInstance = auctionContract.at(auctionNetworkAddress);
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