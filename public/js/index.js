let contacto=document.getElementById("contacto"),navBar=document.getElementById("navBar"),Cards=document.getElementById("propiedades"),inputTipo=document.getElementById("inputGroupSelect01"),inputCondicion=document.getElementById("inputGroupSelect02"),btnSubmit=document.getElementById("btnSubmit"),selectCondidcion=document.getElementById("inputGroupSelect01"),condicionSearchBox=document.getElementById("condicionSearchBox"),tipoSearchBox=document.getElementById("tipoSearchBox"),optionsTipos=[],optionsCondiciones=[],paginationNumbers=document.getElementById("paginationContainer");var values=[];let size=5,modalContenido=document.getElementById("modal-content"),page=0,modalTitle=document.getElementById("staticBackdropLabel"),modalDescripcion=document.getElementById("descripcion"),modalImgSliderContainer=document.getElementById("swiper-wrapper-slider"),modalImgThumbailContainer=document.getElementById("swiper-wrapper-thumbnail"),arrayImg=[],precio=document.getElementById("precio"),map=document.getElementById("map"),nuevaBusqueda=document.getElementById("nuevaBusqueda"),lastAdded=document.getElementById("lastAdded"),consultaModal=document.getElementById("consultaModal");function modalButton(a){Cards.querySelectorAll("button").forEach(b=>{b.addEventListener("click",()=>{let c=b.id;modalTitle.innerHTML=`
      ${a.data.rows[c].nombre}
      `,modalDescripcion.innerHTML=`
      <h5>${a.data.rows[c].descripcion}</h5>
      `,a.data.rows[c].precio&&(precio.innerHTML=`
        <h3>U$S ${a.data.rows[c].precio}</h3>
        `);let e=document.getElementById("mapContainer");e.innerHTML=`${a.data.rows[c].direccion_mapa}`,e.firstElementChild.id="map";for(let d=0;d<a.data.rows[c].img.length;d++){let f=`
        <div class="swiper-slide">
          <img src="./img/${a.data.rows[c].img[d].nombre}" />
          </div>`;arrayImg.push(f),modalImgSliderContainer.innerHTML=arrayImg,modalImgThumbailContainer.innerHTML=arrayImg}arrayImg=[],consultaModal.addEventListener("click",()=>{let b=document.getElementById("form3Example5");console.log(c),b.value=`${a.data.rows[c].nombre}`,console.log(b)})})})}async function getTipos(){try{await fetch("/api/tipos",{mode:"no-cors"}).then(a=>a.json()).then(a=>{renderSearchBoxtipos(a)})}catch(a){console.log(a)}}async function getCondicion(){try{await fetch("/api/condicion",{mode:"no-cors"}).then(a=>a.json()).then(a=>{renderSearchBoxcondiciones(a)})}catch(a){console.log(a)}}async function getPropiedades(a){try{await fetch(`/api/propiedades?page=${page}&size=${size}&condicion=${a[0]}&tipo=${a[1]}`,{mode:"no-cors"}).then(a=>a.json()).then(a=>{renderPropiedades(a),renderPaginationNumbers(a)})}catch(b){console.log(b)}}function renderPaginationNumbers(b){nuevaBusqueda.classList.remove("hidden"),page=Math.ceil(b.data.count/size);for(let a=0;a<page;a++)(newPaginationElement=document.createElement("li")).classList.add("page-item"),newPaginationElement.innerHTML=`
    <a class="page-link page-link-pagination" value="${a+1}" >${a+1}</a>
    `,paginationNumbers.appendChild(newPaginationElement);document.querySelectorAll(".page-link-pagination").forEach(a=>{a.addEventListener("click",()=>{Cards.scrollIntoView({behavior:"smooth"}),Cards.innerHTML="",paginationNumbers.innerHTML="",page=parseInt(a.innerHTML)-1,console.log(page),getPropiedades(values=[localStorage.getItem("storageCondicion"),localStorage.getItem("storageTipo"),],page)})})}function renderPropiedades(b){for(let a=0;a<b.data.rows.length;a++)(newCard=document.createElement("div")).classList.add("card"),newCard.classList.add("mb-3"),newCard.innerHTML=` 
    <div class"container-fluid m-5">
          <div class="row  ">
            <div class="col-lg-5 col-md-6 card-img-container">
              <img class="card-img" src="../img/${b.data.rows[a].img[0].nombre}" alt="">
            </div>
            <div class="col-lg-7 col-md-6">
              <div class="card-body">
                <h5 class="card-title">${b.data.rows[a].nombre}</h5>
                <p class="card-text">${b.data.rows[a].descripcion}</p>
                <button id="${a}" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Ver mas
                </button>
              </div>
            </div>
          </div>
      </div>
               
            `,Cards.appendChild(newCard);modalButton(b)}function renderSearchBoxcondiciones(b){(newSearchElement=document.createElement("select")).classList.add("form-select"),newSearchElement.id="inputGroupSelect01";for(let a=0;a<b.condiciones.length;a++)optionsCondiciones.push(`<option value="${b.condiciones[a].id}">${b.condiciones[a].condicion}</option>`);newSearchElement.innerHTML=optionsCondiciones,condicionSearchBox.appendChild(newSearchElement)}function renderSearchBoxtipos(b){(newSearchElement=document.createElement("select")).classList.add("form-select"),newSearchElement.id="inputGroupSelect02";for(let a=0;a<b.tipos.length;a++)optionsTipos.push(`<option value="${b.tipos[a].id}">${b.tipos[a].tipo}</option>`);newSearchElement.innerHTML=optionsTipos,tipoSearchBox.appendChild(newSearchElement)}window.addEventListener("load",()=>{document.getElementById("loader").classList.toggle("loader2")}),getTipos(),getCondicion(),nuevaBusqueda.addEventListener("click",()=>{location.reload()}),btnSubmit.addEventListener("click",()=>{Cards.innerHTML="",paginationNumbers.innerHTML="";let a=document.getElementById("inputGroupSelect01"),b=a.options[a.selectedIndex].value;localStorage.setItem("storageCondicion",b);let c=document.getElementById("inputGroupSelect02"),d=c.options[c.selectedIndex].value;localStorage.setItem("storageTipo",d),values.push(b,d),Cards.scrollIntoView({behavior:"smooth"}),getPropiedades(values,page),values=[]})

