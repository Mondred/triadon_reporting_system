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

    list.forEach(function(item){
        let [res,score] = [[],0];
            if (item.type === 'web') {}

            if (item.type === 'app') {
                let shouldAdd = true;
                if (res.length) {
                    res.forEach(cat => {
                        if (item.category === cat) {
                            shouldAdd = false;
                        }
                    });
                }
                
                if (shouldAdd) {
                    res.push(item);
                }
                score+=item.score;
            }
        });
    let tscore = ((score/result.length)*100)/4;
    let tscore2 = ((score2/result2.length)*100)/4;

    return {
        web: web,
        app: native,
        webscore: tscore.toFixed(2),
        appscore: tscore2.toFixed(2)
    };
  }

  function getweekly(res)
  {
    let row = [];
    res.forEach (item => {
        let {title,time,value,type,score} = item;
        let {hostname} = new URL(value);
        row.push(`
                <tr>
                    <td>${title}</td>
                    <td>${_cHr(time)['h']+'h:'+_cHr(time)['m']+'m'}</td>
                    <td>
                        <div class="progress" style="height: 3px;">
                            <div class="progress-bar bg-success animated--fade-in" role="progressbar" style="width: ${(score/4)*100}%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        ${score}%
                    </td>
                    <td>${hostname}</td>
                    <td>${type}</td>
                    <td>${score}</td>
                </tr>
        `);
    });
    let innerhtm = `${row}`;

$('#tbl-apps').empty();
$('#tbl-apps').append(innerhtm);
  }
  
  function getRange( res ){
    let scorer =0;
    let scorer2 =0;
    let scorer3 =0;
    let counter =0;
    let counter2 =0;
    let counter3 =0;
    let tsh =0;
    res['data'].forEach(r => {
        r.forEach(t=>{
            if (t.type === 'app') {
                //console.log(t.value);
                scorer = scorer + t.score;
                counter+= 1;
            }
            if (t.type === 'web') {
                //console.log(t.value);
                scorer2 = scorer2 + t.score;
                counter2+= 1;
            }
            scorer3 = scorer3 + t.score;
            counter3+= 1;
            tsh +=t.time;
        });
    });
    //var pr = (this.state.res[4] * 100);
    var ap = ((scorer3/counter3)*100/4);
    //console.log(pr);
    let apps =  {
        nativeApps: ((scorer/counter)*100/4).toFixed(2),
        webApps: ((scorer2/counter2)*100/4).toFixed(2),
        staffHours: _cHr(tsh)['h']+':'+_cHr(tsh)['m']+':'+_cHr(tsh)['s'],
        allApps: ((scorer3/counter3)*100/4).toFixed(2),
        //perform : ( ap + pr ) / 2
    }

    //console.log(apps.allApps);
    let tr = `<h4 class="small font-weight-bold">Apps Utilization <span
    class="float-right" id="aur">${apps.allApps}%</span></h4>
<div class="progress mb-4">
<div class="progress-bar bg-danger" role="progressbar" style="width: ${apps.allApps}%"
    aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<h4 class="small font-weight-bold">Native Apps <span
    class="float-right" id="nar">${apps.nativeApps}%</span></h4>
<div class="progress mb-4">
<div class="progress-bar bg-warning" role="progressbar" style="width: ${apps.nativeApps}%"
    aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
</div>

<h4 class="small font-weight-bold">Web Apps <span
    class="float-right" id="war">${apps.webApps}%</span></h4>
<div class="progress mb-4">
<div class="progress-bar" role="progressbar" style="width: ${apps.webApps}%"
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