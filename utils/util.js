const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let getDateStr= function(today, addDayCount) {
  var date;
  if(today) {
    date = new Date(today);
  }else{
    date = new Date();
  }
  date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = date.getFullYear();
    var m = date.getMonth() + 1;//获取当前月份的日期 
    var d = date.getDate();
    if(m < 10){
      m = '0' + m;
    };
    if(d < 10) {
      d = '0' + d;
    };
    console.log( y + "-" + m + "-" + d)
    return y + "-" + m + "-" + d;
  }

module.exports = {
  formatTime: formatTime,
  getDateStr:getDateStr
}
