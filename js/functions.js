let loader = '<div class="lds-ripple"><div></div><div></div></div>';
const spnr = (id)=>{
    if (!$(id).innerText) {
        $(id).append(loader);
    }
}

// CSS Loader

