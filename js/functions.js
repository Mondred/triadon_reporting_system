let loader = '<div class="lds-ripple"><div></div><div></div></div>';
const spnr = (id)=>{
    if (!$(id).innerText) {
        $(id).append(loader);
    }
}

// CSS Loader end

/* Array.prototype.defineProperty = function('groupByProperties') {
    //value : function(properties){                       
        // will contain grouped items
        var result = []; 
  
        // iterate over each item in the original array
        this.forEach(function(item){
            // check if the item belongs in an already created group
            var added = result.some(function(group){
                // check if the item belongs in this group
                var shouldAdd = properties.every(function(prop){
                    return (group[0][prop] === item[prop]);
                });
                // add item to this group if it belongs 
                if (shouldAdd) {
                    group.push(item);
                }
                // exit the loop when an item is added, continue if not
                return shouldAdd;
            });
  
            // no matching group was found, so a new group needs to be created for this item
            if (!added) {
                result.push([item]);
            }
        });
        return result;
    //}
  }; */

  function getGroup(list,props){
    var result =[]; var result2 = []; var {score,score2} = 0;
  
    // iterate over each item in the original array
    list.forEach(function(item){
            // check if the item belongs in an already created group
            if (item.type === 'web') {

                let shouldAdd = true;
                if (result.length) {
                    result.forEach(cat => {
                        if (item.category === cat) {
                            shouldAdd = false;
                        }
                    });
                }
                
                if (shouldAdd) {
                    result.push(item.category);
                    score+=item.score;
                    //console.log(item.category, item.title);
                }
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
                    result2.push(item.category);
                    score2+=item.score;
                    //console.log(item.category, item.title);
                }
            }
            // check if the item belongs in this group
            
            // add item to this group if it belongs 
            
            // exit the loop when an item is added, continue if not
            
        });

        // no matching group was found, so a new group needs to be created for this item
    let tscore = ((score/result.length)*100)/4;
    let tscore2 = ((score2/result2.length)*100)/4;
    console.log(tscore,tscore2);

    return result;
  }

  function groupBy( array , f )
  {
    var groups = {};
    array.forEach( function( o )
    {
      var group = JSON.stringify( f(o) );
      groups[group] = groups[group] || [];
      groups[group].push( o );  
    });
    return Object.keys(groups).map( function( group )
    {
      return groups[group]; 
    })
  }
  
  


  // Variable declaration for Date From and To
    var fmo = '';
    var tmo = '';

    let from = '';
    let to = '';
    let sd = 01;let rset = 01;