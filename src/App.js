
import Web3 from 'web3';
import { useRef, useEffect, useState } from "react";
import 'bulma/css/bulma.css';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

function App(){
  const COLLECTIONABI=[
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_root",
          "type": "bytes32"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "baseExtension",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "baseURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "cost",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32[]",
          "name": "proof",
          "type": "bytes32[]"
        },
        {
          "internalType": "bytes32",
          "name": "leaf",
          "type": "bytes32"
        }
      ],
      "name": "isValid",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxMintAmount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "maxSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_mintAmount",
          "type": "uint256"
        },
        {
          "internalType": "bytes32[]",
          "name": "proof",
          "type": "bytes32[]"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bool",
          "name": "_state",
          "type": "bool"
        }
      ],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "paused",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "root",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_newBaseExtension",
          "type": "string"
        }
      ],
      "name": "setBaseExtension",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_newBaseURI",
          "type": "string"
        }
      ],
      "name": "setBaseURI",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_newmaxMintAmount",
          "type": "uint256"
        }
      ],
      "name": "setmaxMintAmount",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "index",
          "type": "uint256"
        }
      ],
      "name": "tokenOfOwnerByIndex",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "walletOfOwner",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]
    const STAKINGABI=[
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "claimForAddress",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "contract Collection",
            "name": "_nft",
            "type": "address"
          },
          {
            "internalType": "contract N2DRewards",
            "name": "_token",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Claimed",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "NFTStaked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "NFTUnstaked",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "stake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "unstake",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          }
        ],
        "name": "earningInfo",
        "outputs": [
          {
            "internalType": "uint256[2]",
            "name": "info",
            "type": "uint256[2]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "",
            "type": "bytes"
          }
        ],
        "name": "onERC721Received",
        "outputs": [
          {
            "internalType": "bytes4",
            "name": "",
            "type": "bytes4"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "tokensOfOwner",
        "outputs": [
          {
            "internalType": "uint256[]",
            "name": "ownerTokens",
            "type": "uint256[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalStaked",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "vault",
        "outputs": [
          {
            "internalType": "uint24",
            "name": "tokenId",
            "type": "uint24"
          },
          {
            "internalType": "uint48",
            "name": "timestamp",
            "type": "uint48"
          },
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
    const addresses = ["0x1C62f0Ccf370A3dF1A665600ea836AB4Cf8398F2","0xC3527DFAEa92fd4100A10EeC41B61D84D20007C7","0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097","0x22D31DEB23bC1c7afCE2D2E35dC7D84c069086dD",]
    const keccak256 = require('keccak256')
    const { MerkleTree } = require('merkletreejs')
    const leaves = addresses.map(x => keccak256(x))
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
const buf2hex = x => '0x' + x.toString('hex')
var account= null;
var contract = null;
var vaultcontract= null;
      const NFTContract="0x3ECF3906d2C71FD6B1086d80e57405A6BA945ef5";
      const STAKINGCONTRACT="0x05083c935c81638Ccaf90aE0B55952370Da1CA7A";
  const providerOptions = {
    binancechainwallet: {
      package: true
      },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "765d4237ce7e4d999f706854d5b66fdc"
      }
      },
      walletlink: {
      package: WalletLink, 
      options: {
        appName: "Net2Dev NFT Minter", 
        infuraId: "765d4237ce7e4d999f706854d5b66fdc", 
        rpc: "", 
        chainId: 1, 
        appLogoUrl: null, 
        darkMode: true 
      }
      },
  };
  
  const web3Modal = new Web3Modal({
    network: "rinkeby",
    theme: "dark",
    cacheProvider: true,
    providerOptions 
  });
  
  
  async function connectwallet() { 
      var provider = await web3Modal.connect();
        var web3 = new Web3(provider); 
        await provider.send('eth_requestAccounts'); 
        var accounts = await web3.eth.getAccounts(); 
        account = accounts[0]; 
        contract = new web3.eth.Contract(COLLECTIONABI, NFTContract);
        vaultcontract = new web3.eth.Contract(STAKINGABI, STAKINGCONTRACT);
      }
  
async function mint() {
  const leaf= keccak256(account)
const proof = tree.getProof(leaf).map(x => buf2hex (x.data))              
  var _mintAmount = Number(document.querySelector("[name=amount]").value); 
                var mintRate = Number(await contract.methods.cost().call()); 
                var totalAmount = mintRate * _mintAmount; 
              contract.methods.mint(account, _mintAmount, proof).send({ from: account, value: String(totalAmount) }); 
            } 
            async function enable() {
              contract.methods.setApprovalForAll(STAKINGCONTRACT, true).send({from: account});
            }
            async function claimit() {
              var tokenids = Number(document.querySelector("#stkid").value);
              vaultcontract.methods.claim([tokenids]).send({from: account});
            }
            
            async function verify() {
              var getbalance = Number(await vaultcontract.methods.balanceOf(account).call());
              document.getElementById('stakedbalance').textContent = getbalance; 
            }
            async function rewardinfo() {
              var tokenid = Number(document.querySelector("#stkid").value);
              var rawearn = await vaultcontract.methods.earningInfo(([tokenid])).call();
              var earned =  String(rawearn).split(",")[0];
              var earnedrwd = Web3.utils.fromWei(earned);
              var rewards = Number(earnedrwd).toFixed(2);
              document.getElementById('earned').textContent = rewards;
              }
            async function stakeit() {
              var tokenids = Number(document.querySelector("#stkid").value);
              vaultcontract.methods.stake([tokenids]).send({from: account});
            }
            
            async function unstakeit() {
              var tokenids = Number(document.querySelector("#stkid").value);
              vaultcontract.methods.unstake([tokenids]).send({from: account});
            }
            const styles={
              container:{
                backgroundImage:"url(/image.png)",
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh'
              },
              stakingmenu:{
                position:'relative',
                left: '410px',
                top: '330px'
              },

            };

    return(
        <div className={styles.main}>
          <div style={styles.container}>
          <div className="container">
              <div className="navbar-brand">
                  <h1 className="is-size-2 has-text-centered has-text-weight=bold is-family-sans-serif">🚀NFT Staking</h1>
              </div>
              <div className="navbar-end">
                 
                   <button onClick={connectwallet} className="button is-primary">
                      Connect Wallet</button>        
                  </div>
          </div>
      <section>
          <div className="container">
          <input type="number" name="amount" defaultValue="1" min="1" max="5"/>
          <button onClick={mint} className="button is-dark is-small">AIRDROP Mint</button>
          </div>
      </section>
    <section>
    {/*<div class="columns is-centered">
    <button onClick={verify}>Check NFT'S Staked</button>
    <div class="is-pulled-right" id='stakedbalance' style={{marginTop:"5px",color:"#39FF14",fontWeight:"bold",textShadow:"1px 1px 2px #000000", fontSize:"35px" }}/>
    </div>
    */}
          <div class="columns is-centered mt-6 pt-6">
            <div class="mt-6 pt-6">
            <div class="mt-6 pt-6">
            <div class="mt-5 pt-5 ml-3">
        <div className="card-bottom d-flex justify-content-between">
            <div className='container'>
            </div>
          <div class="colums is-centered">
          <div id='earned' style={{color: "#39FF14",marginTop:"5px", fontSize:'25px',fontWeight:'bold',textShadow:"1px 1px 2px #000000", width:"160px", margin:"auto"}}><p style={{fontSize:"20px"}}>💰Earned Tokens</p></div>
              <input type="number" className='input is-large is-desktop' id='stkid' style={{width: "1530px"}}/>
            <button className="button is-large is-dark is-desktop"   style={{marginLeft:'1px', marginRight:'1px'}} onClick={enable}>Enable Staking</button>
							<button className="button is-large is-dark is-desktop" style={{marginLeft:'1px', marginRight:'1px'}} onClick={stakeit}>Stake it</button>
							<button className="button is-large is-dark is-desktop" style={{marginLeft:'1x', marginRight:'1px'}} onClick={unstakeit}>Unstake it</button>
              <button className="button is-large is-dark is-desktop" style={{marginLeft:'1px', marginRight:'1px'}} onClick={claimit}>Claim it</button>              
              <button className="button is-large is-dark is-desktop" style={{marginLeft:'1px', marginRight:'1px'}} onClick={rewardinfo}> Earned N2D Rewards</button>
              </div>
                </div>
                 </div>
                 </div>
                 </div>
                 </div>
      </section>
      </div>
      </div>

    )
}
export default App;
