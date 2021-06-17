import React,{useContext, useEffect, useState } from "react";
import Web3 from "web3";
import supply from '../../abis/supplyChain.json'
const blockContext  = React.createContext();


export function useBlock(){
    return useContext(blockContext);
}

export function BlockProvider({children}){
    const [account , setAccount] = useState();
    const [supplyChain ,setsupplyChain] = useState();
    const [web3,setWeb3] = useState();
    useEffect(() => {
         loadWeb3()
       loadBlockChainData()
    },[])

    async function loadWeb3() {
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }

      async function loadBlockChainData(){

          const web3 = window.web3
          setWeb3(web3)
          const accounts = await web3.eth.getAccounts()
          setAccount(accounts[0])
          const networkId = await web3.eth.net.getId()
          const networkData = supply.networks[networkId]
          const chain = await web3.eth.Contract(supply.abi,networkData.address,{ transactionConfirmationBlocks: 1,gasPrice :200000000000})
            setsupplyChain(chain)
      }

      function addProduct(name){
        return supplyChain.methods.addProduct(name).send({from : account})
      }

      function updateLocation(location ,id,address){
        return supplyChain.methods.changeLocation(location,id,address).send({from : account})
      } 

      function trackProduct(id){
        return supplyChain.methods.fetchInfo(id).call()
      }
      function productCount(){
        return supplyChain.methods.productCount().call()
      }

      function fetchOwner(id){
        return supplyChain.methods.fetchAddress(id).call()
      }

      function fetchLocations(id){
        return supplyChain.methods.fetchAllLocation(id).call()
      }
      const value = {
          addProduct,
          account,
          productCount,
          updateLocation,
          trackProduct,
          fetchOwner,
          fetchLocations

      }
      return(
          <blockContext.Provider value = {value}>
              {children}
          </blockContext.Provider>
      ) 
}