const StellarSdk = require('stellar-sdk');
const sourceSecretKey = 'SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4';
const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecretKey);
const sourcePublicKey = sourceKeypair.publicKey();
const receiverPublicKey = 'GAIRISXKPLOWZBMFRPU5XRGUUX3VMA3ZEWKBM5MSNRU3CHV6P4PYZ74D';
const server = new StellarSdk.Server('https://horizon-public.stellar.org');

(async function main() {
  const account = await server.loadAccount(sourcePublicKey);
  const fee = await server.fetchBaseFee();
  const transaction = new StellarSdk.TransactionBuilder(account, { 
      fee,
      networkPassphrase: StellarSdk.Networks.PUBLIC,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
    .addOperation(StellarSdk.Operation.payment({
      destination: receiverPublicKey,
      // The term native asset refers to lumens
      asset: StellarSdk.Asset.native(),
      // Specify 350.1234567 lumens. Lumens are divisible to seven digits past
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