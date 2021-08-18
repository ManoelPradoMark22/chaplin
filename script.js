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

/*SESSÃO 1
LANCHES*/
var Usrdata = document.querySelector('.box');

var catLanches = [
  {
    id: '1tab1.1',
    number: 1,
    name:"X-Tudo",
    description: "Hambúrguer, bacon, salsicha, ovo, queijo, presunto, catupiry, alface, tomate, milho, molho.",
    price:"R$13,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/228982349_116403880734492_7546688830169748149_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=OBhionX2qt4AX9zMz5f&_nc_ht=scontent.fvdc3-1.fna&oh=9375b31d749fba0f55e98f9d4e661443&oe=6142FCE3",
    display: "display:flex"
  },
  {
    id: '1tab1.2',
    number: 2,
    name:"X-Calabresa",
    description: "Hambúrguer, calabresa, queijo, cebola, alface, tomate, molho.",
    price:"R$10,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/229922661_116404507401096_5192594160246130830_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=AUUV8wHMT3kAX_Rsqav&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=78c289de1b6b8bff68917bf6fdda3285&oe=61403A89",
    display: "display:none"
  },
  {
    id: '1tab1.3',
    number: 3,
    name:"X-Egg",
    description: "Hambúrguer, ovo, queijo, alface, tomate, molho.",
    price:"R$9,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/p526x296/234648403_116404864067727_4274334103086826176_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=xiunFLgqfhIAX8_vunB&_nc_ht=scontent.fvdc3-1.fna&oh=ae00da9ad7acea9d30e249dcec2bf741&oe=61439B9F",
    display: "display:none"
  },
  {
    id: '1tab1.4',
    number: 4,
    name:"Americano",
    description: "Queijo, presunto, ovo, alface, tomate.",
    price:"R$7,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233427102_116405447401002_3188619586584457176_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=Z43iCrs4kiQAX9W-SSv&_nc_ht=scontent.fvdc3-1.fna&oh=4d0435308c02a6a87ba0422f19c5c24a&oe=61427025",
    display: "display:none"
  },
  {
    id: '1tab1.5',
    number: 5,
    name:"X-Salada",
    description: "Hambúrguer, alface, tomate, milho.",
    price:"R$7,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/229709333_116403054067908_1695209198032983876_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=4ekORxcHkf4AX8EfbUx&_nc_ht=scontent.fvdc3-1.fna&oh=0fc96348b594cb173199eb089e19ad28&oe=6142D6E7",
    display: "display:none"
  },
  {
    id: '1tab1.6',
    number: 6,
    name:"X-Frango",
    description: "Peito de frango, queijo, alface, tomate, molho.",
    price:"R$7,00",
    img: "https://scontent.fvdc6-1.fna.fbcdn.net/v/t1.6435-9/s640x640/230485402_116604577381089_5371820810698774108_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=JH1mpGV1Q5oAX_H2eKr&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc6-1.fna&oh=c7ddd4cda85f2c097049626d1fdfe56b&oe=6140C3B1",
    display: "display:none"
  },
  {
    id: '1tab1.7',
    number: 7,
    name:"X-Burguer",
    description: "Hambúrguer, bacon, salsicha, ovo, queijo, presunto, catupiry, alface, tomate, milho, molho.",
    price:"R$6,00",
    img: "https://scontent.fvdc6-1.fna.fbcdn.net/v/t1.6435-9/239448457_116605857380961_5138412958336672385_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=U5BKHUpdNroAX_Y_LOr&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc6-1.fna&oh=318bddf52d420bd29ecb9bdb3aa5ef9d&oe=614332D0",
    display: "display:none"
  },
  {
    id: '1tab1.8',
    number: 8,
    name:"Mistão",
    description: "Hambúrguer, queijo, molho.",
    price:"R$5,00",
    img: "https://scontent.fvdc6-1.fna.fbcdn.net/v/t1.6435-9/235818218_116606420714238_3907036065709012017_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=3IehahWSg8QAX-IfhLY&_nc_ht=scontent.fvdc6-1.fna&oh=9449fa67d6c9548653493cce22ea87dd&oe=61439773",
    display: "display:none"
  }
]

