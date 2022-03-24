   // Uncomment on local
//         let city = 'Álava'
        let city = window.city;

        // Uncomment on live site
//         let shitCoinsUrl = new URL('http://shitcoins.club/atms/getAtmsData');
        //let city = '{{wf {&quot;path&quot;:&quot;test-town:name&quot;,&quot;type&quot;:&quot;PlainText&quot;\} }}';
        console.log('city');
        console.log(city);

        let funds = '';
        let isEnabled = 'offline';

        let bitcoin_buy_price = 0;
        let bitcoin_buy_flat_fee = 0;
        let bitcoin_sell_price = 0;
        let bitcoin_sell_flat_fee = 0;
        let buyBitcoinHeader = '';
        let buyBitcoinParagraph = "";
        let sellBitcoinParagraph = "";

        let ethereum_buy_price = 0;
        let ethereum_buy_flat_fee = 0;
        let ethereum_sell_price = 0;
        let ethereum_sell_flat_fee = 0;
        let buyEthHeader = '';
        let buyEthParagraph = "";
        let sellEthParagraph = "";

        let litecoin_buy_price = 0;
        let litecoin_buy_flat_fee = 0;
        let litecoin_sell_price = 0;
        let litecoin_sell_flat_fee = 0;
        let buyLitecoinHeader = '';
        let buyLitecoinParagraph = "";
        let sellLitecoinParagraph = "";

        let Tether_buy_price = 0;
        let Tether_buy_flat_fee = 0;
        let Tether_sell_price = 0;
        let Tether_sell_flat_fee = 0;
        let buyTetherHeader = '';
        let buyTetherParagraph = "";
        let sellTetherParagraph = "";

        let tron_buy_price = 0;
        let tron_buy_flat_fee = 0;
        let tron_sell_price = 0;
        let tron_sell_flat_fee = 0;
        let buyTronHeader = '';
        let buyTronParagraph = "";
        let sellTronParagraph = "";

        function getAtmsData() {
            axios.get('https://commercialsalesview.io/api/atms/getAtmsData')
                .then(function (response) {
                    const atmData = response.data;
                    const townData = atmData.find((data) => {
                        return data.location.city === city;
                    })
                    console.log('townData');
                    console.log(townData);
                    if (!townData) {
                        return;
                    }
                    if (townData.balances.PLN) {
                        funds = `${townData.balances.PLN} PLN`;
                    }
                    if (townData.is_enabled) {
                        isEnabled = 'online';
                    }
                    if (townData.prices.bitcoin_buy_price) {
                        bitcoin_buy_price = townData.prices.bitcoin_buy_price;
                        buyBitcoinHeader = `Buy for ${bitcoin_buy_price} PLN`;
                        // bitcoin_buy_flat_fee = 10;
                        bitcoin_buy_flat_fee = townData.prices.bitcoin_buy_flat_fee;
                        if (bitcoin_buy_flat_fee < 1) {
                            document.getElementById("buy-bitcoin-header-discount").innerText = '(Discount for buying)';
                        }
                        let bitcoin_buy_price_one_thousandth = bitcoin_buy_price / 1000;
                        let bitcoin_buy_price_one_thousandth_after_fee = (((bitcoin_buy_flat_fee / 100) * bitcoin_buy_price_one_thousandth) + bitcoin_buy_price_one_thousandth).toFixed(10);
                        buyBitcoinParagraph = `Today price at Coinmarketcap for 0,001 BTC is ${bitcoin_buy_price_one_thousandth} PLN. For 0,001 BTC, you will pay ${bitcoin_buy_price_one_thousandth_after_fee} PLN at the ATM, because the fee is ${bitcoin_buy_flat_fee}%. It is an attractive price, considering it is a quick, anonymous and fast way to trade crypto. The average buy fee in the world is 7% at ATMs (source here), which means this ATM offers the most attractive price from all ATMs in the world right now.`;

                        bitcoin_sell_price = townData.prices.bitcoin_sell_price;
                        bitcoin_sell_flat_fee = townData.prices.bitcoin_sell_flat_fee;
                        // bitcoin_sell_flat_fee = 10;
                        let bitcoin_sell_price_one_thousandth = bitcoin_sell_price / 1000;
                        let bitcoin_sell_price_one_thousandth_after_fee = (bitcoin_sell_price_one_thousandth - ((bitcoin_sell_flat_fee / 100) * bitcoin_sell_price_one_thousandth)).toFixed(10);
                        sellBitcoinParagraph = `At this ATM, you will sell crypto at ${bitcoin_sell_price_one_thousandth_after_fee} PLN as it has ${bitcoin_sell_flat_fee}% fee. It is an attractive offer considering the average sell fee in the world is 8%. Selling 0,001 BTC will grant you ${bitcoin_sell_price_one_thousandth_after_fee} PLN.`;
                    }
                    if (townData.prices.ethereum_buy_price) {
                        ethereum_buy_price = townData.prices.ethereum_buy_price
                        buyEthHeader = `${ethereum_buy_price} zł`;

                        ethereum_buy_flat_fee = townData.prices.ethereum_buy_flat_fee;
                        // ethereum_buy_flat_fee = 10;
                        if (ethereum_buy_flat_fee < 1) {
                            document.getElementById("buy-eth-header-discount").innerText = '(Discount for buying)';
                        }
                        let ethereum_buy_price_one_thousandth = ethereum_buy_price / 1000;
                        let ethereum_buy_price_one_thousandth_after_fee = (((ethereum_buy_flat_fee / 100) * ethereum_buy_price_one_thousandth) + ethereum_buy_price_one_thousandth).toFixed(10);
                        buyEthParagraph = `Today price at Coinmarketcap for 0,001 ETH is ${ethereum_buy_price_one_thousandth} PLN. For 0,001 ETH, you will pay ${ethereum_buy_price_one_thousandth_after_fee} PLN at the ATM, because the fee is ${ethereum_buy_flat_fee}%. It is an attractive price, considering it is a quick, anonymous and fast way to trade crypto. The average buy fee in the world is 7% at ATMs (source here), which means this ATM offers the most attractive price from all ATMs in the world right now.`;

                        ethereum_sell_price = townData.prices.ethereum_sell_price;
                        ethereum_sell_flat_fee = townData.prices.ethereum_sell_flat_fee;
                        // ethereum_sell_flat_fee = 10;
                        let ethereum_sell_price_one_thousandth = ethereum_sell_price / 1000;
                        let ethereum_sell_price_one_thousandth_after_fee = (ethereum_sell_price_one_thousandth - ((ethereum_sell_flat_fee / 100) * ethereum_sell_price_one_thousandth)).toFixed(10);
                        sellEthParagraph = `At this ATM, you will sell crypto at ${ethereum_sell_price_one_thousandth_after_fee} PLN as it has ${ethereum_sell_flat_fee}% fee. It is an attractive offer considering the average sell fee in the world is 8%. Selling 0,001 ETH will grant you ${ethereum_sell_price_one_thousandth_after_fee} PLN.`;
                    }
                    if (townData.prices.litecoin_buy_price) {
                        const litecoin_buy_price = townData.prices.litecoin_buy_price
                        buyLitecoinHeader = `${litecoin_buy_price} zł`;

                        litecoin_buy_flat_fee = townData.prices.litecoin_buy_flat_fee;
                        // litecoin_buy_flat_fee = 10;
                        if (litecoin_buy_flat_fee < 1) {
                            document.getElementById("buy-litecoin-header-discount").innerText = '(Discount for buying)';
                        }
                        let litecoin_buy_price_one_thousandth = litecoin_buy_price / 1000;
                        let litecoin_buy_price_one_thousandth_after_fee = (((litecoin_buy_flat_fee / 100) * litecoin_buy_price_one_thousandth) + litecoin_buy_price_one_thousandth).toFixed(10);
                        buyLitecoinParagraph = `Today price at Coinmarketcap for 0,001 Litecoin is ${litecoin_buy_price_one_thousandth} PLN. For 0,001 Litecoin, you will pay ${litecoin_buy_price_one_thousandth_after_fee} PLN at the ATM, because the fee is ${litecoin_buy_flat_fee}%. It is an attractive price, considering it is a quick, anonymous and fast way to trade crypto. The average buy fee in the world is 7% at ATMs (source here), which means this ATM offers the most attractive price from all ATMs in the world right now.`;

                        litecoin_sell_price = townData.prices.litecoin_sell_price;
                        litecoin_sell_flat_fee = townData.prices.litecoin_sell_flat_fee;
                        // litecoin_sell_flat_fee = 10;
                        let litecoin_sell_price_one_thousandth = litecoin_sell_price / 1000;
                        let litecoin_sell_price_one_thousandth_after_fee = (litecoin_sell_price_one_thousandth - ((litecoin_sell_flat_fee / 100) * litecoin_sell_price_one_thousandth)).toFixed(10);
                        sellLitecoinParagraph = `At this ATM, you will sell crypto at ${litecoin_sell_price_one_thousandth_after_fee} PLN as it has ${litecoin_sell_flat_fee}% fee. It is an attractive offer considering the average sell fee in the world is 8%. Selling 0,001 Litecoin will grant you ${litecoin_sell_price_one_thousandth_after_fee} PLN.`;
                    }
                    if (townData.prices.Tether_buy_price) {
                        Tether_buy_price = townData.prices.Tether_buy_price
                        buyTetherHeader = `${Tether_buy_price} zł`;

                        Tether_buy_flat_fee = townData.prices.Tether_buy_flat_fee;
                        // Tether_buy_flat_fee = 10;
                        if (Tether_buy_flat_fee < 1) {
                            document.getElementById("buy-tether-header-discount").innerText = '(Discount for buying)';
                        }
                        let tether_buy_price_one_thousandth = Tether_buy_price / 1000;
                        let tether_buy_price_one_thousandth_after_fee = (((Tether_buy_flat_fee / 100) * tether_buy_price_one_thousandth) + tether_buy_price_one_thousandth).toFixed(10);
                        buyTetherParagraph = `Today price at Coinmarketcap for 0,001 Tether is ${tether_buy_price_one_thousandth} PLN. For 0,001 Tether, you will pay ${tether_buy_price_one_thousandth_after_fee} PLN at the ATM, because the fee is ${Tether_buy_flat_fee}%. It is an attractive price, considering it is a quick, anonymous and fast way to trade crypto. The average buy fee in the world is 7% at ATMs (source here), which means this ATM offers the most attractive price from all ATMs in the world right now.`;

                        Tether_sell_price = townData.prices.Tether_sell_price;
                        // Tether_sell_flat_fee = townData.prices.Tether_sell_flat_fee;
                        Tether_sell_flat_fee = 10;
                        let tether_sell_price_one_thousandth = Tether_sell_price / 1000;
                        let tether_sell_price_one_thousandth_after_fee = (tether_sell_price_one_thousandth - ((Tether_sell_flat_fee / 100) * tether_sell_price_one_thousandth)).toFixed(10);
                        sellTetherParagraph = `At this ATM, you will sell crypto at ${tether_sell_price_one_thousandth_after_fee} PLN as it has ${Tether_sell_flat_fee}% fee. It is an attractive offer considering the average sell fee in the world is 8%. Selling 0,001 Tether will grant you ${tether_sell_price_one_thousandth_after_fee} PLN.`;
                    }
                    if (townData.prices.tron_buy_price) {
                        tron_buy_price = townData.prices.tron_buy_price
                        buyTronHeader = `${tron_buy_price} zł`;

                        tron_buy_flat_fee = townData.prices.tron_buy_flat_fee;
                        // tron_buy_flat_fee = 10;
                        if (tron_buy_flat_fee < 1) {
                            document.getElementById("buy-tron-header-discount").innerText = '(Discount for buying)';
                        }
                        let tron_buy_price_one_thousandth = tron_buy_price / 1000;
                        let tron_buy_price_one_thousandth_after_fee = (((tron_buy_flat_fee / 100) * tron_buy_price_one_thousandth) + tron_buy_price_one_thousandth).toFixed(10);
                        buyTronParagraph = `Today price at Coinmarketcap for 0,001 Tron is ${tron_buy_price_one_thousandth} PLN. For 0,001 Tron, you will pay ${tron_buy_price_one_thousandth_after_fee} PLN at the ATM, because the fee is ${tron_buy_flat_fee}%. It is an attractive price, considering it is a quick, anonymous and fast way to trade crypto. The average buy fee in the world is 7% at ATMs (source here), which means this ATM offers the most attractive price from all ATMs in the world right now.`;

                        tron_sell_price = townData.prices.tron_sell_price;
                        tron_sell_flat_fee = townData.prices.tron_sell_flat_fee;
                        // tron_sell_flat_fee = 10;
                        let tron_sell_price_one_thousandth = tron_sell_price / 1000;
                        let tron_sell_price_one_thousandth_after_fee = (tron_sell_price_one_thousandth - ((tron_sell_flat_fee / 100) * tron_sell_price_one_thousandth)).toFixed(10);
                        sellTronParagraph = `At this ATM, you will sell crypto at ${tron_sell_price_one_thousandth_after_fee} PLN as it has ${tron_sell_flat_fee}% fee. It is an attractive offer considering the average sell fee in the world is 8%. Selling 0,001 Tron will grant you ${tron_sell_price_one_thousandth_after_fee} PLN.`;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    document.getElementById("funds-paragraph").innerText = funds;
                    document.getElementById("is-enabled-paragraph").innerText = isEnabled;

                    document.getElementById("buy-bitcoin-header").innerText = buyBitcoinHeader;
                    document.getElementById("buy-bitcoin-paragraph").innerText = buyBitcoinParagraph;
                    document.getElementById("sell-bitcoin-paragraph").innerText = sellBitcoinParagraph;

                    document.getElementById("buy-eth-header").innerText = buyEthHeader;
                    document.getElementById("buy-eth-paragraph").innerText = buyEthParagraph;
                    document.getElementById("sell-eth-paragraph").innerText = sellEthParagraph;

                    document.getElementById("buy-litecoin-header").innerText = buyLitecoinHeader;
                    document.getElementById("buy-litecoin-paragraph").innerText = buyLitecoinParagraph;
                    document.getElementById("sell-litecoin-paragraph").innerText = sellLitecoinParagraph;

                    document.getElementById("buy-tether-header").innerText = buyTetherHeader;
                    document.getElementById("buy-tether-paragraph").innerText = buyTetherParagraph;
                    document.getElementById("sell-tether-paragraph").innerText = sellTetherParagraph;

                    document.getElementById("buy-tron-header").innerText = buyTronHeader;
                    document.getElementById("buy-tron-paragraph").innerText = buyTronParagraph;
                    document.getElementById("sell-tron-paragraph").innerText = sellTronParagraph;
                });
        }
        (function () {
            getAtmsData();
        })();
