const currentPageUrl=location.href;
  const menuItem=document.querySelectorAll(".navlink");
  for(let i=0;i<menuItem.length;i++){
    if(menuItem[i].href===currentPageUrl){
      menuItem[i].className="nav-link active";
      menuItem[i-1].className="nav-link ";
      menuItem[i-2].className="nav-link ";
      menuItem[i-3].className="nav-link ";
    }
  }