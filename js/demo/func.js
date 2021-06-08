let categorylist = [];

function getApps(res){

    let ds = getGroup(res['data'][0]);
    
    
    if (page ===1) {
      getRange( res );
    }
    if (page===2) {
      getweekly( ds['app']);
    }

}

function _logout(){
    sessionStorage.clear();
}

Number.prototype.toHHMMSS = function() {
    var hours = Math.floor(this / 3600) < 10 ? ("00" + Math.floor(this / 3600)).slice(-2) : Math.floor(this / 3600);
    var minutes = ("00" + Math.floor((this % 3600) / 60)).slice(-2);
    var seconds = ("00" + (this % 3600) % 60).slice(-2);
    return hours + ":" + minutes + ":" + seconds;
  }
  const _cHr = (secs) =>
  {
      var hours = Math.floor(secs / (60 * 60));
  
      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
  
      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
  
      var obj = {
          "h": (hours)?hours:0,
          "m": (minutes)?minutes:0,
          "s": (seconds)?seconds:0
      };
      return obj;
  }
  const _toPercent = (ival) => {
    if (ival) {
        return (ival * 100).toFixed(2) + '%';
    }
    return '0%';
}
const _percent = (ival) => {
    if (ival) {
        return (ival * 100).toFixed(2);
    }
    return 0;
}

const dt_ = {
  data: {
    labels: [{name:'Time',value:90}],
    datasets: [{
      label: "Hours",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data:[{name:'Time',value:90}],
    }],
  },
}

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
              $('#userSelector').append(`<li class="dropdown-item" onclick="getId('${res.id}','${res.name}')" value="${res.name}">${res.name}</li>`);
          }
      });
}

