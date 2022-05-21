const gridFeatures = document.getElementById("features__table");

const clientsGalleryInfo = (e) => {
  const infoContainer = document.getElementById("clients__info-container"); 
  infoContainer.innerHTML = "";
  let item;

  if (e.target.tagName==="IMG"){
    item = e.target.parentElement;
  }else{
    item = e.target;
  }
  
  const name = item.getAttribute("alias");
  const info = item.getAttribute("clientInfo");
  if (!info) return;

  const Top = item.offsetTop - 40 + "px"
  const Left = item.offsetLeft + "px" 

  infoContainer.innerHTML = name + "<br>" + info;
  infoContainer.style.top = Top;
  infoContainer.style.left = Left;
}

const fetchInfo = async (dataLink, method = "GET") => {
  try{
    const response = await fetch(dataLink, {
        method: method,
        mode: 'cors',
      });
    const data = await response.json();
    return data;
  
  }catch(err){
    console.log(err);
  }
}

export const fillGridFeatures = async () =>{
  const cols = gridFeatures.getElementsByTagName("th");
  let colInfo=[];
    
  for (const col of cols) {
    const colId = col.id.split("#")[1];
    colInfo.push ({"colId": colId, "class": col.getAttribute("classtd")});
  }

  const gridBody = gridFeatures.getElementsByTagName("tbody")[0];
  gridBody.innerHTML = "";
      
  const data = await fetchInfo("https://jcsistemasperu.com/features.json");
  if (!data) return;

  data.forEach((row)=>{
    let cellData ="";
    for (let col of colInfo){
      cellData+=`<td class="${col.class}">${row[col.colId]}</td>`;
    }
    gridBody.innerHTML += `<tr class="features__table-row">${cellData}</tr>`;
  })
}

export const getGridSelectedId = (e) =>{
  const td = e.target;
  const rowIndex = td.parentElement.rowIndex;
  if (rowIndex===0) return;

  try{
    const grid = td.parentElement.parentElement.parentElement;
    const status = grid.getAttribute("status");
    const toggle = grid.getAttribute("toggled");
    if (status ==="disabled" || (status ==="enabled" && toggle ==="1")) return;

    const idSel =  grid.rows[rowIndex].cells[0].innerHTML;
    const dataIndex = grid.id.split("#")[0];
    
    console.log(idSel);
    return idSel;

  }catch (err){
    console.log(err);
  }
}

export const clientsGalleryFill = async () =>{
  const galleryClients = document.getElementById("clients-gallery-container");
  galleryClients.innerHTML ="";

  const data = await fetchInfo("https://jcsistemasperu.com/clients.json");
  if (!data) return;

  data.forEach((row)=>{
    const tag = row['lines'] + " lineas con SITEV en " + row['location'];
    galleryClients.innerHTML += `
    <figure class="clients__gallery-image-container" id=${row['id']} clientInfo="${tag}" alias="${row['alias']}">  
      <img src=${row['logo']} alt="${row['alias']}" class="clients__gallery-image"/>
    </figure>
    `;
  })
  galleryClients.innerHTML += `<div class="clients__info-container" id="clients__info-container"></div>`;

  const galleryContainer = document.querySelectorAll(".clients__gallery-image-container"); 
  const galleryImg = document.querySelectorAll(".clients__gallery-image"); 

  galleryContainer.forEach((img) => {
    img.addEventListener("mouseover", clientsGalleryInfo)
  });

  galleryImg.forEach((img) => {
    img.addEventListener("mouseover", clientsGalleryInfo)
  });
}

gridFeatures.addEventListener("click", getGridSelectedId);