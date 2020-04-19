
 function NowTime(){
    function timePD(m){return m<10?'0'+m:m }//时间判断
    let time = new Date()
    let y = time.getFullYear();
    let m = time.getMonth()+1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    let now= y+'-'+timePD(m)+'-'+timePD(d)+' '+timePD(h)+':'+timePD(mm)+':'+timePD(s);
    return now
}

export default NowTime