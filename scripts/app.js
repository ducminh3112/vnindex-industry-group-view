// Object chứng khoán
/*
{
    "data": [
        {
            "code": "ABB",
            "date": "2021-12-03",
            "time": "15:12:01",
            "floor": "UPCOM",
            "type": "STOCK",
            "basicPrice": 22.3,
            "ceilingPrice": 25.6,
            "floorPrice": 19,
            "open": 19.1,
            "high": 22.4,
            "low": 19.1,
            "close": 21.4,
            "average": 21.847,
            "adOpen": 19.1,
            "adHigh": 22.4,
            "adLow": 19.1,
            "adClose": 21.4,
            "adAverage": 21.847,
            "nmVolume": 3213269,
            "nmValue": 70199779200,
            "ptVolume": 0,
            "ptValue": 0,
            "change": -0.9,
            "adChange": -0.9,
            "pctChange": -4.0359
        }
    ],
    "currentPage": 1,
    "size": 20,
    "totalElements": 1,
    "totalPages": 1
}
*/
function stock_prices (req) {
    this.code = req.code || 0;
    this.date = req.date || 0;
    this.time = req.time;
    this.floor = req.floor || "";
    this.type = req.type || "";
    this.basicPrice = req.baiscPrice || 0;
    this.ceilingPrice = req.ceilingPrice || 0;
    this.floorPrice = req.floorPrice || 0;
    this.open = req.open || 0;
    this.high = req.high || 0;
    this.low = req.low || 0;
    this.close = req.close || 0;
    this.average = req.average || 0;
    this.adOpen = req.adOpen || 0;
    this.adHigh = req.adHigh || 0;
    this.adLow = req.adLow || 0;
    this.adClose = req.adClose || 0;
    this.adAverage= req.adAverage || 0;
    this.nmVolume = req.nmVolume || 0;
    this.nmValue = req.nmValue || 0;
    this.ptVolume = req.ptVolume || 0;
    this.ptValue = req.ptValue || 0;
    this.change = req.change || 0;
    this.adChange = req.adChange || 0;
    this.pctChange = req.pctChange || 0;
}

/*
{
    "data": [
        {
            "code": "TNT",
            "tradingDate": "2021-12-09",
            "time": "15:12:03",
            "strategy": "cipShort",
            "totalSignal": "SELL",
            "indicators": [
                {
                    "indicator": "SMA",
                    "period": "5",
                    "indicatorName": "SMA(5)",
                    "signal": "SELL",
                    "latestValue": 19.16
                },
                {
                    "indicator": "EMA",
                    "period": "5",
                    "indicatorName": "EMA(5)",
                    "signal": "SELL",
                    "latestValue": 19.2066
                },
                {
                    "indicator": "SMA",
                    "period": "10",
                    "indicatorName": "SMA(10)",
                    "signal": "SELL",
                    "latestValue": 19.26
                },
                {
                    "indicator": "EMA",
                    "period": "10",
                    "indicatorName": "EMA(10)",
                    "signal": "SELL",
                    "latestValue": 18.8108
                },
                {
                    "indicator": "SMA",
                    "period": "20",
                    "indicatorName": "SMA(20)",
                    "signal": "BUY",
                    "latestValue": 17.5625
                },
                {
                    "indicator": "EMA",
                    "period": "20",
                    "indicatorName": "EMA(20)",
                    "signal": "BUY",
                    "latestValue": 17.4831
                },
                {
                    "indicator": "MACD Histogram",
                    "period": "12,26,9",
                    "indicatorName": "MACD Histogram (12,26,9)",
                    "signal": "SELL",
                    "latestValue": -0.069
                },
                {
                    "indicator": "Ichimoku Kijun",
                    "period": "9,26,52,26",
                    "indicatorName": "Ichimoku Kijun (9,26,52,26)",
                    "signal": "BUY",
                    "latestValue": 16.1
                },
                {
                    "indicator": "Ichimoku Tenkan",
                    "period": "9,26,52,26",
                    "indicatorName": "Ichimoku Tenkan (9,26,52,26)",
                    "signal": "BUY",
                    "latestValue": 19.5
                }
            ]
        }
    ]
}
*/

function technical_signals (req) {
    this.code = req.code || "";
    this.tradingDate = req.tradingTime || "";
    this.time = req.time || "";
    this.strategy = req.strategy || "";
    this.totalSignal = req.totalSignal || "";
    this.indicators = req.indicators || "";
}

