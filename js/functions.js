let loader = '<div class="lds-ripple"><div></div><div></div></div>';
const spnr = (id)=>{
    if (!$(id).innerText) {
        $(id).append(loader);
    }
}

    function shouldAdd(data,list){
        let shouldAdd = true;
        if (list.length) {
            list.forEach(items=>{
                if (data.category === items.category) {
                    shouldAdd = false;
                    if (items.count) {
                        items.count+=1;
                    }else{
                        items.push({count:1});
                    }
                }
            });
        }
        return {
            shouldAdd: shouldAdd,
            dataset:list
        }
    }

  function getGroup(list){

    let [app,counter,counter2,web,native,all] = [[],0,0,0,0,0];
    list.forEach(item=>{

            if (item.type === 'web') {
                let shouldAdd = true;
                if (app.length) {
                    app.forEach(r => {
                        //
                        if (item.category === r.category) {
                            shouldAdd = false;
                            r.time+=item.time;
                            let s = (r.score+((item.score*100)/4))/2;
                            r.score = s
                        }
                    });
                }
                counter++;
                web+=item.score;
                if (shouldAdd) {
                    item.score = (item.score*100)/4;
                    app.push(item);
                }
                
                
            }
            
            /*if (item.type === 'app') {
                let shouldAdd = true;
                if (app.length) {
                    app.forEach(r => {
                        //
                        if (item.category === r.category) {
                            shouldAdd = false;
                            r.time+=item.time;
                            let s = (r.score+((item.score*100)/4))/2;
                            r.score = s
                        }
                    });
                }
                counter2++;
                native+=item.score;
                if (shouldAdd) {
                    item.score = (item.score*100)/4;
                    app.push(item);
                }
            } */

            
        });
        web = (web/counter)*100/4;
        native = (native/counter2)*100/4;
        all = (web+native)/2;

    return {
        web: web.toFixed(2),
        native:native.toFixed(2),
        apps:all.toFixed(2),
        app: app,
    };
  }

  function getweekly(res)
  {
    let row = [];let totalTime = 0;
    res.forEach (item => {
        let {title,time,value,type,score} = item;
        
        if (type==='web') {
            let {hostname} = new URL(value);
            value = hostname;
        }
        
        totalTime+=time;
        row.push(`
                <tr>
                    <td>${title.substring(0,80)}</td>
                    <td>${((_cHr(time)['h'])? _cHr(time)['h']+'h:': '')+_cHr(time)['m']+'m'+'-'+time}</td>
                    <td>${value}</td>
                    <td>${type}</td>
                    <td>
                        <div class="progress" style="height: 3px;">
                            <div class="progress-bar bg-success animated--fade-in" role="progressbar" style="width: ${score}%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        ${score}%
                    </td>
                </tr>
        `);
    });
    let innerhtm = `${row}`;
    console.log(((_cHr(totalTime)['h'])? _cHr(totalTime)['h']+'h:': '')+_cHr(totalTime)['m']+'m');

$('#tbl-apps').empty();
$('#tbl-apps').append(innerhtm);
  }
  
  function getRange( res ){

    console.log(res);
    let tr = `<h4 class="small font-weight-bold">Apps Utilization <span
    class="float-right" id="aur">${res.apps}%</span></h4>
<div class="progress mb-4">
<div class="progress-bar bg-danger" role="progressbar" style="width: ${res.apps}%"
    aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<h4 class="small font-weight-bold">Native Apps <span
    class="float-right" id="nar">${res.native}%</span></h4>
<div class="progress mb-4">
<div class="progress-bar bg-warning" role="progressbar" style="width: ${res.native}%"
    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<h4 class="small font-weight-bold">Web Apps <span
    class="float-right" id="war">${res.web}%</span></h4>
<div class="progress mb-4">
<div class="progress-bar" role="progressbar" style="width: ${res.web}%"
    aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
</div>`;

$('#tools-rating').empty();
$('#tools-rating').append(tr);
  }
  


  // Variable declaration for Date From and To
    var fmo = '';
    var tmo = '';

    let from = '';
    let to = '';
    let sd = 01;let rset = 01;