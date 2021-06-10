Number.prototype.toHHMMSS = function() {
  var hours = Math.floor(this / 3600) < 10 ? ("00" + Math.floor(this / 3600)).slice(-2) : Math.floor(this / 3600);
  var minutes = ("00" + Math.floor((this % 3600) / 60)).slice(-2);
  var seconds = ("00" + (this % 3600) % 60).slice(-2);
  return hours + ":" + minutes + ":" + seconds;
}


let web_apps = (id,name) => {
  fmo = $('#fmo option:selected').attr('name');
  tmo = $('#tmo option:selected').attr('name');
  fdy = $('#fdy').val();
  tdy = $('#tdy').val();

  from = '2021-'+ fmo+'-'+fdy+'T16:00:00.000Z';
  to = '2021-'+ tmo+'-'+tdy+'T16:00:00.000Z';
  sd = parseInt($('#fdy').val());

  app_summ(id);
  app_top(id);
}

async function app_summ(id,name){

    let sql = `https://api2.timedoctor.com/api/1.1/stats/category-total?from=${from}&to=${to}&timezone=Asia%2FManila&user=${id}&group-by=userId&ratio=score&resolve=userId&limit=20&sort=_total&page=0&token=1qFAiv2z4595evpAoLkqI-8uTgFOfojDMOWnat3v7_qI&company=XqJa3WR_OAAEovRA`;

    const resp = await fetch(
      sql,
      {method: 'GET'}
    );
    
    const data = await resp.json();
    //console.log(data);

    // score id
    // 4 - prod, 2 - unprod, 

    $('#phr')[0].innerText = data['data'][0].total.toHHMMSS();
    data['data'][0].score.forEach(v =>  (v.id === '4')?$('#uhr')[0].innerText = v.total.toHHMMSS() :'0');
    data['data'][0].score.forEach(v =>  (v.id === '2')? $('#ihr')[0].innerText = v.total.toHHMMSS() :'0');

};
async function app_top(id,name){

    let sql = `https://api2.timedoctor.com/api/1.1/stats/category-total?from=${from}&to=${to}&timezone=Asia%2FManila&user=${id}&group-by=comCat%2Cscore&fields=userCat&resolve=comCat&sort=_total&limit=50&filter%5Btotal%5D=60_&page=0&token=1qFAiv2z4595evpAoLkqI-8uTgFOfojDMOWnat3v7_qI&company=XqJa3WR_OAAEovRA`;

    const resp = await fetch(
      sql,
      {method: 'GET'}
    );
    
    const data = await resp.json();
    console.log(data);


};













async function _getusrs(tkn){
    
  const query = new URLSearchParams({
      company: sessionStorage.cid,
      token: tkn
    }).toString();
    
    const resp = await fetch(
      'https://api2.timedoctor.com/api/1.0/users?' + query,
      {method: 'GET'}
    );
    
    const data = await resp.json();
    //console.log(data);let usrs = [];let usrid = [];
    data['data'].forEach(res =>{
        if (res.role === 'user') {
            $('#userSelector').append(`<li class="dropdown-item" onclick="web_apps('${res.id}','${res.name}')" value="${res.name}">${res.name}</li>`);
        }
    });
}



(function(){

  _getusrs(sessionStorage.token);
    //spnr('.tt-hr')
})(jQuery);