document.getElementById('catLanches').innerHTML = catLanches.map(prod => 
    `<div>
      <div id="${prod.id}" class="row tabLanches" data-aos="fade-right" style="${prod.display}">
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

/*PORCOES*/
var catPorcoes = [
  {
    id: '1tab2.1',
    number: 1,
    name:"Frango e Batata com Cheddar e Bacon",
    description: "sdk dask dajks k",
    price:"R$28,00",
    img: "https://help.grandchef.com.br/wp-content/uploads/2021/04/frango-no-balde.jpg",
    display: "display:flex"
  },
  {
    id: '1tab2.2',
    number: 2,
    name:"Frango",
    description: "sdk dask dajks k",
    price:"R$16,00",
    img: "https://amp.receitadevovo.com.br/wp-content/uploads/2020/10/empanados-de-frango.jpg",
    display: "display:none"
  },
  {
    id: '1tab2.3',
    number: 3,
    name:"Batata com Cheddar e Bacon",
    description: "sdk dask dajks k",
    price:"R$12,00",
    img: "https://coolicias.ao/wp-content/uploads/2019/11/Receita-de-Batata-frita-com-queijo-e-recheio-de-bacon-TudoGostoso-1200x900.jpeg",
    display: "display:none"
  },
  {
    id: '1tab2.4',
    number: 4,
    name:"Batata com Cheddar",
    description: "sdk dask dajks k",
    price:"R$10,00",
    img: "https://thumb-cdn.soluall.net/prod/shp_products/sp1280fw/5f04bee3-e350-4217-b28c-2b7dac1e00a3/5f04bee3-5a2c-480c-9d82-2b7dac1e00a3.png",
    display: "display:none"
  },
  {
    id: '1tab2.5',
    number: 5,
    name:"Batata com Bacon",
    description: "sdk dask dajks k",
    price:"R$10,00",
    img: "https://1.bp.blogspot.com/--4fFFHJly2Y/WW9O_eVKROI/AAAAAAAA3zg/RqFPla1YTnw8-kDPRUoM53wpguklpM-dACLcBGAs/s640/wendys-bacon-queso-fries-01.JPG",
    display: "display:none"
  },
  {
    id: '1tab2.6',
    number: 6,
    name:"Batata Frita",
    description: "sdk dask dajks k",
    price:"R$8,00",
    img: "https://pilotandofogao.com.br/wp-content/uploads/2019/01/Batata-Frita-Crocante.jpg",
    display: "display:none"
  },
  {
    id: '1tab2.7',
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
    <div id="${prod.id}" class="row tabPorcoes" data-aos="fade-right" style="${prod.display}">
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
    id: '1tab3.1',
    number: "01",
    name:"Esfirra de frango",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://www.kideliciasalgados.com.br/wp-content/uploads/2019/11/esfiha_frango_brocolis_kidelicia.png",
    display: "display:flex"
  },
  {
    id: '1tab3.2',
    number: "02",
    name:"Esfirra de carne",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://amordereceita.com.br/wp-content/uploads/2021/04/Esfira_de_Carne_fechada.jpg",
    display: "display:none"
  },
  {
    id: '1tab3.3',
    number: "03",
    name:"Esfirra de queijo e presunto",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://img.cybercook.com.br/imagens/receitas/289/esfiha-de-presunto-e-cream-cheese.jpg",
    display: "display:none"
  },
  {
    id: '1tab3.4',
    number: "04",
    name:"Esfirra de frango com catupiry",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://lh3.googleusercontent.com/proxy/Z5u3HuL9Lv2IkuXxExJAVr4R2DvVD5UXZU4ni0zjgYVZpBmid0TnlzEgI2dtwUekfClLaTxthE-MaqnWqImnpzQ3xu0W3C7hq-9V1f1t5GjQ53A_hw",
    display: "display:none"
  },
  {
    id: '1tab3.5',
    number: "05",
    name:"Esfirra de frango com cheddar",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://lh3.googleusercontent.com/proxy/7g-NNEh-deKE7qQNDLFmFImFGXdkip2gMvgv8rZCB805AkqT4W4H9so-JUMBgLAoJswvl7mxigbfGYSdjX1AN90_6UZLgrCG98SRYVepn23xTbArXLybAy-3MHVdTm4HYZ992oNF6vP8TguJjgda5JD5LXma",
    display: "display:none"
  },
  {
    id: '1tab3.6',
    number: "06",
    name:"Esfirra de calabresa com queijo",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://levitazero.com.br/shop/wp-content/uploads/2019/02/Produto-Esfiha-Calabresa-190210a.jpg",
    display: "display:none"
  },
  {
    id: '1tab3.7',
    number: "07",
    name:"Esfirra de calabresa com queijo e cheddar",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://570341-1841894-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2019/11/esfirra-de-calabresa.jpg",
    display: "display:none"
  },
  {
    id: '1tab3.8',
    number: "08",
    name:"Hamburgão",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://i.ytimg.com/vi/ZErHTOws2AU/maxresdefault.jpg",
    display: "display:none"
  },
  {
    id: '1tab3.9',
    number: "09",
    name:"Bauru",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://obasuperatacado-img.azureedge.net/product/7681-bauru-assado-frango-kg-prom-g.jpg",
    display: "display:none"
  },
  {
    id: '1tab3.10',
    number: "10",
    name:"Enroladinho de Salsicha",
    description: "sdk dask dajks k",
    price:"R$3,00",
    img: "https://bellamassa.com.br/wp-content/uploads/2018/12/enroladinho-salsicha-post.jpg",
    display: "display:none"
  },
]

document.getElementById('catSalgAssados').innerHTML = catSalgAssados.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabSalgAssados" data-aos="fade-right" style="${prod.display}">
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

/*SALGADOS FRITOS*/
var catSalgFritos = [
  {
    id: '1tab4.1',
    number: "01",
    name:"Coxinha",
    description: "sdk dask dajks k",
    price:"R$3,00",
    img: "https://s2.glbimg.com/3yEPNnGtV9kKZHFEXD8zoz7CZAI=/0x0:1280x854/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2020/k/C/CyeFFuSSKLrOop79XWoQ/coxinha.jpeg",
    display: "display:flex"
  },
  {
    id: '1tab4.2',
    number: "02",
    name:"Risoles de Carne",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://meucadernodereceitas.xyz/wp-content/uploads/2021/03/Risoles-de-Carne-Moida-Meu-Caderno-de-Receitas.png",
    display: "display:none"
  },
  {
    id: '1tab4.3',
    number: "03",
    name:"Risoles de Pizza",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/219957861_116279110746969_4943552752224603272_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=OopR2_sAgFsAX9ZZDuF&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=73b3bad7ece85f3693537e65d52cf38d&oe=61410408",
    display: "display:none"
  },
  {
    id: '1tab4.4',
    number: "04",
    name:"Enroladinho de Salsicha",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://xtudoreceitas.com/wp-content/uploads/Enroladinho-de-Salsicha-Frito-480x270.jpg",
    display: "display:none"
  },
  {
    id: '1tab4.5',
    number: "05",
    name:"Enroladinho de queijo e presunto",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://aquelareceita.com.br/wp-content/uploads/2020/10/Enroladinho-de-Presunto-e-Queijo-Sem-Massa.00_03_33_06.Still002FB.png",
    display: "display:none"
  },
  {
    id: '1tab4.6',
    number: "06",
    name:"Kibe",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://pratofundo.com/wp-content/uploads/fly-images/4975/kibe2017-015-500x500-c.jpg",
    display: "display:none"
  },
  {
    id: '1tab4.7',
    number: "07",
    name:"Steak de Frango",
    description: "sdk dask dajks k",
    price:"R$3,00",
    img: "https://www.lar.ind.br/wp-content/uploads/2020/12/Steak.png",
    display: "display:none"
  },
]

document.getElementById('catSalgFritos').innerHTML = catSalgFritos.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabSalgFritos" data-aos="fade-right" style="${prod.display}">
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

/* Sessão 2
PIZZARIA (2tab1)*/
var catPizzas = [
  {
    id: '2tab1.1',
    number: 1,
    name:"Tradicional",
    description: "Queijo, presunto, milho, tomate.",
    img: "https://img.riomarevoce.com/fortalezashopping/2020/06/pizza_mussarela_vignoli_expresso_riomar_fortaleza.jpg",
    display: "display:flex"
  },
  {
    id: '2tab1.2',
    number: 2,
    name:"Calabresa",
    description: "Queijo, calabresa, cebola.",
    img: "https://coolicias.ao/wp-content/uploads/2020/01/Receita-de-Pizza-de-liquidificador-Diferente-Pode-Adicionar-Calabresa.jpg",
    display: "display:none"
  },
  {
    id: '2tab1.3',
    number: 3,
    name:"Caipira",
    description: "Queijo, frango desfiado, milho, tomate, cebola.",
    img: "https://mezzani.com.br/wp-content/uploads/2019/08/pizza-com-pedacos-de-carne-de-frango-tomate-milho-e-queijo_116500-20-1.jpg",
    display: "display:none"
  },
  {
    id: '2tab1.4',
    number: 4,
    name:"Portuguesa",
    description: "Queijo, presunto, ovo, tomate, azeitona, cebola.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234517260_114414477600099_3761092935236468369_n.jpg?_nc_cat=100&ccb=1-4&_nc_sid=730e14&_nc_ohc=JuFKK7Mhw1YAX_9LxjG&_nc_ht=scontent.fvdc3-1.fna&oh=b0a22d5d2d1183ad63dfedbe3643c9a8&oe=6139F718",
    display: "display:none"
  },
  {
    id: '2tab1.5',
    number: 5,
    name:"Frango Catupiry",
    description: "Queijo, frango, catupiry.",
    img: "https://padarianutrivida.com.br/web/image/product.template/3463/image_1024?unique=d167039",
    display: "display:none"
  },
  {
    id: '2tab1.6',
    number: 6,
    name:"Carne Seca",
    description: "Carne seca, muçarela, azeitona, cebola.",
    img: "https://www.redelevepizza.com.br/assets/imagens/pizzas/022/carne-seca-assada.jpg",
    display: "display:none"
  },
  {
    id: '2tab1.7',
    number: 7,
    name:"Atum",
    description: "Atum, muçarela, azeitona, cebola.",
    img: "https://maniadeesfiha.com.br/wp-content/uploads/2019/03/0910201210466229235099.jpg",
    display: "display:none"
  },
]

document.getElementById('catPizzas').innerHTML = catPizzas.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabPizzas" data-aos="fade-right" style="${prod.display}">
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

/* Sessão 3 - SORVETERIA
 Açaís (3tab1)*/
var catAcais = [
  {
    id: '3tab1.1',
    number: 1,
    name:"Açaí PP (250ml)",
    description: "Açaí dasjd sad asl fas lfas lfasl fa",
    price:"R$5,00",
    img: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2140192:1590239263/Pit-Stop.jpg?f=default&$p$f=543206a",
    display: "display:flex"
  },
  {
    id: '3tab1.2',
    number: 2,
    name:"Açaí P (300ml)",
    description: "Açaí dasjd sad asl fas lfas lfasl fa",
    price:"R$7,00",
    img: "https://media-cdn.tripadvisor.com/media/photo-s/19/72/b6/df/acai.jpg",
    display: "display:none"
  },
  {
    id: '3tab1.3',
    number: 3,
    name:"Açaí M (400ml)",
    description: "Açaí dasjd sad asl fas lfas lfasl fa",
    price:"R$10,00",
    img: "https://diariodonordeste.verdesmares.com.br/image/contentid/policy:1.2140192:1590239263/Pit-Stop.jpg?f=default&$p$f=543206a",
    display: "display:none"
  },
  {
    id: '3tab1.4',
    number: 4,
    name:"Açaí G (500ml)",
    description: "Açaí dasjd sad asl fas lfas lfasl fa",
    price:"R$12,00",
    img: "https://media-cdn.tripadvisor.com/media/photo-s/19/72/b6/df/acai.jpg",
    display: "display:none"
  }
]

document.getElementById('catAcais').innerHTML = catAcais.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabAcais" data-aos="fade-right" style="${prod.display}">
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