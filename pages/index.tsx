import { NFTCard } from "./components/nftCard"
import { useState } from 'react'

const Home = () => {
  const [wallet, setWalletAddress] = useState("")
  const [collection, setCollectionAddress] = useState("")
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection]=useState(false)

  const fetchNFTs = async() => {
    let nfts;
    console.log("fetching NFTs")
    const api_key = "Q1QvIa2I6XMl0B2-JTwAM7KPo3pgORUD"
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`;
    
    var requestOptions = {
      method: 'GET',
    };

    if(!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    } else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    }

    if (nfts) {
      console.log(nfts)
      setNFTs(nfts)
    }
  }

  const fetchNFTsForCollection = async() => {
    if(collection.length) {
      var requestOptions = {
        method: 'GET'
      };
      const api_key = "Q1QvIa2I6XMl0B2-JTwAM7KPo3pgORUD"
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
      if (nfts) {
        console.log("NFTs in collection:", nfts)
        setNFTs(nfts.nfts)
      } 
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        <input onChange={(e) => {setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e) => {setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
           () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }else fetchNFTs()
          }
        }>Let's go! </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>  
    </div>
  )
}

export default Home
