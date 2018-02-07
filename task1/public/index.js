$(function () {
   $.ajax({
       type:"GET",
       url:"/getData?&from=北京&to=上海&date=02-06",
       dataType:"json",
       success:function (data) {
           renderDateList(data.dateList);
           renderFlightList(data.flightList);
       }
   })
});
function renderDateList(list) {
    var $parent = $('.date-list-left');
    var str="";

    list.map(function (value,index) {
        if(index===0){
            str+=`<div class="date-item date-item-active">
                   <p>${value.date}</p>
                   <p>${value.week}</p>
                   <p>${value.price}</p>
               </div>`;
        }else{
            str+=`<div class="date-item">
                  <p>${value.date}</p>
                   <p>${value.week}</p>
                   <p>${value.price}</p>
               </div>`;
        }

    })

    $parent.html(str);
}
function renderFlightList(list) {
     var $parent = $('.flight-list ul');
     var str="";

     list.map(function (value) {
          str+=` <li class="flight-item">
                        <div class="flight-info">
                            <div class="airport-info">
                                <div class="from-info">
                                    <p>${value.flightInfo.fromInfo.time}</p>
                                    <p class="terminal">${value.flightInfo.fromInfo.terminal}</p>
                                </div>
                                <div class="time-info">
                                    <p></p>
                                    <div class="plane-info">
                                        <div class="arrow-right"></div>
                                    </div>
                                </div>
                                <div class="to-info">
                                    <p>${value.flightInfo.toInfo.time}</p>
                                    <p class="terminal">${value.flightInfo.toInfo.terminal}</p>
                                </div>
                            </div>
                            <div class="company-info">
                                <span>${value.flightInfo.companyInfo[0]}</span>
                                <span>${value.flightInfo.companyInfo[1]}</span>
                            </div>
                        </div>
                        <div class="flight-price">
                            <p class="price-info">${value.flightPrice.priceInfo}</p>
                            <p class="more-info other-info">${value.flightPrice.moreInfo}</p>
                            <p><span class="price-state other-info">${value.flightPrice.priceState}</span></p>
                            <p class="ticket-state other-info">${value.flightPrice.ticketState}</p>
                        </div>
                    </li>`
     });
    $parent.html(str);
}

window.onscroll=function (e) {
    var dateList = document.getElementsByClassName('date-list')[0];
    var flightFilter = document.getElementsByClassName('flight-filter')[0];


    dateList.style.height="0px";
    flightFilter.style.height="0px";
    var delay=document.documentElement.scrollTop===0?100:800;
        setTimeout(function () {
            dateList.style.height="60px";
            flightFilter.style.height="50px";
        },delay)

};