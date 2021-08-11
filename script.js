$(document).ready(function(){

  $('#menu-bar').click(function(){
      $(this).toggleClass('fa-times');
      $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('load scroll',function(){

      $('#menu-bar').removeClass('fa-times');
      $('.navbar').removeClass('nav-toggle');

      $('section').each(function(){

          let top = $(window).scrollTop();
          let height = $(this).height();
          let id = $(this).attr('id');
          let offset = $(this).offset().top - 200;

          if(top > offset && top < offset + height){
              $('.navbar ul li a').removeClass('active');
              $('.navbar').find(`[href="#${id}"]`).addClass('active');
          }

      });

  });

  $('.list .btn').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
  });

  $('.listInside .btnInside').click(function(){
    $(this).addClass('active').siblings().removeClass('active');
});

});

/*swiper */
const slider = document.querySelector(".scroll");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", e => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
});
slider.addEventListener("mousemove", e => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = x - startX;
  slider.scrollLeft = scrollLeft - walk;
});

/*CATEGORIES*/

/*LANCHES*/
var Usrdata = document.querySelector('.box');

var catLanches = [
  {
    id: 'tab1-1',
    number: 1,
    name:"X-Tudo",
    description: "Hambúrguer, bacon, salsicha, ovo, queijo, presunto, catupiry, alface, tomate, milho, molho.",
    price:"R$13,00",
    img: "https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/5eb9968f-d1b0-4731-a7f8-34c8ac1e08e8/5eb9968f-d41c-4a6e-987d-34c8ac1e08e8.jpg",
    display: "display:flex"
  },
  {
    id: 'tab1-2',
    number: 2,
    name:"X-Calabresa",
    description: "Hambúrguer, calabresa, queijo, cebola, alface, tomate, molho.",
    price:"R$10,00",
    img: "https://lh3.googleusercontent.com/proxy/EC5P46XxUB-M2_9A5RDLqPIVkcnIrr0P3z7n9GzON__Ls-WxgxUzNDEG-z0pl-w6nz61U08iClojMx_XzCvJKVcBo4PTo9AoAw1TmraW3ZOMFYdcEIhbiP9Yy1h7L48CB8O5ff_rXL-wS3XTR9cDTgEZpnQLUzqRDA",
    display: "display:none"
  },
  {
    id: 'tab1-3',
    number: 3,
    name:"X-Egg",
    description: "Hambúrguer, ovo, queijo, alface, tomate, molho.",
    price:"R$9,00",
    img: "https://burguershow.com.br/admin/DiretorioImagens/36592722000120/ControleImagens/PROD_49/PROD_57.png",
    display: "display:none"
  },
  {
    id: 'tab1-4',
    number: 4,
    name:"Americano",
    description: "Queijo, presunto, ovo, alface, tomate.",
    price:"R$7,50",
    img: "https://www.seriouseats.com/thmb/H9nLJD4bpoY1EsWjVmCB5RjF0bA=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__2020__02__20200114-nduja-recipes-11-2e20f84be97e4cad87b953d7d391d50c.jpg",
    display: "display:none"
  },
  {
    id: 'tab1-5',
    number: 5,
    name:"X-Salada",
    description: "Hambúrguer, alface, tomate, milho.",
    price:"R$7,00",
    img: "https://www.receiteria.com.br/wp-content/uploads/Receitas-de-x-salada-1.jpg",
    display: "display:none"
  },
  {
    id: 'tab1-6',
    number: 6,
    name:"X-Frango",
    description: "Peito de frango, queijo, alface, tomate, molho.",
    price:"R$7,00",
    img: "https://www.tiobak.com.br/main/uploads/2021_05/images/resized/x-caipira[700x420].png",
    display: "display:none"
  },
  {
    id: 'tab1-7',
    number: 7,
    name:"X-Burguer",
    description: "Hambúrguer, bacon, salsicha, ovo, queijo, presunto, catupiry, alface, tomate, milho, molho.",
    price:"R$6,00",
    img: "https://www.sopacultural.com/wp-content/uploads/2021/05/X-Burguer-Castelo-Branco-Vini-Bordalo.jpeg",
    display: "display:none"
  },
  {
    id: 'tab1-8',
    number: 8,
    name:"Mistão",
    description: "Hambúrguer, queijo, molho.",
    price:"R$5,00",
    img: "https://img.cybercook.com.br/receitas/788/misto-quente-360x220.jpeg",
    display: "display:none"
  }
]

document.getElementById('catLanches').innerHTML = catLanches.map(prod => 
    `<div>
      <div id="${prod.id}" class="row tabone" data-aos="fade-right" style="${prod.display}">
        <div class="image" data-aos="fade-left">
            <img src="${prod.img}" alt="${prod.name}" onclick={console.log("cliquei")}>
        </div>

        <div class="content">
            <div class="info">
                <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
                <p>${prod.description}</p>
            </div>
        </div>
      </div>
    </div>`
).join('')