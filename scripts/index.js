// Object chứng khoán

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

function technical_signals (req) {
    this.code = req.code || "";
    this.tradingDate = req.tradingTime || "";
    this.time = req.time || "";
    this.strategy = req.strategy || "";
    this.totalSignal = req.totalSignal || "";
    this.indicators = req.indicators || [];
}

function index (req) {
    this.code = req.code || "";
    this.name = req.name || "";
    this.type = req.type || "";
    this.period = req.period || "";
    this.price = req.price.toFixed(2) || 0;
    this.change = req.change.toFixed(2) || 0;
    this.changePct = req.changePct.toFixed(2) || 0;
}

/*
** CONSTANT
*/

var VNDIRECT_API_STOCK_PRICES = "https://finfo-api.vndirect.com.vn/v4/stock_prices/";
var VNDIRECT_API_TECHNICAL_SIGNALS = "https://finfo-api.vndirect.com.vn/v4/technical_signals/";
var VNDIRECT_API_INDEX = "https://finfo-api.vndirect.com.vn/v4/change_prices/";

/*
** Chạy sau khi render
*/
window.onload = function() {
    // GET REQUEST: Thong tin Index
    document.querySelectorAll(".index").forEach(function(item, i) {
        var symbol = ( item ).id;
        var request = new XMLHttpRequest();
        request.open(
            'GET',
            `${VNDIRECT_API_INDEX}?q=code:${symbol}~period:1D`,
            true
        );

        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            var result = JSON.parse(this.response);
            if (result.totalElements > 0){
                    let t = new index(result.data[0]);

                    document.querySelectorAll(`.${symbol}.period`)[0].innerHTML = `${t.period || "N/A"}`;
                    document.querySelectorAll(`.${symbol}.price`)[0].innerHTML = `${t.price || "N/A"}`;
                    document.querySelectorAll(`.${symbol}.change`)[0].innerHTML = `${t.change || "N/A"}`;
                    document.querySelectorAll(`.${symbol}.changePct`)[0].innerHTML = `${t.changePct|| "N/A"}%`;

                    if (true)
                    {
                        document.querySelectorAll(`.${symbol}.changePct`)[0].style.background = 'orange';
                    }

                    // Index giảm
                    if (parseFloat(t.changePct) < 0){
                        document.querySelectorAll(`.${symbol}.changePct`)[0].style.background = 'red';
                    }

                    // Index tăng
                    if (parseFloat(t.changePct) > 0){
                        document.querySelectorAll(`.${symbol}.changePct`)[0].style.background = 'lime';
                    } 

                }
          } else {
            // We reached our target server, but it returned an error
          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();
    });

    //GET REQUEST: Thong tin co phieu
    var today = new Date();

    if (today.getDay() == 6) { // Thứ 7
        today.setDate(new Date(today.getDate() - 1));
        document.querySelectorAll(`.date.offset`)[0].innerHTML = `Hôm qua`;
        document.querySelectorAll(`.date.offset`)[0].style.background = 'red';
        document.querySelectorAll(`.date.value`)[0].innerHTML = `${today.toLocaleDateString('en-GB').slice(0, 10)}`;
    } else if (today.getDay() == 0) { // Chủ Nhật
        today.setDate(new Date(today.getDate() - 2));
        document.querySelectorAll(`.date.offset`)[0].innerHTML = `Hôm kia`;
        document.querySelectorAll(`.date.offset`)[0].style.background = 'red';
        document.querySelectorAll(`.date.value`)[0].innerHTML = `${today.toLocaleDateString('en-GB').slice(0, 10)}`;
    } else {
        document.querySelectorAll(`.date.offset`)[0].innerHTML = `Hôm nay`;
        document.querySelectorAll(`.date.value`)[0].innerHTML = `${today.toLocaleDateString('en-GB').slice(0, 10)}`;
    }

    if (true) {
        var time = today.toLocaleTimeString('en-GB');
        $(`.time.value`).html(`${time}`);
        $(`.time.offset`).css('background', 'lime')
        if ((time < "09:00:00")||(time > "15:00:00")){
            $(`.time.offset`).html(`Chưa mở`);
            $(`.time.offset`).css('background', 'red');
        } else if ((time >= "09:00:00")&&(time < "09:15:00")){
            $(`.time.offset`).html(`ATO>LO`);
        } else if ((time >= "09:15:00")&&(time < "11:30:00")){
            $(`.time.offset`).html(`Khớp liên tục`);
        } else if ((time >= "11:30:00")&&(time < "13:00:00")){
            $(`.time.offset`).html(`Nghỉ trưa`);
        } else if ((time >= "13:00:00")&&(time < "14:30:00")){
            $(`.time.offset`).html(`Khớp liên tục`);
        } else if ((time >= "14:30:00")&&(time < "14:45:00")){
            $(`.time.offset`).html(`ATC>LO`);
        } else if ((time >= "14:45:00")&&(time < "15:00:00")){
            $(`.time.offset`).html(`PLO`);
        } else if (time >= "15:00:00"){
            $(`.time.offset`).html(`Đóng cửa`);
            $(`.time.offset`).css('background', 'red')
        }
    
    }

    let date = today.toISOString("dd/MM/YYYY").slice(0, 10);
    
    var stockArr = ($(".symbol").map(function(){
        return $(this).attr('id');
    })).get();

    stockArr = $.grep(stockArr, function(el, index) {
        return index === $.inArray(el, stockArr);
    });

    $.each(stockArr, function(index, symbol) {
        // var symbol = ( value ).id;

        // console.log(symbol);

        // GET REQUEST: Thong tin giao dich
        var request = new XMLHttpRequest();
        request.open(
            'GET',
            `${VNDIRECT_API_STOCK_PRICES}?q=code:${symbol}~date:gte:${date}~date:lte:${date}`,
            true
        );

        request.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            var result = JSON.parse(this.response);

            if (result.totalElements > 0){
                let t = new stock_prices(result.data[0]);
                
                $(`.${symbol}.vol`).each(function(index, el) {
                    el.innerHTML = `${(parseInt(t.nmVolume)/1000000).toFixed(2) || 0}M`;
                });
                $(`.${symbol}.close`).each(function(index, el) {
                    el.innerHTML = `${t.adClose || 0}`;
                });
                $(`.${symbol}.pctClose`).each(function(index, el) {
                    el.innerHTML = `${parseFloat(t.pctChange).toFixed(2) || 0}%`;
                });

                if (true)
                {
                    $(`.${symbol}.pctClose`).each(function(index, el) {
                        el.style.background = 'orange';
                    });
                }

                // Giá giảm
                if (parseFloat(t.pctChange) < 0){
                    $(`.${symbol}.pctClose`).each(function(index, el) {
                        el.style.background = 'red';
                    });
                }

                // Giá sàn
                if (
                    ((t.floor == "HOSE" ) && (parseFloat(t.pctChange) < -6.9) ) ||
                    ((t.floor == "HNX" ) && (parseFloat(t.pctChange) < -9.9) ) ||
                    ((t.floor == "UPCOM" ) && (parseFloat(t.pctChange) < -14.9) )
                ) {
                    $(`.${symbol}.pctClose`).each(function(index, el) {
                        el.style.background = 'cyan';
                    });
                }

                // Giá tăng
                if (parseFloat(t.pctChange) > 0){
                    $(`.${symbol}.pctClose`).each(function(index, el) {
                        el.style.background = 'lime';
                    });
                } 

                // Giá trần
                if (
                    ((t.floor == "HOSE" ) && (parseFloat(t.pctChange) > 6.9) ) ||
                    ((t.floor == "HNX" ) && (parseFloat(t.pctChange) > 9.9) ) ||
                    ((t.floor == "UPCOM" ) && (parseFloat(t.pctChange) > 14.9) )
                ) {
                    $(`.${symbol}.pctClose`).each(function(index, el) {
                        el.style.background = 'violet';
                    });
                } 

            }
        } else {
            // We reached our target server, but it returned an error
          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

        request.send();


        // GET REQUEST: Chi bao ky thuat
        var request2 = new XMLHttpRequest();
        var strategy = [ 
            "cipShort", 
            "cipLong"
        ];

        request2.open(
            'GET', 
            `${VNDIRECT_API_TECHNICAL_SIGNALS}?q=strategy:${strategy.join(",")}~code:${symbol}`, 
            true);

        request2.onload = function() {
          if (this.status >= 200 && this.status < 400) {
            // Success!
            var result = JSON.parse(this.response);
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

                    $(`.${symbol}.signal`).each(function(index, el) {
                        el.innerHTML = `<a class="${cipShort_class.join(" ")}">${cipShort}</a> / <a class="${cipLong_class.join(" ")}">${cipLong}</a>`;
                    });
                }
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request2.onerror = function() {
          // There was a connection error of some sort
        };

        request2.send();

    });
};