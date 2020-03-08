// Parameters: Source account (your ID), vDestination (their account ID), Asset (only can be lumens (XLM)), Amount of lumens (integer)
// Can use testnet server for demos

var StellarSdk = require('stellar-sdk');
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
var sourceKeys = StellarSdk.Keypair.fromSecret('SCZANGBA5YHTNYVVV4C3U252E2B6P6F5T3U6MM63WBSBZATAQI3EBTQ4');
var destinationId = 'GA2C5RFPE6GCKMY3US5PAB6UZLKIGSPIUKSLRB6Q723BM2OARMDUYEJ5';
var transaction;
var accountId = 'GC2BKLYOOYPDEFJKLKY6FNNRQMGFLVHJKQRGNSSRRGSMPGF32LHCQVGF';
var payments = server.payments().forAccount(accountId);
var lastToken = loadLastPagingToken();

const pair = StellarSdk.Keypair.random();
const account = await server.loadAccount(pair.publicKey());


pair.secret();
// SAV76USXIJOBMEQXPANUOQM6F5LIOTLPDIDVRJBFFE2MDJXG24TAPUU7
pair.publicKey();
// GCFXHS4GXL6BVUCXBWXGTITROWLVYXQKQLF4YH5O5JT3YZXCYPAFBJZB

(async function main() {
  try {
    const response = await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
    );
    const responseJSON = await response.json();
    console.log("SUCCESS! You have a new account :)\n", responseJSON);
  } catch (e) {
    console.error("ERROR!", e);
  }
})()

console.log("Balances for account: " + pair.publicKey());
account.balances.forEach(function(balance) {
  console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
});

server.loadAccount(destinationId)
  .catch(function (error) {
    if (error instanceof StellarSdk.NotFoundError) {
      throw new Error('The destination account does not exist!');
    } else return error
  })
  .then(function() {
    return server.loadAccount(sourceKeys.publicKey());
  })
  .then(function(sourceAccount) {
    transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationId,
        asset: StellarSdk.Asset.native(),
        amount: "10"
      }))
      .addMemo(StellarSdk.Memo.text('Test Transaction'))
      .setTimeout(180)
      .build();
    transaction.sign(sourceKeys);
    return server.submitTransaction(transaction);
  })
  .then(function(result) {
    console.log('Success! Results:', result);
  })
  .catch(function(error) {
    console.error('Something went wrong!', error);
  });
  
if (lastToken) {
  payments.cursor(lastToken);
}

payments.stream({
  onmessage: function(payment) {
    savePagingToken(payment.paging_token);

    if (payment.to !== accountId) {
      return;
    }

    var asset;
    if (payment.asset_type === 'native') {
      asset = 'lumens';
    }
    else {
      asset = payment.asset_code + ':' + payment.asset_issuer;
    }

    console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
  },

  onerror: function(error) {
    console.error('Error in payment stream');
  }
});

function savePagingToken(token) {
}

function loadLastPagingToken() {
}