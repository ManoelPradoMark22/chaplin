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
            <img src="${prod.img}" alt="${prod.name}">
        </div>

        <div class="content">
            <div class="info">
                <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
                <text class="priceCatalog">${prod.price}</text>
                <p>${prod.description}</p>
            </div>
        </div>
      </div>
    </div>`
).join('')


/*PIZZAS */
var catPizzas = [
  {
    id: 'tab2-1',
    number: 1,
    name:"Tradicional",
    description: "Queijo, presunto, milho, tomate.",
    img: "https://img.riomarevoce.com/fortalezashopping/2020/06/pizza_mussarela_vignoli_expresso_riomar_fortaleza.jpg",
    display: "display:flex"
  },
  {
    id: 'tab2-2',
    number: 2,
    name:"Calabresa",
    description: "Queijo, calabresa, cebola.",
    img: "https://coolicias.ao/wp-content/uploads/2020/01/Receita-de-Pizza-de-liquidificador-Diferente-Pode-Adicionar-Calabresa.jpg",
    display: "display:none"
  },
  {
    id: 'tab2-3',
    number: 3,
    name:"Caipira",
    description: "Queijo, frango desfiado, milho, tomate, cebola.",
    img: "https://mezzani.com.br/wp-content/uploads/2019/08/pizza-com-pedacos-de-carne-de-frango-tomate-milho-e-queijo_116500-20-1.jpg",
    display: "display:none"
  },
  {
    id: 'tab2-4',
    number: 4,
    name:"Portuguesa",
    description: "Queijo, presunto, ovo, tomate, azeitona, cebola.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234517260_114414477600099_3761092935236468369_n.jpg?_nc_cat=100&ccb=1-4&_nc_sid=730e14&_nc_ohc=JuFKK7Mhw1YAX_9LxjG&_nc_ht=scontent.fvdc3-1.fna&oh=b0a22d5d2d1183ad63dfedbe3643c9a8&oe=6139F718",
    display: "display:none"
  },
  {
    id: 'tab2-5',
    number: 5,
    name:"Frango Catupiry",
    description: "Queijo, frango, catupiry.",
    img: "https://padarianutrivida.com.br/web/image/product.template/3463/image_1024?unique=d167039",
    display: "display:none"
  },
  {
    id: 'tab2-6',
    number: 6,
    name:"Carne Seca",
    description: "Carne seca, muçarela, azeitona, cebola.",
    img: "https://www.redelevepizza.com.br/assets/imagens/pizzas/022/carne-seca-assada.jpg",
    display: "display:none"
  },
  {
    id: 'tab2-7',
    number: 7,
    name:"Atum",
    description: "Atum, muçarela, azeitona, cebola.",
    img: "https://maniadeesfiha.com.br/wp-content/uploads/2019/03/0910201210466229235099.jpg",
    display: "display:none"
  },
]

document.getElementById('catPizzas').innerHTML = catPizzas.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabtwo" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
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

/*PORCOES*/
var catPorcoes = [
  {
    id: 'tab3-1',
    number: 1,
    name:"Frango e Batata com Cheddar e Bacon",
    description: "sdk dask dajks k",
    price:"R$28,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:flex"
  },
  {
    id: 'tab3-2',
    number: 2,
    name:"Frango",
    description: "sdk dask dajks k",
    price:"R$16,00",
    img: "https://amp.receitadevovo.com.br/wp-content/uploads/2020/10/empanados-de-frango.jpg",
    display: "display:none"
  },
  {
    id: 'tab3-3',
    number: 3,
    name:"Batata com Cheddar e Bacon",
    description: "sdk dask dajks k",
    price:"R$12,00",
    img: "https://coolicias.ao/wp-content/uploads/2019/11/Receita-de-Batata-frita-com-queijo-e-recheio-de-bacon-TudoGostoso-1200x900.jpeg",
    display: "display:none"
  },
  {
    id: 'tab3-4',
    number: 4,
    name:"Batata com Cheddar",
    description: "sdk dask dajks k",
    price:"R$10,00",
    img: "https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/5f04bee3-e350-4217-b28c-2b7dac1e00a3/5f04bee3-5a2c-480c-9d82-2b7dac1e00a3.png",
    display: "display:none"
  },
  {
    id: 'tab3-5',
    number: 5,
    name:"Batata com Bacon",
    description: "sdk dask dajks k",
    price:"R$10,00",
    img: "https://1.bp.blogspot.com/--4fFFHJly2Y/WW9O_eVKROI/AAAAAAAA3zg/RqFPla1YTnw8-kDPRUoM53wpguklpM-dACLcBGAs/s640/wendys-bacon-queso-fries-01.JPG",
    display: "display:none"
  },
  {
    id: 'tab3-6',
    number: 6,
    name:"Batata Frita",
    description: "sdk dask dajks k",
    price:"R$8,00",
    img: "https://pilotandofogao.com.br/wp-content/uploads/2019/01/Batata-Frita-Crocante.jpg",
    display: "display:none"
  },
  {
    id: 'tab3-7',
    number: 7,
    name:"Frango a passarinho",
    description: "sdk dask dajks k",
    price:"R$22,00",
    img: "https://www.supermercadosmundial.com.br/content/816x480/gHYV58ha9m9KxcCN.png",
    display: "display:none"
  }
]

document.getElementById('catPorcoes').innerHTML = catPorcoes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabthree" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
          </div>
      </div>
    </div>
  </div>`
).join('')

/*SALGADOS ASSADOS*/
var catSalgAssados = [
  {
    id: 'tab4-1',
    number: "01",
    name:"Esfirra de frango",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:flex"
  },
  {
    id: 'tab4-2',
    number: "02",
    name:"Esfirra de carne",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-3',
    number: "03",
    name:"Esfirra de queijo e presunto",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-4',
    number: "04",
    name:"Esfirra de frango com catupiry",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-5',
    number: "05",
    name:"Esfirra de frango com cheddar",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-6',
    number: "06",
    name:"Esfirra de calabresa com queijo",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-7',
    number: "07",
    name:"Esfirra de calabresa com queijo e cheddar",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-8',
    number: "08",
    name:"Hamburgão",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-9',
    number: "09",
    name:"Bauru",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
  {
    id: 'tab4-10',
    number: "10",
    name:"Enroladinho de Salsicha",
    description: "sdk dask dajks k",
    price:"R$3,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:none"
  },
]

document.getElementById('catSalgAssados').innerHTML = catSalgAssados.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabfour" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
          </div>
      </div>
    </div>
  </div>`
).join('')