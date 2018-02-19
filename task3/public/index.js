$(function () {
    $.ajax({
        type:"GET",
        url:"/getData",
        success:function (data,status) {
            renderTable(data)
        },
        fail: function (err, status) {
            console.log(err)
        }
    });

    $('button').click(function () {
        const url = $('input').val();
        $.ajax({
            type:"GET",
            url:'/counter?url='+url,
            success:function (data,status) {
                renderRow(data)
            },
            fail: function (err, status) {
                console.log(err)
            }
        });
        return false;
    });

});

function renderTable(arr) {
    let str="";
    arr.map(function (value,index) {
        str+=`
          </tr><tr><td>${value.title}</td><td>${value.number}</td><td>${value.chNumber}</td>
                <td>${value.enNumber}</td><td>${value.puncNumber}</td></tr>`
    })

    $("tbody").append(str);
}


function renderRow(arr) {
    let value = arr.pop();
    let str=`
          </tr><tr><td>${value.title}</td><td>${value.number}</td><td>${value.chNumber}</td>
                <td>${value.enNumber}</td><td>${value.puncNumber}</td></tr>`;

    $("tbody").append(str);
}





