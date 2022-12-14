import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useContractRead, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { abi } from "./abi";
import { BigNumber, ethers } from "ethers";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [amount, setAmount] = useState(0);

  let value: any = 0;
  const result = useContractRead({
    address: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
    abi: abi,
    functionName: "balanceOf",
    args: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75'],
  });
  if (result?.data) {
    value = ethers.utils.formatUnits(BigNumber.from(result?.data), 6);
  }

  useEffect(() => {
    setAmount(value);
  }, [value]);

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ConnectButton showBalance={true} />
        <div> USDC Balance : {amount} </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" target="_blank" rel="noopener noreferrer">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
