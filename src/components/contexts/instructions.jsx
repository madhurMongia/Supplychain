import React from "react";

export function Instructions(){

    return(
        <div style = {{
        top:"0",
        left:"0",
        bottom:"0",
        right:"0",
        height:"100vh",
        width:"100%",
        display:"flex",
        justiftyContent:"center",
        background: "#5cdb95"}}>
            <div style = {{
                marginTop:"200px",
                color:"#05386B",
            }}>
                <h1>Your browser is not connected to the blockchain follow given steps:</h1>
                <ul style = {{
                    fontSize: "20px",
                    display: "grid",
                    gap:"5px"
                }}>
                    <li>
                        Download MetaMask extension from your browser's extension store.
                    </li>
                    <li>
                        setup Account and switch to kovan testnet from ethereum mainnet.
                    </li>
                    <li>
                        browse to https://faucet.kovan.network/ and request test ETH.
                    </li>
                    <li>
                        refresh the page and enjoy!!!.
                    </li>
                </ul>
            </div>
        </div>
    )
}