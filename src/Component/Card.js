import css from "./Card.css";
import {ethers} from "ethers";
import ABI from "./ABI.json";
import tokenABI from "./tokenABI.json";
import { useState, useEffect } from "react";

function Card(props) {

    const [Bought, setBought] = useState(false);

    const checkBought = async () => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
     const signer = provider.getSigner();
     const currentAddress = await provider.getSigner().getAddress();
     const marketplaceContract = new ethers.Contract("0x1D155887DaB5a8E9741edCE201eD90fea8065318", ABI, signer);
     const bought = await marketplaceContract.alreadyBought(currentAddress);
     setBought(bought);
     console.log("Bought Value", bought);
    }


    const Connect = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts");
        console.log("Trying to connect");
    }

    const payInETH = async () => {
        await Connect();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const currentAddress = await provider.getSigner().getAddress();
        const marketplaceAddress = "0x1D155887DaB5a8E9741edCE201eD90fea8065318";
        const marketplaceContract = new ethers.Contract(marketplaceAddress, ABI, signer);
        const amount = await provider.getBalance(currentAddress);
        const formatted = ethers.utils.formatEther(amount);
        console.log(formatted);

        const price = await marketplaceContract.getCurrentPriceOfETH();
        
        console.log(ethers.utils.formatEther(price));
        console.log(ethers.utils.formatEther(amount));

        if (ethers.utils.formatEther(amount) >= ethers.utils.formatEther(price)) {
            console.log("trying to buy");
            //they can buy
            const pay = await marketplaceContract.payInETH({ value: price });
            console.log(pay);
            const receipt = await pay.wait();
            if (receipt.confirmations > 0) {
                setBought(pay);
                console.log(pay);
            }
            
        } else {
            console.log("Not enough eth" + amount + ":" + price);
            //they can't buy
        }

        

    }
      

    const payInUSDC = async () => {
        console.log("payInUSDC function called");
        await Connect();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const currentAddress = await provider.getSigner().getAddress();
        const marketplaceAddress = "0x1D155887DaB5a8E9741edCE201eD90fea8065318";
        const marketplaceContract = new ethers.Contract(marketplaceAddress, ABI, signer);
        const token = new ethers.Contract("0x62285CE5d4786D54aE0e60ef3a17e43549BEd9e5", tokenABI, signer);

        const totalAmount = await token.balanceOf(currentAddress);
        const totalAllowed = await token.allowance(currentAddress, marketplaceAddress);

        const price = await marketplaceContract.price();

        console.log("TOTAL:" + totalAmount)
        console.log("ALLOWED:" + totalAllowed)
        console.log("Price" + price);

        if (price <= totalAmount) {
            //They have enough to buy
            if (price <= totalAllowed) {
                //they can buy
                const purchase = await marketplaceContract.payInUSDC();
                console.log("Purchase value:", purchase);
                setBought(purchase);
            } else {
                //they have enough money, but they need to allow it
                const approve = await token.approve(marketplaceAddress, price);
                console.log("Approval value:", approve);
                const receipt = await approve.wait();
                if (receipt.confirmations > 0) {
                    const purchase = await marketplaceContract.payInUSDC();
                    console.log("Purchase value:", purchase);
                    setBought(purchase);
                }
                
            }
        } else {
            //they don't have enough to buy
        }
    }

    

    useEffect(() => {
        checkBought();
    }, []);

    return (

        <div className="card">
            <div class="card__image-container">
                <img
                    src={props.imageURL}
                    width="400"
                />

            </div>
            <div class="card__content">
                <p class="card__title text--medium">
                    {props.name}
                </p>
                <div class="card__info">
                    <p class="text--medium">{props.description} </p>

                </div>
            
            {Bought === true ?
                <div> 
                    <p class="card__price text__price">
                        <a href="/item1">View Your Product</a></p>
                    </div>
                :
            <div>
                <div>
                    <img onClick={payInUSDC} class="buyIcon" src="https://imgur.com/MQHRBrg.png" ></img>
                    <img onClick={payInUSDC} class="buyIcon" src="https://imgur.com/wndKTZS.png" ></img>
                    <img onClick={payInETH} class="buyIcon" src="https://imgur.com/sQsv7UD.png" ></img>                    
                </div>
                    <div>
                    <p class="card__price text__price">
                        $50</p>
                </div>
            </div>
            }

        </div>
        
        </div>
    );
    }


export default Card;
