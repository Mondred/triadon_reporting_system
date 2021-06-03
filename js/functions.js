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
    var result = []; 
  
    // iterate over each item in the original array
    list.forEach(function(item){
        // check if the item belongs in an already created group
        result.forEach(g=>{
            
        });
            // check if the item belongs in this group
        console.log(item.category, item.type);
            // add item to this group if it belongs 
            
            // exit the loop when an item is added, continue if not
            
        });

        // no matching group was found, so a new group needs to be created for this item
       
        
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