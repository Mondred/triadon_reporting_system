if (sessionStorage.token && sessionStorage.cid) {
    window.location.replace("file:///C:/Users/User/Downloads/Zips/startbootstrap-sb-admin-2-gh-pages%20(2)/startbootstrap-sb-admin-2-gh-pages/index.html");
}

async function _getcomp(tkn){
    if (!sessionStorage.cid && sessionStorage.token) {
      window.sessionStorage.cid = 'XqJa3WR_OAAEovRA';
      const query = new URLSearchParams({
        token: tkn
      }).toString();
      
      const resp = await fetch(
        'https://api2.timedoctor.com/api/1.0/companies?' + query,
        {method: 'GET'}
      );
      
      const data = await resp.json();
  
      data['data'].forEach(res => {
          
        //console.log(res.company);
        
        window.sessionStorage.usr = res.company.name;
        window.sessionStorage.tz = res.company.timezone;
        window.sessionStorage.pln = res.company.pricingPlan;
      });

    }
    if(sessionStorage.cid){
        window.location.replace("file:///C:/Users/User/Downloads/Zips/startbootstrap-sb-admin-2-gh-pages%20(2)/startbootstrap-sb-admin-2-gh-pages/index.html");
      }
    return true;
  }

async function _login(){

    /* email: 'pierre@triadonoss.com',
password: 'TimeDoctor123', */


    let username = $('#InputEmail').val();
    let password = $('#InputPassword').val();
    if (!username || !password) {
        return alert('Please enter your username and or password.')
    }
  const query = new URLSearchParams({
      token: 'YOUR_API_KEY_HERE'
    }).toString();
    
    const resp = await fetch(
      'https://api2.timedoctor.com/api/1.0/login?' + query,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: username,
          password: password,
          totpCode: 'string',
          permissions: 'write'
        })
      }
    );
    
    const data = await resp.json();
    //console.log(data);
    if (data.error) {
      return alert('Sorry, '+ data.message);
    }else{
      sessionStorage.token = data['data'].token;
      _getcomp(sessionStorage.token);
    }
  }