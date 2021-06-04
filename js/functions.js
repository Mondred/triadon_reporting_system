let loader = '<div class="lds-ripple"><div></div><div></div></div>';
const spnr = (id)=>{
    if (!$(id).innerText) {
        $(id).append(loader);
    }
}


  function getGroup(list,props){
    var result =[]; var result2 = []; var score = 0; var score2 = 0; var weburl = [];var dt = [];
  
    // iterate over each item in the original array
    list.forEach(function(item){
            // check if the item belongs in an already created group
            if (item.type === 'web') {

                let shouldAdd = true;
                let shouldAdd2 = true;
                if (result.length) {
                    result.forEach(cat => {
                        if (item.category === cat) {
                            shouldAdd = false;
                        }
                    });
                }
                if (weburl.length) {
                    weburl.forEach(wurl => {
                        const url = item.value;
                        const { hostname } = new URL(url);  
                        if (hostname === wurl) {
                            shouldAdd2 = false;
                        }
                    });
                }
                if (shouldAdd) {

                    const url = item.value;
                    const { hostname } = new URL(url);  
                    result.push(item.category);
                    dt.push(item);
                    //console.log(item.category, item.title);
                }
                if (shouldAdd2) {

                    const url = item.value;
                    const { hostname } = new URL(url);  
                    weburl.push(hostname);
                   
                    //console.log(item.category, item.title);
                }
                score+=item.score;
            }


            if (item.type === 'app') {
                let shouldAdd = true;
                if (result2.length) {
                    result2.forEach(cat => {
                        if (item.category === cat) {
                            shouldAdd = false;
                        }
                    });
                }
                
                if (shouldAdd) {
                    result2.push(item);
                    
                    //console.log(item.category, item.title);
                }
                score2+=item.score;
            }
            // check if the item belongs in this group
            
            // add item to this group if it belongs 
            
            // exit the loop when an item is added, continue if not
            
        });

        // no matching group was found, so a new group needs to be created for this item
    let tscore = ((score/result.length)*100)/4;
    let tscore2 = ((score2/result2.length)*100)/4;
    //console.log(tscore.toFixed(2),tscore2.toFixed(2));

    return {
        ds: dt,
        url: weburl,
        web: result,
        app: result2,
        webscore: tscore.toFixed(2),
        appscore: tscore2.toFixed(2)
    };
  }

  function getweekly( dt )
  {
    console.log(dt.ds);
    let row = [];
    dt.ds.forEach (item => {
        row.push(`
                <tr>
                    <td>${item}</td>
                    <td>${item}</td>
                    <td>
                        <div class="progress" style="height: 3px;">
                            <div class="progress-bar bg-success animated--fade-in" role="progressbar" style="width: 80%" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        80%
                    </td>
                    <td>${item}</td>
                    <td>${item}</td>
                    <td>${item}</td>
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