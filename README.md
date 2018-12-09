## Inspiration

Crypto collectibles are limited by available payment options, volatility of Ether and location of purchase. Use Kyber swap to allow payment with any token on Kyber, including DAI stablecoin and make the purchase UI embeddable on any site through a widget. 

## What it does

Allows seller of crypto collectibles to embed a countdown auction on any website allowing buyer to pay in DAI stablecoin, ETH or any token on Kyber network. 

## How we built it

HTML widget interacts with auction contract & kyberswap contract. Users can bid with ETH or ERC-20 tokens supported by KyberSwap contract. The highest bid and winning bidder are shown in the widget. The widget allows users to keep increasing the bid by sending more ETH or ERC-20 tokens to the contract

## Challenges we ran into

* Lost 3hrs+ using the v1.0 of Web3 before realising its not supported and doesn't work before reverting to V 0.2x
* Error messages in Web3.js, Metamask and Remix are not very intelligible and it slowed down debugging of our code and integration with KyberSwap contract

## Accomplishments that we're proud of

* Managed to get our heads around the Kyber Swap app in limited time. 
* We created a new series of NFTs to demo this called "Celebs on Sushi" featuring Vitalik Buterin, Joseph Lubin, Loi Luu and Anna Rose :) https://blockpunk.net/en/collection/-e7a84ff5-6fec-8b34-3eb5-7c7ac66ee99d 

## What we learned

Don't use Web3 1.0 

## What's next for Kyber Auction Widget

* Integration with KyberSwap contract is still not working properly and we need to debug it to make it work, but bidding with ETH is working properly
* We want to integrate the widget on our BlockPunk marketplace (www.blockpunk.net) to enable bidding for ERC-721 tokens in ETH, DAI and other ERC-20 tokens 
