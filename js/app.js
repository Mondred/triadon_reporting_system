async function web_apps(id,name){
  fmo = $('#fmo option:selected').attr('name');
  tmo = $('#tmo option:selected').attr('name');
  fdy = $('#fdy').val();
  tdy = $('#tdy').val();

  from = '2021-'+ fmo+'-'+fdy+'T00:00:00.000Z';
  to = '2021-'+ tmo+'-'+tdy+'T23:59:00.000Z';
  //let from = '2021-05-01T05:00:00.000Z';
  //let sto = '2021-05-15T20:00:00.001Z';
  sd = parseInt($('#fdy').val());
  rset = sd;
  
  const query = new URLSearchParams({
      period: 'days',
      interval:1,
      //no-total:1,
      from: from,
      to: to,
      timezome: 'Asia/Manila',
      user: id, // all-on-reports
      //group-by:company,
      ratio:'score',
      fields:'userID',
      limit:5000,
      token: sessionStorage.token,
      company: sessionStorage.cid
    }).toString();
    let sql = `https://api2.timedoctor.com/api/1.1/stats/timesheet/category-total?${query}`;
    const resp = await fetch(
      //'https://api2.timedoctor.com/api/1.0/activity/timeuse?' + query,

      {method: 'GET'}
    );
    
    const data = await resp.json();
    console.log(data);
    //getApps(data);
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