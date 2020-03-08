var length;
var currentScore;
var advice;
var companies;
var scoreboard;
// Account #1 - GA2JSEGSJAREL7RYEZ4CU4Y4QB24CW7QFXBOWFLF5NMGJLJNY2IJ2Y6V
// SCHB52IVRHQT5YIVL6GTI5ZXKQG7HIK4SOQIQUCR6FKRRALNS5ZQQVGH

// Account #2 - GAECLRZZHNCTVIIXHVKQLGXITMFZWAYRCSXV3JKNINCWVFHXP4DKZMRV
// SCINDXGLYIA7WHZEUT5O4YUKH67YUQUZADJPPYB52556BO2A7P25VKSQ

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

server.loadAccount(destinationId,numberOfLumens)
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
        amount: numberOfLumens
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
$.when($.getJSON("http://localhost:3001/carbon")).then(function(data){
    length = data.length;
    $.when($.get("http:localhost:3001/carbon/"+length)).then(function(data){
        currentScore = data.score
        advice = data.advice;
        companies = data.companies;
        
        console.log(data);
        if(currentScore < 6000){
            $("#score").html("<h2 style='color:green;'>Score: "+currentScore +"lbs of CO2</h2>")
        }else if(currentScore > 6000 && currentScore < 7500){
            $("#score").html("<h2 style='color:#9B870C;'>Score: "+currentScore +"lbs of CO2</h2>")
        }else if(currentScore > 7500){
            $("#score").html("<h2 style='color:red;'>Score: "+currentScore +"lbs of CO2</h2>")
        }
        for(var i =0; i< advice.length; i++){
            $("#advice").append("<li>"+advice[i]+"</li>")
        }
        for(var i =0; i< companies.length; i++){
            $("#companies").append("<li>"+companies[i]+"</li>")
        }
    })

})
$.when($.get("http:localhost:3001/carbon")).then(function(data){
    for(var i =0; i< data.length; i++){
        console.log(data[i].name);
        $("#leaders").append(
            "<tr><td>"+data[i].name+"</td><td>"+
            data[i].score+"</td><td>"+
			"<img class='challenge' src='images/challenge.png' style='margin-left:20px; position:center; height:30px;'/>"+
            "</tr>"
        )

    }   
    $(".challenge").click(function(){
        alert("Challenge Initiated");
        var address = prompt("Enter address");
        alert("You are now challenging this user");
        var numberOfLumens = prompt("How many lumens are you betting");
        alert('Success');
        main();
    }); 
})




