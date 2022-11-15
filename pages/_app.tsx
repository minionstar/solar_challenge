import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { infuraProvider } from "wagmi/providers/infura";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const fantomOpera: Chain = {
  id: 250,
  name: "Fantom Opera",
  network: "Fantom",
  nativeCurrency: { name: "Fantom", symbol: "FTM", decimals: 18 },
  rpcUrls: { default: "https://rpc.ftm.tools" },
  blockExplorers: {
    default: {
      name: "FTMScan",
      url: "https://ftmscan.com",
    },
  },
  testnet: false,
};

const { chains, provider, webSocketProvider } = configureChains(
  [fantomOpera],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== fantomOpera.id) return null
        return { http: chain.rpcUrls.default }
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