/*
** CONSTANT
*/

var VNDIRECT_API_STOCK_PRICES = "https://finfo-api.vndirect.com.vn/v4/stock_prices/";
var VNDIRECT_API_TECHNICAL_SIGNALS = "https://finfo-api.vndirect.com.vn/v4/technical_signals/";

/*
** Chạy sau khi render
*/
window.onload = function() {
    //dom not only ready, but everything is loaded
    $(".symbol").each(function() {
        var symbol = $( this ).attr('id');
        var date = new Date().toISOString().slice(0, 10);
        $.get(
            VNDIRECT_API_STOCK_PRICES,
            {
                q: `code:${symbol}~date:gte:${date}~date:lte:${date}`
            },
            function(result) {
                if (result.totalElements > 0){
                    let t = new stock_prices(result.data[0]);
                    
                    $(`.${symbol}.vol`).html(`${(parseInt(t.nmVolume)/1000000).toFixed(2) || 0}M`);
                    $(`.${symbol}.pVol`).html();
                    $(`.${symbol}.close`).html(`${t.adClose || 0}`);
                    $(`.${symbol}.pctClose`).html(`${parseFloat(t.pctChange).toFixed(2) || 0}%`);

                    if (true)
                    {
                        $(`.${symbol}.pctClose`).css('background', 'orange');
                    }

                    // Giá giảm
                    if (parseFloat(t.pctChange) < 0){
                        $(`.${symbol}.pctClose`).css('background', 'red');
                    }

                    // Giá sàn
                    if (
                        ((t.floor == "HOSE" ) && (parseFloat(t.pctChange) < -6.9) ) ||
                        ((t.floor == "HNX" ) && (parseFloat(t.pctChange) < -9.9) ) ||
                        ((t.floor == "UPCOM" ) && (parseFloat(t.pctChange) < -14.9) )
                    ) {
                        $(`.${symbol}.pctClose`).css('background', 'cyan');
                    }

                    // Giá tăng
                    if (parseFloat(t.pctChange) > 0){
                        $(`.${symbol}.pctClose`).css('background', 'lime');
                    } 

                    // Giá trần
                    if (
                        ((t.floor == "HOSE" ) && (parseFloat(t.pctChange) > 6.9) ) ||
                        ((t.floor == "HNX" ) && (parseFloat(t.pctChange) > 9.9) ) ||
                        ((t.floor == "UPCOM" ) && (parseFloat(t.pctChange) > 14.9) )
                    ) {
                        $(`.${symbol}.pctClose`).css('background', 'violet');
                    } 

                }
            },
            "json"
        );


        var strategy = [ 
            "cipShort", 
            "cipLong"
        ];

        {
            $.get(
                VNDIRECT_API_TECHNICAL_SIGNALS,
                {
                    q: `strategy:${strategy.join(",")}~code:${symbol}`
                },
                function(result) {
                    if (result.totalElements == 2){
                        var cipShort = [];
                        var cipShort_class = [];
                        var cipLong = "";
                        var cipLong_class = [];
                        (result.data).forEach(function (s) {
                            let signal = new technical_signals(s);
                            if (signal.strategy == "cipShort") {
                                cipShort = signal.totalSignal.match(/\b\w/g).join('')
                                if ((cipShort == "S") || (cipShort == "SS")) {
                                    cipShort_class.push("sell");
                                }
                                if ((cipShort == "B") || (cipShort == "SB")) {
                                    cipShort_class.push("buy");
                                }
                                if ((cipShort == "SS") || (cipShort == "SB")) {
                                    cipShort_class.push("strong");
                                }
                            };
                            if (signal.strategy == "cipLong") {
                                cipLong = signal.totalSignal.match(/\b\w/g).join('')
                                if ((cipLong == "S") || (cipLong == "SS")) {
                                    cipLong_class.push("sell");
                                }
                                if ((cipLong == "B") || (cipLong == "SB")) {
                                    cipLong_class.push("buy");
                                }
                                if ((cipLong == "SS") || (cipLong == "SB")) {
                                    cipLong_class.push("strong");
                                }
                            };
                        });

                        $(`.${symbol}.signal`).html(`<a class="${cipShort_class.join(" ")}">${cipShort}</a> / <a class="${cipLong_class.join(" ")}">${cipLong}</a>`);
                    }
                },
                "json"
            );
        }
    });
};