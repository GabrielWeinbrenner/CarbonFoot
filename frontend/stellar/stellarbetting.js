// Parameters: Source account (your ID), Destination (their account ID), Asset (only can be lumens (XLM)), Amount of lumens (integer)
// Can use testnet server for demos

const StellarSdk = require('stellar-sdk');
const sourceSecretKey = 'SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4';
const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
const sourcePublicKey = sourceKeypair.publicKey();
const receiverPublicKey = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const pair = StellarSdk.Keypair.random();

pair.secret();
// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
pair.publicKey();
// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB

(async function main() {
  const account = await server.loadAccount(sourcePublicKey);
  const fee = await server.fetchBaseFee();
  const transaction = new StellarSdk.TransactionBuilder(account, { 
      fee,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
    .addOperation(StellarSdk.Operation.payment({
      destination: receiverPublicKey,
      // The term native asset refers to lumens
      asset: StellarSdk.Asset.native(),
      amount: '350.1234567',
    }))
    .setTimeout(30)
    .addMemo(StellarSdk.Memo.text('This is a Carbon Footprint challenge!'))
    .build();

  transaction.sign(sourceKeypair);

  console.log(transaction.toEnvelope().toXDR('base64'));

  try {
    const transactionResult = await server.submitTransaction(transaction);
    console.log(JSON.stringify(transactionResult, null, 2));
    console.log('\nSuccess! View the transaction at: ');
    console.log(transactionResult._links.transaction.href);
  } catch (e) {
    console.log('An error has occured:');
    console.log(e);
  }
})();