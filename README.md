# Axios Specifications for UI
Axios is meant to be a platform where user can create and trade options on the Ethereum Platform fully decentralised.
## What is an option
An option is a financial contract in which the writer (seller) promises that the contract buyer has the right, but not the obligation, to buy or sell a certain security at a certain price (the strike price) on or before a certain expiration date, or exercise date. The asset in the contract is referred to as the underlying asset, or simply the underlying. An option giving the buyer the right to buy at a certain price is called a call, while one that gives him/her the right to sell is called a put. In the case of Axios only call options are implemented so we will focus on those. when the expiration date is met the underlying asset is returned to the seller.

## How is an option composed in axios
An option in axios has the following paramaters:
 
* lock => underlying asset (only ETH for now)
* ask => price at which the option is sold (in DAI)
* strike => strike price (in DAI)
* origin => creator of the option
* credit => how much someone is entitled to a certain option (what fraction of an option someone bought)
* expire => expiration date of the option

## Goal
I want a UI that makes you buy and sell options on the ethereum blockchain, that is easy to use and intuitive. I would expect a ledger of offers of options ordered by strike and expiration date. here is an example of a service that provides options: https://www.deribit.com/main#/options?tab=ETH-1JUL20.

# Axios: how to launch it

This project is linked to three repositories:

* Axios-Contracts:https://github.com/Giulio2002/Contracts-Axios
* Axios-Backend: https://github.com/Giulio2002/backend-axios
* Ui-Opt: https://github.com/Giulio2002/Ui-opt

We need to work (in terms of UI) only on UI-Opt and Axios-Backend(only if considered necessary)

## Prerequisite
* postgressql for backend
* An ethereum private key (for ropsten chain), also for backend
* Metamask
## Starting everything

* `git clone https://github.com/Giulio2002/backend-axios`
* `git clone https://github.com/Giulio2002/Ui-opt`
* go to Axios-Backend with shell:
    * `yarn`
    * `node api.js`
    * `node pusher.js` (in two different shells)

* go to Ui-opt with shell:
    * `yarn`
    * `yarn start`
## Explanation of components

* Ui-Opt
    * User Interface
* Axios-Backend
    * it provides and api used by the User Interface (api.js)
    * it provides a very little script that put the status of every user that interacted with the app into an sql database, which then are rendered to the UI via the api.(pusher.js)
    * This part only includes two significant little scripts. they are about 100 lines of code each so you can feel free to modify it if it's required.
* Axios-Contracts
    * the contract you need to look into are in the V2 folder and it's 'NativePivot2.sol'. the methods are listed:
        * `join` create an option
        * `buy`  buy an option
        * `exit` retire a previously created unbought option
        * `claim`pay the strike and claim a previously bought option
        * `back` exit the option if expiration is met.