async function _getprj(tkn,id){
  const query = new URLSearchParams({
    company: sessionStorage.cid,
    user: id,
    fields: 'name',
    from: from,
    to: to,
    token: tkn
  }).toString();
  
  const resp = await fetch(
    'https://api2.timedoctor.com/api/1.0/stats/project-total?' + query,
    {method: 'GET'}
  );
      
      const data = await resp.json();
      //console.log(data);
      let label = [];let val =[]
      data['data']['project'].forEach(res => {
          label.push(res.name);
          val.push(_cHr(res.total)['h'] +'.'+_cHr(res.total)['m']);
      });
      const _pie = {
        data: {
            labels: label,
            datasets: [{
              data: val,
              backgroundColor:[ '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9',
              '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9'],
              hoverBackgroundColor: [ '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9',
              '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9'],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
          }
      }
      _pieC(pie, _pie);
}

async function _gettsk(tkn,id){
  const query = new URLSearchParams({
    company: sessionStorage.cid,
    user: id,
    fields: 'name',
    from: from,
    to: to,
    token: tkn
  }).toString();
  
  const resp = await fetch(
    'https://api2.timedoctor.com/api/1.0/stats/task-total?' + query,
    {method: 'GET'}
  );
      
      const data = await resp.json();
      //console.log(data);
      let label = [];let val =[]
      data['data']['task'].forEach(res => {
          label.push(res.name);
          val.push(_cHr(res.total)['h'] +'.'+_cHr(res.total)['m']);
      });
      const _pie = {
        data: {
            labels: label,
            datasets: [{
              data: val,
              backgroundColor: [ '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9',
              '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9'],
              hoverBackgroundColor: [ '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9',
              '#8dace7',
              '#4BC0C0',
              '#ef869e',
              '#E7E9ED',
              '#71deb9'],
              hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
          }
      }
      _pieC(pie2, _pie);
}

async function _stats(tkn,id){
    const query = new URLSearchParams({
        company: sessionStorage.cid,
        user: id,
        fields: 'name',
        from: from,
        to: to,
        sort: 'userId',
        token: tkn
      }).toString();
      
      const resp = await fetch(
        'https://api2.timedoctor.com/api/1.0/stats/summary-ratio?' + query,
        {method: 'GET'}
      );
      
      const data = await resp.json();
      //console.log(data['data']['users'][0]);
      
      //$('#thr')[0].innerText = data['data']['users'][0].total.toHHMMSS();
      $('#phr')[0].innerText = data['data']['users'][0].prod.toHHMMSS();
      $('#uhr')[0].innerText = data['data']['users'][0].unprod.toHHMMSS();
      $('#ihr')[0].innerText = (data['data']['users'][0].idleMins / 60).toFixed(2);
          
      let pdr = _toPercent(data['data']['users'][0].prodRatio);
      let upr = _toPercent(data['data']['users'][0].unprodRatio);
      let imr = _toPercent(data['data']['users'][0].idleMinsRatio);
      let rating = `<h4 class="small font-weight-bold">Productivity <span
              class="float-right" id="pr">${pdr}</span></h4>
      <div class="progress mb-4">
          <div class="progress-bar bg-success animated--fade-in" role="progressbar" style="width: ${pdr}"
              aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <h4 class="small font-weight-bold">Unproductivity <span
              class="float-right" id="ur">${upr}</span></h4>
      <div class="progress mb-4">
          <div class="progress-bar bg-warning animated--fade-in" role="progressbar" style="width: ${upr}"
              aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <h4 class="small font-weight-bold">Idle Time <span
              class="float-right" id="itr">${imr}</span></h4>
      <div class="progress mb-4">
          <div class="progress-bar bg-danger animated--fade-in" role="progressbar" style="width: ${imr}"
              aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
      </div>`;
      
      $('#prog-p').empty();
      $('#prog-p').append(`<div class="progress mt-2" style="height: 3px;">
                                <div class="progress-bar bg-success animated--fade-in" role="progressbar" style="width: ${pdr}"
                                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                            ${pdr}`);
      $('#prog-u').empty();
      $('#prog-u').append(`<div class="progress mt-2" style="height: 3px;">
                                <div class="progress-bar bg-warning animated--fade-in" role="progressbar" style="width:${upr}"
                                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                            ${upr}`);
      $('#prog-i').empty();
      $('#prog-i').append(`<div class="progress mt-2" style="height: 3px;">
                                <div class="progress-bar bg-danger animated--fade-in" role="progressbar" style="width: ${imr}"
                                    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                            ${imr}`);


      $('#act-rating').empty();
      $('#act-rating').append(rating);
}

async function _statsTS(tkn,id,moyr){
    const query = new URLSearchParams({
        company: sessionStorage.cid,
        timezone: 'string',
        period: 'days',
        interval: '1',
        user: id,
        fields: 'date',
        from: from,
        to: to,
        level:'company',
        sort: 'id',
        token: tkn
      }).toString();
      let uris = 'https://api2.timedoctor.com/api/1.1/stats/timesheet/category-total?company='+sessionStorage.cid+'&period=days&interval=1&no-total=1&user='+id+'&from='+from+'&to='+to+'&timezone=Asia-Manila&group-by=company&limit=5000&token='+tkn;
      const resp = await fetch(
        //'https://api2.timedoctor.com/api/1.0/stats/timesheet/:detail?' + query,
        'https://api2.timedoctor.com/api/1.1/stats/timesheet/total?' + query,
        //uris,
        {method: 'GET'}
      );
      
      const data = await resp.json();
      console.log(data);

      
      let i = 1;let t = [];let ds = [];
      data['data'].forEach(res => {
          if (res.length) {
            //console.log(res[0].total);
            let rest = res[0].total + 1800;
            t.push(_cHr(rest)['h'] +'.'+_cHr(rest)['m']);
          }else{
            t.push(0);
          }
          i+=1;
      }); 
      //console.log(data['data']); //*/
     /*
       let i = 1;let t = [];let ds = [];
      
      data['data'][0].forEach(res => {
          if(res.mode){
            //console.log(res.mode[0].time.toHHMMSS());
            console.log(res.mode[0].time);
            t.push(_cHr(res.mode[0].time)['h'] +'.'+_cHr(res.mode[0].time)['m']);
          }else{
              //console.log(0);
              t.push(0);
          }
          i+=1;
      }); //*/
      //console.log(data['data']);
      

      //console.log(t);
      for (let index = 1; index < i; index++) {
        //console.log(index);
        let d = moyr+String(sd).padStart(2,'0');
        
        //let d = '202104' + String(sd).toString();
		    //console.log(d);
        let thisday = moment(d).format('MMM Do');
        //console.log(thisday);
        ds.push(thisday); 
        sd+=1;         
      }
      //ds.push(moment('202103'+String(sd).padStart(2,'0')).format('MMM Do'));
      ds.push(00);
      const dt_tl = {
        data: {
          labels: ds,
          datasets: [{
            label: "Work-hours",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: t,
          }],
        },
      }

      _areaChart(ctx,dt_tl.data);
      sd = rset; //*/
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
const _tl = [];
async function _statsSum(tkn,id,moyr){
    const query = new URLSearchParams({
        company: sessionStorage.cid,
        period: 'days',
        interval: '1',
        user: id,
        from: from,
        to: to,
        token: tkn
      }).toString();
      
      const resp = await fetch(
        'https://api2.timedoctor.com/api/1.0/stats/timesheet/summary-ratio?' + query,
        {method: 'GET'}
      );
      
      const data = await resp.json();

      //console.log(data);
      let i = 1;let ts = [];let up=[];let idl = [];let nt=[];let ds = [];
      data['data'].forEach(res => {
          if(res['users'].length){
            //console.log(res.users[0].prod);
            ts.push(_cHr(res.users[0].prod)['h'] +'.'+_cHr(res.users[0].prod)['m']);
            up.push(_cHr(res.users[0].unprod)['h'] +'.'+_cHr(res.users[0].unprod)['m']);
            idl.push((res.users[0].idleMins/60).toFixed(2));
            nt.push(_cHr(res.users[0].neutral)['h'] +'.'+_cHr(res.users[0].neutral)['m']);
          }else{
              //console.log(0);
              ts.push(0);
              up.push(0);
              idl.push(0);
              nt.push(0);
          }
          i+=1;
      }); 
      //console.log(data['data']);
      for (let index = 1; index < i; index++) {
        //console.log(index);
        //let d = '202103'+String(index).padStart(2,'0');
        let d = moyr+String(sd).padStart(2,'0');
        let thisday = moment(d).format('MMM Do');
        //console.log(sd);
        ds.push(thisday); 
        sd+=1;         
      }
      //ds.push(moment('202103'+String(sd).padStart(2,'0')).format('MMM Do'));
      ds.push(00);
      const dt_tl = {
        data: {
          labels: ds,
          datasets: [{
            label: "Productivity",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: ts,
          },
          {
            label: "Unproductivity",
            lineTension: 0.3,
            backgroundColor: "#edbe464a",
            borderColor: "#f6c23e",
            pointRadius: 3,
            pointBackgroundColor: "#f6c23e",
            pointBorderColor: "#f6c23e",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#fd7e14",
            pointHoverBorderColor: "#fd7e14",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: up,
          }],
        },
        data2: {
          labels: ds,
          datasets: [
          {
            label: "Idle",
            lineTension: 0.3,
            backgroundColor: "#e74a3b3d",
            borderColor: "#e74a3b",
            pointRadius: 3,
            pointBackgroundColor: "#e74a3b",
            pointBorderColor: "#e74a3b",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#fd7e14",
            pointHoverBorderColor: "#fd7e14",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: idl,
          },
          {
            label: "Neutral",
            lineTension: 0.3,
            backgroundColor: "#85879647",
            borderColor: "#858796",
            pointRadius: 3,
            pointBackgroundColor: "#858796",
            pointBorderColor: "#858796",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "#fd7e14",
            pointHoverBorderColor: "#fd7e14",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: nt,
          }],
        }
      }

      _areaChart(ctx2,dt_tl.data);
      _areaChart(ctx3,dt_tl.data2);
      sd = rset;
}

async function _timeUse(tkn,id){
  const query = new URLSearchParams({
      company: sessionStorage.cid,
      user: id,
      from: from,
      to: to,
      token: tkn
    }).toString();
    
    const resp = await fetch(
      'https://api2.timedoctor.com/api/1.0/activity/timeuse?' + query,
      {method: 'GET'}
    );
    
    const data = await resp.json();

    getApps(data);
}