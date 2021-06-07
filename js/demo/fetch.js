if (!sessionStorage.token || !sessionStorage.cid) { //

      location.href = 'login.html';
  
}

console.clear();
//console.log($('#user-name').text());
$('#user-name').html(sessionStorage.usr);
$('#user-role').html('<i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>'+sessionStorage.pln);

var ctx = document.getElementById("timeLineChart");
var ctx2 = document.getElementById("productivityTrendChart");
var ctx3 = document.getElementById("idleLineChart");
var pie = document.getElementById("projectPieChart");
var pie2 = document.getElementById("taskPieChart");

const token = sessionStorage.token;
const users = 'YCtUfaHzAgAE7liP,YEg7WdpgAwAEn5WY';



if (sessionStorage.token) {
  _getusrs(token);
}

//_getcomp(sessionStorage.token);

// _getprj(token,'all');
//_gettsk(token,'all');
//_stats(token,'all');
//_statsTS(token,'all');
//_statsSum(token,'all');
//_timeUse(token,"all"); */

function getId(id,uname){
  fmo = $('#fmo option:selected').attr('name');
  tmo = $('#tmo option:selected').attr('name');
  from = '2021-'+ fmo+'-'+$('#fdy').val()+'T00:05:00.000Z';
  to = '2021-'+ tmo+'-'+$('#tdy').val()+'T00:05:00.000Z';
  //let from = '2021-05-01T05:00:00.000Z';
  //let sto = '2021-05-15T20:00:00.001Z';
  sd = parseInt($('#fdy').val());
  rset = sd;
  $('#nameofuser').text(uname);
  $('#reportperiod').text(moment(fmo).format('MMM') + ' ' +  sd + ' - ' +$('#tdy').val() + ' 2021');

  if (page===1) {
    
    _getprj(token,id);
    _gettsk(token,id);
  }
  _stats(token,id);
  //_statsSum(token,id,'2021'+fmo);
  //_statsTS(token,id,'2021'+fmo);
  _timeUse(token,id);
}






