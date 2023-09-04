"use strict"

let nav = document.querySelector(".desplegable");
let ul_items = document.querySelector(".ul_items");


menu.onclick = function (){
    menu.classList.toggle("open_menu");
    nav.classList.toggle('active');
    change();
}

let menu_share = document.querySelector(".menu-share");

document.querySelector(".share").addEventListener('click', () => {
    menu_share.classList.toggle('menu-share-show');
});

function change() {
    const elements = document.querySelectorAll(".elem");
    for (const element of elements) {
      element.classList.toggle("transformed-state");
    }
  }

// carrousel 

  let card_box1 = document.querySelector(".carr_1");
  let card_box2 = document.querySelector(".carr_2");
  let card_box3 = document.querySelector(".carr_3");
  let card_box4 = document.querySelector(".carr_4");
  let arrow_icons = document.querySelectorAll(".card_icon svg");

  for (let x=0;x<arrow_icons.length;x++){
    if(x==0||x==1){
      arrow_icons[x].addEventListener("click", ()=> { card_box1.scrollLeft += arrow_icons[x].id === "card_icon_left1" ? -350 : 350});
    } else if(x==2||x==3){
      arrow_icons[x].addEventListener("click", ()=> { card_box2.scrollLeft += arrow_icons[x].id === "card_icon_left2" ? -350 : 350});
    } else if(x==4||x==5){
      arrow_icons[x].addEventListener("click", ()=> { card_box3.scrollLeft += arrow_icons[x].id === "card_icon_left3" ? -350 : 350});
    } else{
      arrow_icons[x].addEventListener("click", ()=> { card_box4.scrollLeft += arrow_icons[x].id === "card_icon_left4" ? -350 : 350});
  }
}

  let isDragging = false;

   let dragStop = () => {
     isDragging = false;
     card_box1.classList.remove("dragging");
     card_box2.classList.remove("dragging");
     card_box3.classList.remove("dragging");
     card_box4.classList.remove("dragging");
   }

  
   card_box1.addEventListener("mousemove", (e) =>{
    if(!isDragging) return;

    card_box1.classList.add("dragging");
    card_box1.scrollLeft -= e.movementX;
   });
   card_box2.addEventListener("mousemove", (e) =>{
    if(!isDragging) return;

    card_box2.classList.add("dragging");
    card_box2.scrollLeft -= e.movementX;
   });
   card_box3.addEventListener("mousemove", (e) =>{
    if(!isDragging) return;

    card_box3.classList.add("dragging");
    card_box3.scrollLeft -= e.movementX;
   });
   card_box4.addEventListener("mousemove", (e) =>{
    if(!isDragging) return;

    card_box4.classList.add("dragging");
    card_box4.scrollLeft -= e.movementX;
   });

   card_box1.addEventListener("mousedown", () => isDragging = true);
   card_box2.addEventListener("mousedown", () => isDragging = true);
   card_box3.addEventListener("mousedown", () => isDragging = true);
   card_box4.addEventListener("mousedown", () => isDragging = true);
   document.addEventListener("mouseup", dragStop);

  // llenar carrouseles
  function fill_cardbox(obj) {

    obj.forEach(function(info) {

        let card = document.createElement("li");
        card.style.width = "190px";
        card.classList.add("card");
        card.style.background = "url(" + info.img + ")";
        card.style.backgroundSize = "contain";
        card.style.backgroundRepeat = "no-repeat";
        card.style.backgroundPosition = "center";
        let card_info = document.createElement("div");
        card_info.classList.add("card_info");
        let title = document.createElement("h3");
        title.innerHTML = info.name;
        title.classList.add("title");
        let div = document.createElement("div");
        let button = document.createElement("button");
        if(info.state == 'play') {
            button.classList.add("play_btn");
            button.innerHTML = "Play";
        } else {
            button.classList.add("buy_btn");
            button.innerHTML = "Buy";
            let price = document.createElement("p");
            price.innerHTML = info.price;    
            price.classList.add("price");
            div.appendChild(price);
        }

        div.appendChild(button);
        card_info.appendChild(title);
        card_info.appendChild(div);
        card.appendChild(card_info);

        if(info.categ == 'accion'){
            document.querySelector(".carr_2").appendChild(card);
        } else if(info.categ == 'table'){
            document.querySelector(".carr_3").appendChild(card);
        } else if(info.categ == 'most_play'){
            document.querySelector(".carr_4").appendChild(card);
          } else {
          document.querySelector(".carr_1").appendChild(card);
        }
    })
  }




fill_cardbox(obj);
