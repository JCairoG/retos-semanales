class ElementState{

  toggleState = (item) =>{
    const status = item.getAttribute("status"); 
    let toggled = item.getAttribute("toggled");
    if (!toggled) toggled ="0";

    switch (status){
      case "enabled":
        if (toggled === "0"){
          item.setAttribute("toggled", "1");
          item.disabled = true;
          item.style.pointerEvents ="none"
        }else{
          item.setAttribute("toggled", "0");
          item.disabled = false;
          item.style.pointerEvents ="auto"
        }
        break;

      case "disabled":
        if (toggled === "0"){
          item.setAttribute("toggled", "1");
          item.disabled = false;
          item.style.pointerEvents ="auto"
        }else{
          item.setAttribute("toggled", "0");
          item.disabled = true;
          item.style.pointerEvents ="none"
        }
        break;

      case "focus":
        if (toggled === "0"){
          item.setAttribute("toggled", "1");
          item.disabled = false;
          item.focus();
          item.style.pointerEvents ="auto"
        }else{
          item.setAttribute("toggled", "0");
          item.disabled = true;
          item.style.pointerEvents ="none"
        }
        break;

      case "visible":
        if (toggled === "0"){
          item.setAttribute("toggled", "1");
          item.hidden = true;
          item.style.pointerEvents ="auto"
        }else{
          item.setAttribute("toggled", "0");
          item.hidden = false;
          item.style.pointerEvents ="none"
        }
        break;

      case "hide": 
        if (toggled === "0"){
          item.setAttribute("toggled", "1");
          item.hidden = false;
        }else{
          item.setAttribute("toggled", "0");
          item.hidden = true;
        }
        break;
    
      case "hideFocus":
        if (toggled === "0"){
          item.setAttribute("toggled", "1");
          item.hidden = false;
          item.focus;
        }else{
          item.setAttribute("toggled", "0");
          item.hidden = true;
        }
        break;
    }
  }
}

export const elementState = new ElementState();