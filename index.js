import { Sdk } from "@peaq-network/sdk";
import { mnemonicGenerate } from "@polkadot/util-crypto";
import * as crypto from "@polkadot/util-crypto"; // for testing
import dotenv from 'dotenv'
dotenv.config()

// WSS URLs for agung runtime chains
const AGUNG_SOLO="wss://wss.agung.peaq.network/";
const AGUNG_PARA="wss://wsspc1-qa.agung.peaq.network";
const MNEMONIC_SEED=process.env.MNEMONIC_SEED;

// generate a mnemonic seed or 'user account', this is passed through some crypto algo(ss58) to create privKey of an account
const generateMnemonicSeed = () => {
  const mnemonicSeed = mnemonicGenerate();
  return mnemonicSeed;
};

const createPeaqDID = async (name, seed) => {

  // initiate instance of SDK and create a connection
  const sdkInstance = await Sdk.createInstance({
    baseUrl: AGUNG_PARA,
    seed
  });

  // create the DID
  const { hash } = await sdkInstance.did.create({
    name,
  });

  // disconect the SDK
  await sdkInstance.disconnect();

  return hash;
};

// Name for the DID
const name = 'DarDarBinks';

// you need to have balance with this seed. 
// const mnemonicSeed = generateMnemonicSeed(); // Commented out because we have a generated and funded seed already.
const mnemonicSeed = MNEMONIC_SEED;

// before creating your DID, you should have some // balance in your generated seed. 
createPeaqDID(name, mnemonicSeed)
  .then((hash) => {
    console.log(`Created Peaq DID: ${hash}`);
  })
  .catch((error) => {
    console.error(`Error creating Peaq DID: ${error}`);
  });

// PeaqDid for DarDarBinks 0x75a23a9ee9e62e13dee12a89682054de122f87275982e35e1e6c3d091b261a31
// PeaqDid for DarthDarBinks 0x71c5cf6c129e3b9e18a2500e7003f75257b9f30ecda4431d49496e66b19a62b0