let productsInCart = JSON.parse(sessionStorage.getItem('shoppingCart'));
if(!productsInCart){
	productsInCart = [];
}

const parentElement = document.querySelector('#buyItems');

function convertToReal(value) {
  const valueConverted = value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
  return valueConverted;
}

const updateShoppingCartHTML = function () {  // 3
	sessionStorage.setItem('shoppingCart', JSON.stringify(productsInCart));
	if (productsInCart.length > 0) {
    let numberOfItens = 0;
		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.img}">
					<div>
						<h5 class="cartProdName">${product.name}</h5>
						<h6>${convertToReal(product.priceNumb)}</h6>
            <div class="adittionals">${product.adittionals ? product.adittionals : ''}</div>
						<div>
							<button class="button-minus" data-id=${product.id} 
              onclick="changeCountOfItens('${product.id}', false)"
              >-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}
              onclick="changeCountOfItens('${product.id}', true)"
              >+</button>
						</div>
					</div>
				</li>`
		});

    let stringItems = 'Olá! O meu pedido é:';
    
    productsInCart.map(prod => {
      numberOfItens = numberOfItens + prod.count;
      stringItems = `${stringItems}\n- *${prod.name}* (${prod.count} unid.) [${convertToReal(prod.priceNumb)}]${prod.adittionals ? ` \n${prod.isPizza ? 'Sabor:' : 'Complemento:'} _${prod.adittionals}_` : ''}`;
    });
    
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
    document.getElementById("badgeId").innerHTML = `${numberOfItens>99 ? '<i class="fas fa-infinity" style="font-size: 0.9rem"></i>' : numberOfItens}`;
    document.getElementById("buttonWhatsapp").href=`https://api.whatsapp.com/send?phone=+5577991998770&text=${encodeURI(stringItems)}`;
		/*cartSumPrice.innerHTML = '$' + countTheSumPrice(); */

	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
		parentElement.innerHTML = '<h4 class="empty">Sua sacola está vazia!</h4>';
    document.getElementById("badgeId").innerHTML = '0';
		/*cartSumPrice.innerHTML = ''; */
	}
}

function addItemToCart(prodObj) {
  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == prodObj.id) {
			productsInCart[i].count = productsInCart[i].count + 1;
			productsInCart[i].priceNumb = productsInCart[i].priceOne*productsInCart[i].count;
      updateShoppingCartHTML();
			return;
		}
	}
	productsInCart.push(prodObj);
  updateShoppingCartHTML();
}

function addAcaiToCart() {
  let adittionalsString = '';

  additionals.map(add => {
    if (add.selected) {
      adittionalsString = `${adittionalsString}${add.name}-`;
    }
  })

  let idString = `ACAI-${catAcais[0].priceOriginalAcai}.${adittionalsString}`;

  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id === idString) {
			productsInCart[i].count = productsInCart[i].count + 1;
			productsInCart[i].priceNumb = catAcais[0].priceTotalAcai*productsInCart[i].count;
      updateShoppingCartHTML();
			return;
		}
	}

  let acaiObj = {
    id: `${idString}`,
    name: `${catAcais[0].name}`,
    adittionals: `${adittionalsString==='' ? 'Sem adicionais' : adittionalsString}`,
    priceOne: catAcais[0].priceTotalAcai,
    priceNumb: catAcais[0].priceTotalAcai,
    img: `${catAcais[0].img}`,
    count: 1
  };

	productsInCart.push(acaiObj);
  updateShoppingCartHTML();
}

function changeCountOfItens(idProd, IsIncrease) {
  for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == idProd) {
      if (IsIncrease) {
        productsInCart[i].count = productsInCart[i].count + 1;
      } else {
        productsInCart[i].count = productsInCart[i].count - 1;
      }
			productsInCart[i].priceNumb = productsInCart[i].priceOne*productsInCart[i].count;
      if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
	}
  updateShoppingCartHTML();
}

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

  $('.boxAcaiSizes .acaiSizeInside').click(function(){
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

/*Cart functions*/

function closeCart() {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	/*document.querySelector('body').classList.toggle('stopScrolling') */
}

const openShopCart = document.querySelector('.bagDiv');
openShopCart.addEventListener('click', () => {
	const cart = document.querySelector('.producstOnCart');
	cart.classList.toggle('hide');
	/*document.querySelector('body').classList.toggle('stopScrolling'); */
});

/*close cart when click the closeButton */
const closeShopCart = document.querySelector('#closeButton');
closeShopCart.addEventListener('click', closeCart);
/*close cart when click on overlay */
const overlay = document.querySelector('.overlay');
overlay.addEventListener('click', closeCart);


/*CATEGORIES*/

/*SESSÃO 1
LANCHES*/
var Usrdata = document.querySelector('.box');

var catLanches = [
  {
    id: '1tab1.1',
    number: 1,
    name:"X-Tudo",
    description: "Hambúrguer, bacon, salsicha, ovo, queijo, presunto, catupiry, alface, tomate, milho e molho.",
    price:"R$13,00",
    priceNumb: 13.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/228982349_116403880734492_7546688830169748149_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=OBhionX2qt4AX9zMz5f&_nc_ht=scontent.fvdc3-1.fna&oh=9375b31d749fba0f55e98f9d4e661443&oe=6142FCE3",
    display: "display:flex"
  },
  {
    id: '1tab1.2',
    number: 2,
    name:"X-Calabresa",
    description: "Hambúrguer, calabresa, queijo, cebola, alface, tomate e molho.",
    price:"R$10,00",
    priceNumb: 10.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/229922661_116404507401096_5192594160246130830_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=AUUV8wHMT3kAX_Rsqav&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=78c289de1b6b8bff68917bf6fdda3285&oe=61403A89",
    display: "display:none"
  },
  {
    id: '1tab1.3',
    number: 3,
    name:"X-Egg",
    description: "Hambúrguer, ovo, queijo, alface, tomate e molho.",
    price:"R$9,00",
    priceNumb: 9.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/p526x296/234648403_116404864067727_4274334103086826176_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=xiunFLgqfhIAX8_vunB&_nc_ht=scontent.fvdc3-1.fna&oh=ae00da9ad7acea9d30e249dcec2bf741&oe=61439B9F",
    display: "display:none"
  },
  {
    id: '1tab1.4',
    number: 4,
    name:"Americano",
    description: "Queijo, presunto, ovo, alface e tomate.",
    price:"R$7,50",
    priceNumb: 7.50,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233427102_116405447401002_3188619586584457176_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=Z43iCrs4kiQAX9W-SSv&_nc_ht=scontent.fvdc3-1.fna&oh=4d0435308c02a6a87ba0422f19c5c24a&oe=61427025",
    display: "display:none"
  },
  {
    id: '1tab1.5',
    number: 5,
    name:"X-Salada",
    description: "Hambúrguer, alface, tomate e milho.",
    price:"R$7,00",
    priceNumb: 7.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/229709333_116403054067908_1695209198032983876_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=4ekORxcHkf4AX8EfbUx&_nc_ht=scontent.fvdc3-1.fna&oh=0fc96348b594cb173199eb089e19ad28&oe=6142D6E7",
    display: "display:none"
  },
  {
    id: '1tab1.6',
    number: 6,
    name:"X-Frango",
    description: "Peito de frango, queijo, alface, tomate e molho.",
    price:"R$7,00",
    priceNumb: 7.00,
    img: "https://scontent.fvdc6-1.fna.fbcdn.net/v/t1.6435-9/s640x640/230485402_116604577381089_5371820810698774108_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=JH1mpGV1Q5oAX_H2eKr&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc6-1.fna&oh=c7ddd4cda85f2c097049626d1fdfe56b&oe=6140C3B1",
    display: "display:none"
  },
  {
    id: '1tab1.7',
    number: 7,
    name:"X-Burguer",
    description: "Hambúrguer, bacon, salsicha, ovo, queijo, presunto, catupiry, alface, tomate, milho e molho.",
    price:"R$6,00",
    priceNumb: 6.00,
    img: "https://scontent.fvdc6-1.fna.fbcdn.net/v/t1.6435-9/239448457_116605857380961_5138412958336672385_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=U5BKHUpdNroAX_Y_LOr&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc6-1.fna&oh=318bddf52d420bd29ecb9bdb3aa5ef9d&oe=614332D0",
    display: "display:none"
  },
  {
    id: '1tab1.8',
    number: 8,
    name:"Mistão",
    description: "Hambúrguer, queijo e molho.",
    price:"R$5,00",
    priceNumb: 5.00,
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
                <button
                  class="btnCart btnCart-small addToCart"
                  data-product-id=${prod.id}
                  onclick="addItemToCart({
                    id: '${prod.id}',
                    name: '${prod.name}',
                    priceOne: ${prod.priceNumb},
                    priceNumb: ${prod.priceNumb},
                    img: '${prod.img}',
                    count: 1
                  })">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar item
                </button>
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
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232378070_117300867311460_8194682613149046208_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=ixoJgvgSW70AX-1xGqQ&_nc_ht=scontent.fvdc3-1.fna&oh=52d2a9bbabc6d8a7181a0f31b0032db9&oe=61445C42",
    display: "display:flex"
  },
  {
    id: '1tab2.2',
    number: 2,
    name:"Frango",
    description: "sdk dask dajks k",
    price:"R$16,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233132893_117300823978131_1758347187518323947_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=CH7hBQ0g4EcAX88zRX-&_nc_ht=scontent.fvdc3-1.fna&oh=8da4b24a9bfd3c199c9e62ccfb91153c&oe=6143B978",
    display: "display:none"
  },
  {
    id: '1tab2.3',
    number: 3,
    name:"Batata com Cheddar e Bacon",
    description: "sdk dask dajks k",
    price:"R$12,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233262635_117300590644821_1719707751774929036_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=LDqN8H8hDqUAX-2SH27&_nc_ht=scontent.fvdc3-1.fna&oh=c01ecfa5d908c705083ec0e07d46ca59&oe=6146847A",
    display: "display:none"
  },
  {
    id: '1tab2.4',
    number: 4,
    name:"Batata com Cheddar",
    description: "sdk dask dajks k",
    price:"R$10,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/235171800_117300657311481_5551938420942140045_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=AFZVaMHcRJgAX-Q5qZv&_nc_ht=scontent.fvdc3-1.fna&oh=05859381de2d1145ade4c3ac966257b7&oe=61451EC7",
    display: "display:none"
  },
  {
    id: '1tab2.5',
    number: 5,
    name:"Batata com Bacon",
    description: "sdk dask dajks k",
    price:"R$10,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232289142_117300527311494_5517302782081115995_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=QsHbFpqIH3wAX8qi2j-&_nc_ht=scontent.fvdc3-1.fna&oh=445c55f187d587312318f9e9b5b1db5d&oe=6144527B",
    display: "display:none"
  },
  {
    id: '1tab2.6',
    number: 6,
    name:"Batata Frita",
    description: "sdk dask dajks k",
    price:"R$8,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232130364_117300710644809_8564924637729767580_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=P7-5UDBKbacAX-oWHrw&_nc_ht=scontent.fvdc3-1.fna&oh=fbf30fa4a64e73bc38be16e68a8e565e&oe=6144797A",
    display: "display:none"
  },
  {
    id: '1tab2.7',
    number: 7,
    name:"Frango a passarinho",
    description: "sdk dask dajks k",
    price:"R$22,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240055901_117300777311469_2843962142386130061_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=OGap_RCubbIAX_uVR6S&_nc_ht=scontent.fvdc3-1.fna&oh=7b3c64b01446393bf21ed9547c899cd4&oe=614381B7",
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
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240394056_117294680645412_5292669921026068825_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=8Znl397nYd4AX8MScoH&_nc_ht=scontent.fvdc3-1.fna&oh=8fae60372c32847c4cdffc3dfc57af8b&oe=6145D041",
    display: "display:flex"
  },
  {
    id: '1tab3.2',
    number: "02",
    name:"Esfirra de carne",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/236299548_117294447312102_4444898762647027655_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=qhEC9qKeHdAAX-Os1Li&_nc_ht=scontent.fvdc3-1.fna&oh=64495db032c5ffcf2a4d64592433bd2e&oe=61448CDC",
    display: "display:none"
  },
  {
    id: '1tab3.3',
    number: "03",
    name:"Esfirra de queijo e presunto",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/236337351_117294380645442_94699090341248678_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=ChCE8FHxdYwAX80PdjC&_nc_ht=scontent.fvdc3-1.fna&oh=ad413928efe6b5ded03ef7f4243aa1c4&oe=614394F9",
    display: "display:none"
  },
  {
    id: '1tab3.4',
    number: "04",
    name:"Esfirra de frango com catupiry",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232227148_117294503978763_3382087541275160377_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=WCSHBNHi5bgAX8p_Aqs&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=d116ba20554ada90a55dc1b13ea0af23&oe=6146D1B2",
    display: "display:none"
  },
  {
    id: '1tab3.5',
    number: "05",
    name:"Esfirra de frango com cheddar",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233370570_117294630645417_4916506231140999812_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=dfOzeNE4JGUAX-8Aho8&_nc_ht=scontent.fvdc3-1.fna&oh=4d7b2f40cd6cc4989ebab2690744b4e6&oe=614584BB",
    display: "display:none"
  },
  {
    id: '1tab3.6',
    number: "06",
    name:"Esfirra de calabresa com queijo",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238534998_117294877312059_1264715566418216028_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=tgmASK5gL4MAX97I7Uj&_nc_ht=scontent.fvdc3-1.fna&oh=63857559794810ce6d848952fc33a11d&oe=6145939B",
    display: "display:none"
  },
  {
    id: '1tab3.7',
    number: "07",
    name:"Esfirra de calabresa com queijo e cheddar",
    description: "sdk dask dajks k",
    price:"R$5,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232329304_117294750645405_1026935317479180654_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=VnKNQLsBBnAAX9Q_bLL&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=469efdb52c2f1dd90c2ef333cd4b0f7f&oe=614563FA",
    display: "display:none"
  },
  {
    id: '1tab3.8',
    number: "08",
    name:"Hamburgão",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/225534944_117294817312065_5737254042580129881_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=XK7lGA9uXygAX_lWhc9&_nc_ht=scontent.fvdc3-1.fna&oh=fcbd8837822269d5ba19ac836bbb66a0&oe=61461806",
    display: "display:none"
  },
  {
    id: '1tab3.9',
    number: "09",
    name:"Bauru",
    description: "sdk dask dajks k",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240078676_117294217312125_9141162846575852765_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=Q98xPl8Huk4AX8a3nns&_nc_ht=scontent.fvdc3-1.fna&oh=8f3ef5c590b2b440dfe777c8bd63a75d&oe=6145FEB6",
    display: "display:none"
  },
  {
    id: '1tab3.10',
    number: "10",
    name:"Enroladinho de Salsicha",
    description: "sdk dask dajks k",
    price:"R$3,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233342663_117294287312118_7478497229540650766_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=zgwU9j2CuJoAX-4XlGo&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=58311b6c3127c62c11a1a02a3ba7974a&oe=6145BA59",
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
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240158547_117296533978560_7889505186724044514_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=Ygcq-KnrRYwAX8xQuUS&_nc_ht=scontent.fvdc3-1.fna&oh=19f207c7be4c71740bc783d59853608b&oe=61458D04",
    display: "display:flex"
  },
  {
    id: '1tab4.2',
    number: "02",
    name:"Risoles de Carne",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/231438220_117296480645232_7767201498510745427_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=zFP3GEsepV8AX_o5xGk&_nc_ht=scontent.fvdc3-1.fna&oh=86686739578b31fdbec896535a200dbf&oe=614471B8",
    display: "display:none"
  },
  {
    id: '1tab4.3',
    number: "03",
    name:"Risoles de Pizza",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233106344_117296717311875_8271198056886297579_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=GgTv6fqXhdMAX8b_vNY&_nc_ht=scontent.fvdc3-1.fna&oh=398d80f62d5c7cd3050b71c77ea51be1&oe=614446A2",
    display: "display:none"
  },
  {
    id: '1tab4.4',
    number: "04",
    name:"Enroladinho de Salsicha",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/228301159_117296790645201_8092389903944790366_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=h6dCiKoczyIAX8Xyp5D&_nc_ht=scontent.fvdc3-1.fna&oh=2617f5a7765bf057519005f3fb5b3063&oe=61434A31",
    display: "display:none"
  },
  {
    id: '1tab4.5',
    number: "05",
    name:"Enroladinho de queijo e presunto",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/239197237_117296650645215_3964218506547131055_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=_O5akTc2frUAX9VOavC&_nc_ht=scontent.fvdc3-1.fna&oh=c23611c981c8823bf39dc819f20fcef1&oe=614602BF",
    display: "display:none"
  },
  {
    id: '1tab4.6',
    number: "06",
    name:"Kibe",
    description: "sdk dask dajks k",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240097809_117296597311887_5222320388318549415_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=EVG-axz_iToAX8MJt_r&_nc_oc=AQkBb7LqS69WOLFlKa5pVy_BKBcxFy7CgxoT6PQFMzWsbU7Eq0Y2NA9XxreWQuNk_is&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=5f315cf8eba1360a04f53700a698c7d9&oe=614565F6",
    display: "display:none"
  },
  {
    id: '1tab4.7',
    number: "07",
    name:"Steak de Frango",
    description: "sdk dask dajks k",
    price:"R$2,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233330204_117296840645196_8355075857624459406_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=ibsb68IlwCYAX-AZtst&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=3877ac7dedb802d985c0e7fa3c339755&oe=6145E112",
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
var pizzaPrices1 = [
  {
    price: 6.00,
    size: 'Brotinho'
  },
  {
    price: 9.00,
    size: 'Brot. Especial'
  },
  {
    price: 17.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 22.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 28.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 34.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var pizzaPrices2 = [
  {
    price: 7.00,
    size: 'Brotinho'
  },
  {
    price: 10.00,
    size: 'Brot. Especial'
  },
  {
    price: 19.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 24.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 30.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 37.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var pizzaPrices3 = [
  {
    price: 10.00,
    size: 'Brotinho'
  },
  {
    price: 15.00,
    size: 'Brot. Especial'
  },
  {
    price: 27.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 33.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 40.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 46.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var pizzaPrices4 = [
  {
    price: 8.00,
    size: 'Brotinho'
  },
  {
    price: 12.00,
    size: 'Brot. Especial'
  },
  {
    price: 22.00,
    size: 'P',
    slices: '(4 &#127829)'
  },
  {
    price: 28.00,
    size: 'M',
    slices: '(6 &#127829)'
  },
  {
    price: 34.00,
    size: 'G',
    slices: '(8 &#127829)'
  },
  {
    price: 40.00,
    size: 'GG',
    slices: '(10 &#127829)'
  },
]

var catPizzas = [
  {
    id: '2tab1.1',
    number: 1,
    name:"Tradicional",
    description: "Queijo, presunto, milho e tomate.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240106277_117293040645576_4924976795352147143_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=jo539THf4NwAX_1fT0l&_nc_ht=scontent.fvdc3-1.fna&oh=2954dc5b83f4e5d45c216670a825654b&oe=6143CE31",
    display: "display:flex",
    prices: pizzaPrices1
  },
  {
    id: '2tab1.2',
    number: 2,
    name:"Calabresa",
    description: "Queijo, calabresa e cebola.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233625245_117292540645626_3782401061590880459_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=KY3wEdhSD1MAX_WKIA5&_nc_ht=scontent.fvdc3-1.fna&oh=237c81b2c01923d56d475261071e8999&oe=61459EC1",
    display: "display:none",
    prices: pizzaPrices1
  },
  {
    id: '2tab1.3',
    number: 3,
    name:"Caipira",
    description: "Queijo, frango desfiado, milho, tomate e cebola.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/237965232_117292373978976_748908005551020441_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=cwueK9p2owoAX-kpArW&_nc_ht=scontent.fvdc3-1.fna&oh=6713790a6d58fa5e04bde691a457e47a&oe=61436D81",
    display: "display:none",
    prices: pizzaPrices2
  },
  {
    id: '2tab1.4',
    number: 4,
    name:"Portuguesa",
    description: "Queijo, presunto, ovo, tomate, azeitona e cebola.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/240113265_117292950645585_8766229871408610626_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=eIq4O1cu6ioAX9pdDrY&_nc_ht=scontent.fvdc3-1.fna&oh=f8660a2654cca0b0d11ce65149d21070&oe=614379CA",
    display: "display:none",
    prices: pizzaPrices2
  },
  {
    id: '2tab1.5',
    number: 5,
    name:"Frango Catupiry",
    description: "Queijo, frango e catupiry.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232702204_117292870645593_1533618693700679347_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=c6wYHPHHg_4AX9AXq9I&_nc_ht=scontent.fvdc3-1.fna&oh=3f0a840d81feb6dffdbd69c8f679a5d2&oe=61445D0A",
    display: "display:none",
    prices: pizzaPrices2
  },
  {
    id: '2tab1.6',
    number: 6,
    name:"Carne Seca",
    description: "Carne seca, azeitona, cebola + (muçarela ou catupiry ou cheddar)",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233552856_117292757312271_2132117680449860470_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=7NJrtEhJl0YAX9pS_yo&_nc_ht=scontent.fvdc3-1.fna&oh=9d703af7a689d407b6f9056723ff108a&oe=6147199F",
    display: "display:none",
    prices: pizzaPrices3
  },
  {
    id: '2tab1.7',
    number: 7,
    name:"Atum",
    description: "Atum, muçarela, azeitona e cebola.",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233649511_117292293978984_5101822464847389961_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=PZMmYfK_j9AAX_pg-JA&_nc_ht=scontent.fvdc3-1.fna&oh=dd38717079ae4376dca1ad5f9ccea219&oe=614420FD",
    display: "display:none",
    prices: pizzaPrices4
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
              
              <div class="boxManyPrices">
                  ${prod.prices.map((price =>
                    `
                    <div class="manyPrices manyPricesPizza">
                      <h3 class="headerManyPrices">${price.size} ${price.slices ? `<text class="slicesPizza">${price.slices}</text>` : ''}</h3>
                      <div class="bodyManyPrices">${convertToReal(price.price)}</div>
                    </div>
                    `
                  )).join('')}
              </div>

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
    name:"Açaí (250ml)",
    description: "Aquele açaí delicioso e super cremoso! &#128523",
    priceOriginalAcai: 5.00,
    priceTotalAcai: 5.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238559296_117305193977694_3901278189704901807_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=23tWmA7QClEAX9eMmAu&_nc_ht=scontent.fvdc3-1.fna&oh=a1c6c084e95efbe2fdc638e8a7380ba9&oe=614678FF",
    display: "display:flex"
  }
]

var additionals = [
  {
    id: 1,
    name: 'Banana',
    idAddName: 'addBanana',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: true,
    fourFree: true
  },
  {
    id: 2,
    name: 'Morango',
    idAddName: 'addMorango',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: false,
    fourFree: true
  },
  {
    id: 3,
    name: 'Granola',
    idAddName: 'addGranola',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: true,
    fourFree: true
  },
  {
    id: 4,
    name: 'Paçoca',
    idAddName: 'addPacoca',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: false,
    fourFree: true
  },
  {
    id: 5,
    name: 'Leite Cond.',
    idAddName: 'addLeiteCond',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: true,
    fourFree: true
  },
  {
    id: 6,
    name: 'Leite em pó',
    idAddName: 'addLeitePo',
    available: true,
    price: 'R$1,00',
    value: 1.00,
    selected: true,
    fourFree: true
  },
  {
    id: 7,
    name: 'Amendoim',
    idAddName: 'addAmendoim',
    available: false,
    price: 'R$1,00',
    value: 1.00,
    selected: false,
    fourFree: true
  },
  {
    id: 8,
    name: 'Nutella',
    idAddName: 'addNutella',
    available: true,
    price: 'R$2,00',
    value: 2.00,
    selected: false,
    fourFree: false
  },
  {
    id: 9,
    name: 'Ovomaltine',
    idAddName: 'addOvomaltine',
    available: true,
    price: 'R$2,00',
    value: 2.00,
    selected: false,
    fourFree: false
  }
]

function changeSelect(id) {
  var contador = 0;
  var valor = 0;
  var simpleAdd = true;
  var wasSelected = true;
  additionals.map(add => {
    if (add.id === id) {
      valor = add.value;
      simpleAdd = add.fourFree;
      wasSelected = add.selected;

      const elemento = document.getElementById(add.idAddName);
      if (add.selected){ //desmarcando
        add.selected=false;
        if (elemento.classList) {
          elemento.classList.remove("active");
        } else {
          elemento.className -= " active";
        }
      }else { //marcando
        add.selected=true;
        if (elemento.classList) {
          elemento.classList.add("active");
        } else {
          elemento.className += " active";
        }
      }
    }
    if(add.fourFree && add.selected) {
      contador = contador + 1;
    }
  })
  
  var oldTotal = catAcais[0].priceTotalAcai;
  if (wasSelected){ //desmarcando
    if (!simpleAdd) {
      var newTotal = oldTotal - valor;
      catAcais[0].priceTotalAcai = newTotal;
      document.getElementById("idChangePriceAcai").innerHTML = `R$${newTotal},00`;
    } else {
      if (contador >= 4) {
        var newTotal = oldTotal - valor;
        catAcais[0].priceTotalAcai = newTotal;
        document.getElementById("idChangePriceAcai").innerHTML = `R$${newTotal},00`;
      }
    }
  } else { //marcando
    if (!simpleAdd) {
      var newTotal = oldTotal + valor;
      catAcais[0].priceTotalAcai = newTotal;
      document.getElementById("idChangePriceAcai").innerHTML = `R$${newTotal},00`;
    } else {
      if (contador > 4) {
        var newTotal = oldTotal + valor;
        catAcais[0].priceTotalAcai = newTotal;
        document.getElementById("idChangePriceAcai").innerHTML = `R$${newTotal},00`;
      }
    }
  }
}

function changeSelectedSizeAcai(sizeId) {
  var priceSize = 5.00;
  var newName = 'Açaí';
  var imgPath = "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238559296_117305193977694_3901278189704901807_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=23tWmA7QClEAX9eMmAu&_nc_ht=scontent.fvdc3-1.fna&oh=a1c6c084e95efbe2fdc638e8a7380ba9&oe=614678FF";

  switch (sizeId) {
    case 1:
      priceSize = 5.00;
      newName = 'Açaí (250ml)';
      imgPath = "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238559296_117305193977694_3901278189704901807_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=23tWmA7QClEAX9eMmAu&_nc_ht=scontent.fvdc3-1.fna&oh=a1c6c084e95efbe2fdc638e8a7380ba9&oe=614678FF";
      break;
    case 2:
      priceSize = 7.00;
      newName = 'Açaí (300ml)';
      imgPath = "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/236330275_117305127311034_741488201663957744_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=tgvL2zmq0pYAX-b3xHa&_nc_ht=scontent.fvdc3-1.fna&oh=2d2dc6ecee13919086a7f52372086c5d&oe=6146BF59";
      break;
    case 3:
      priceSize = 10.00;
      newName = 'Açaí (400ml)';
      imgPath = "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233199214_117305250644355_3054863440578884123_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=730e14&_nc_ohc=OptF-P0d90gAX_nq3Sj&_nc_ht=scontent.fvdc3-1.fna&oh=1410cefc7b9474534b1cbf52dc9a73d7&oe=6145CCFE";
      break;
    case 4:
      priceSize = 12.00;
      newName = 'Açaí (500ml)';
      imgPath = "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/236276088_117305293977684_2682545797940775392_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=h-25wcQAJ34AX96IH4p&_nc_ht=scontent.fvdc3-1.fna&oh=b052fa61a79b32ecbb2851a085fa83fe&oe=61463FA5";
      break;

    default:
      priceSize = 5.00;
      newName = 'Açaí';
      imgPath = "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238559296_117305193977694_3901278189704901807_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=23tWmA7QClEAX9eMmAu&_nc_ht=scontent.fvdc3-1.fna&oh=a1c6c084e95efbe2fdc638e8a7380ba9&oe=614678FF";
      break;
  }

  var subtotal = catAcais[0].priceOriginalAcai;
  var total = catAcais[0].priceTotalAcai;
  var newTotal = total - subtotal + priceSize;
  catAcais[0].priceOriginalAcai = priceSize;
  catAcais[0].priceTotalAcai = newTotal;
  catAcais[0].img = imgPath;
  catAcais[0].name = newName;
  document.getElementById("idChangePriceAcai").innerHTML = `R$${newTotal},00`;
  document.getElementById("nameH3Acai").innerHTML = `<span>0${sizeId}.</span> ${newName}`;
  document.getElementById("imgAcai").src=imgPath;
}


document.getElementById('catAcais').innerHTML = catAcais.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabAcais" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img id="imgAcai" src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3 id="nameH3Acai"> <span>0${prod.number}.</span> ${prod.name}</h3>
              <text id="idChangePriceAcai" class="priceCatalog">R$${prod.priceTotalAcai},00</text>
              <p>${prod.description}</p>
              <div class="boxManyPrices boxAcaiSizes">
                <div id="sizeAcaiPP" class="manyPrices acaiSizeInside active" onclick="changeSelectedSizeAcai(1)">
                  <h3 class="headerManyPrices">PP</h3>
                  <div class="bodyManyPrices">250ml</div>
                </div>
                <div id="sizeAcaiP" class="manyPrices acaiSizeInside" onclick="changeSelectedSizeAcai(2)">
                  <h3 class="headerManyPrices">P</h3>
                  <div class="bodyManyPrices">300ml</div>
                </div>
                <div id="sizeAcaiM" class="manyPrices acaiSizeInside" onclick="changeSelectedSizeAcai(3)">
                  <h3 class="headerManyPrices">M</h3>
                  <div class="bodyManyPrices">400ml</div>
                </div>
                <div id="sizeAcaiG" class="manyPrices acaiSizeInside" onclick="changeSelectedSizeAcai(4)">
                  <h3 class="headerManyPrices">G</h3>
                  <div class="bodyManyPrices">500ml</div>
                </div>
              </div>
              <div class="boxAdittionals">
                ${additionals.map(add =>
                  `
                    <button type="button" id=${add.idAddName} class="adittional ${add.selected ? 'active' : ''}" ${add.available ? '' : 'disabled'} onClick="changeSelect(${add.id})">${add.name}</button>
                  `
                ).join('')}
              </div>
              <button
                  class="btnCart btnCart-small addToCart"
                  data-product-id=${prod.id}
                  style="margin-top: 1rem"
                  onclick="addAcaiToCart()">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar item
                </button>
          </div>
      </div>
    </div>
  </div>`
).join('')

/*MILKSHAKES*/
 var catMilkShakes = [
  {
    id: '3tab2.1',
    number: 1,
    name:"Milk-shake P (300ml)",
    description: "Milk-shake dasjd sad asl fas lfas lfasl fa",
    price:"R$5,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238763486_117317710643109_4195831758721072596_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=69At4lcQjRYAX9nyipq&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=4a8f1a98f4df652d3cb94c2855426d51&oe=61450E21",
    display: "display:flex"
  },
  {
    id: '3tab2.2',
    number: 2,
    name:"Milk-shake M (400ml)",
    description: "Milk-shake dasjd sad asl fas lfas lfasl fa",
    price:"R$7,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/232702204_117317757309771_4209434100430702420_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=ve8VfyMCPnIAX_btUem&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=29fc7552e107937b052a0c5fbadd5e92&oe=6146950F",
    display: "display:none"
  },
  {
    id: '3tab2.3',
    number: 3,
    name:"Milk-shake G (500ml)",
    description: "Milk-shake dasjd sad asl fas lfas lfasl fa",
    price:"R$9,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/239216709_117322060642674_3577494100427244924_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=6RHeG8kn1U0AX8LSPFv&_nc_ht=scontent.fvdc3-1.fna&oh=db16a535bc8f3db631d718f3fa852a78&oe=61469B06",
    display: "display:none"
  }
]

document.getElementById('catMilkShakes').innerHTML = catMilkShakes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabMilkShakes" data-aos="fade-right" style="${prod.display}">
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

/*SORVETES*/
var catSorvetes = [
  {
    id: '3tab3.1',
    number: 1,
    name:"Bola de sorvete",
    description: "Delicioso sorvete SUUUUPER cremoso!!",
    price:"R$1,00",
    priceNumb: 1.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238660236_117351967306350_2153640766580765402_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=6bxaiwjOwe8AX8X3i5K&_nc_ht=scontent.fvdc3-1.fna&oh=014a27d8627f0908f50b5d9f8785993c&oe=61445BFA",
    display: "display:flex"
  },
  {
    id: '3tab3.2',
    number: 2,
    name:"Sorvete na casquinha",
    description: "1 bola na casquinha desse sorvete maravilhoso e cremoso.",
    price:"R$1,00",
    priceNumb: 1.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/236452689_117352143972999_4656178210832626560_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=uiJ1a-I5BlQAX-XAv9x&_nc_ht=scontent.fvdc3-1.fna&oh=d073d85b37cbbb1e0c44880be1938f55&oe=61458A57",
    display: "display:none"
  },
  {
    id: '3tab3.3',
    number: 3,
    name:"Sorvete no cascão",
    description: "2 bolas no cascão desse sorvete irresistível e cremoso!",
    price:"R$2,00",
    priceNumb: 2.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/239928710_117352087306338_3799823051884595966_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=c1k7Ox3VesgAX_69boW&_nc_ht=scontent.fvdc3-1.fna&oh=b074f43a25ef47fc64eb05bfe5c41772&oe=61445AB1",
    display: "display:none"
  },
  {
    id: '3tab3.4',
    number: 4,
    name:"Picolé cremoso",
    description: "Picolé super cremoso!",
    price:"R$1,50",
    priceNumb: 1.50,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/239936010_117352233972990_454351185082107640_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=4FFonRsFZP8AX-Jrlwt&_nc_ht=scontent.fvdc3-1.fna&oh=afaab0a74271d13a9f009f24446e29d2&oe=6146C7B7",
    display: "display:none"
  },
  {
    id: '3tab3.5',
    number: 5,
    name:"Picolé cristalizado",
    description: "Picolé cristalizado super refrescante!",
    price:"R$1,50",
    priceNumb: 1.50,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233041204_117352190639661_4044371983558569854_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=VNufUH7TTCAAX9KYpdB&_nc_ht=scontent.fvdc3-1.fna&oh=eb18d0e77352241e369be2d3df5e7c5d&oe=61473D1D",
    display: "display:none"
  },
  {
    id: '3tab3.6',
    number: 6,
    name:"Picolé SKIMO",
    description: "Picolé super cremoso coberto com uma deliciosa casquinha de chocolate!",
    price:"R$3,00",
    priceNumb: 3.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233643579_117352293972984_4682700727986961552_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=730e14&_nc_ohc=6X9dB2EaAxkAX8jLD3z&_nc_ht=scontent.fvdc3-1.fna&oh=07bd68b253caad1dd1c654ff208bec4e&oe=61444790",
    display: "display:none"
  },
  {
    id: '3tab3.7',
    number: 7,
    name:"Cremosinho",
    description: "Sorvete no saquinho super cremoso!",
    price:"R$1,00",
    priceNumb: 1.00,
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/233498861_117354517306095_6543384273992456851_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=d1xLOw1hQ6AAX--I_qI&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=0281ffd07444aa8d3a81f741ebf83e79&oe=6143CDAF",
    display: "display:none"
  }
]

document.getElementById('catSorvetes').innerHTML = catSorvetes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabSorvetes" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
              <button
                  class="btnCart btnCart-small addToCart"
                  data-product-id=${prod.id}
                  onclick="addItemToCart({
                    id: '${prod.id}',
                    name: '${prod.name}',
                    priceOne: '${prod.priceNumb}',
                    priceNumb: ${prod.priceNumb},
                    img: '${prod.img}',
                    count: 1
                  })">
                    <i class="fas fa-cart-plus"></i>
                    Adicionar item
                </button>
          </div>
      </div>
    </div>
  </div>`
).join('')

/* Sessão 4 - PADARIA
 Pães (4tab1)*/
var catPaes = [
  {
    id: '4tab1.1',
    number: 1,
    name:"Pão de doce",
    description: "Pãozinho de doce caseiro, delicioso e fofinho.",
    price:"R$0,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238556099_118298713878342_328503121037794522_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=kj13ulE-sggAX_H6vWs&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=ad783867d38aa5967c2bf52027553cb5&oe=6148C4E9",
    display: "display:flex",
    hasOffer: "display:flex",
    offer: "5 por: R$2,00"
  },
  {
    id: '4tab1.2',
    number: 2,
    name:"Pão de sal",
    description: "Pãozinho de sal caseiro, delicioso e fofinho.",
    price:"R$0,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/237037312_118298783878335_6063340236486753715_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=HpI1_V_HSdIAX-pRjPz&_nc_ht=scontent.fvdc3-1.fna&oh=37cc9064900d358012d3e3242af08488&oe=614B3A26",
    display: "display:none",
    hasOffer: "display:flex",
    offer: "5 por: R$2,00"
  },
  {
    id: '4tab1.3',
    number: 3,
    name:"Rosca doce",
    description: "Pãozinho em forma de rosca, super fofo e coberto com leite condensado e coco.",
    price:"R$0,75",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none",
    hasOffer: "display:flex",
    offer: "3 por: R$2,00"
  },
]

document.getElementById('catPaes').innerHTML = catPaes.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabPaes" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>0${prod.number}.</span> ${prod.name}</h3>
              <text class="priceCatalog">${prod.price}</text>
              <p>${prod.description}</p>
              <div class="offerDiv" style="${prod.hasOffer}">
                <h3 class="headerOfferDiv"><i class="fas fa-certificate"></i>Oferta<i class="fas fa-certificate"></i></h3>
                <div class="bodyOfferDiv">${prod.offer}</div>
              </div>
          </div>
      </div>
    </div>
  </div>`
).join('')

/* Bolos (4tab2)*/
 var catBolos = [
  {
    id: '4tab2.1',
    number: '01',
    name:"Bolo da prima",
    description: "O tradicional e queiridinho do café de todo dia: Bolo de trigo, super fofinho e saboroso!",
    price:"R$7,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238556099_118298713878342_328503121037794522_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=kj13ulE-sggAX_H6vWs&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=ad783867d38aa5967c2bf52027553cb5&oe=6148C4E9",
    display: "display:flex"
  },
  {
    id: '4tab2.2',
    number: '02',
    name:"Bolo de Formigueiro",
    description: "A delícia do bolo da prima com um plus: granulado de chocolate!",
    price:"R$7,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/237037312_118298783878335_6063340236486753715_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=HpI1_V_HSdIAX-pRjPz&_nc_ht=scontent.fvdc3-1.fna&oh=37cc9064900d358012d3e3242af08488&oe=614B3A26",
    display: "display:none"
  },
  {
    id: '4tab2.3',
    number: '03',
    name:"Bolo de Milho",
    description: "Delicioso bolo cremoso feito com fubá de milho e milho verde. Uma delícia!",
    price:"R$6,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab2.4',
    number: '04',
    name:"Bolo de Arroz (G)",
    description: "Delicioso bolo de arroz (tamanho normal).",
    price:"R$6,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab2.5',
    number: '05',
    name:"Bolo de Arroz (P)",
    description: "Delicioso bolo de arroz (tamanho pequeno).",
    price:"R$3,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab2.6',
    number: '06',
    name:"Brevidade (G)",
    description: "A famosa brevidade, delicioso bolo feito com tapioca e rapadura (tamanho normal).",
    price:"R$7,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab2.7',
    number: '07',
    name:"Brevidade (P)",
    description: "A famosa brevidade, delicioso bolo feito com tapioca e rapadura (tamanho pequeno).",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab2.8',
    number: '08',
    name:"Bolo de Cenoura",
    description: "Aquele maravilhoso bolo de cenoura com uma deliciosa e generosa cobertura de chocolate.",
    price:"R$6,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab2.9',
    number: '09',
    name:"Bolo de Mandioca",
    description: "Delicioso, macio e cremoso bolo de mandioca.",
    price:"R$6,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
]

document.getElementById('catBolos').innerHTML = catBolos.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabBolos" data-aos="fade-right" style="${prod.display}">
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

/* DiversosPad (4tab3)*/
var catDiversosPad = [
  {
    id: '4tab3.1',
    number: '01',
    name:"Chimango",
    description: "O tradicional e delicioso chimango (joão duro), feito com tapioca.",
    price:"R$1,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/238556099_118298713878342_328503121037794522_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=kj13ulE-sggAX_H6vWs&tn=woKc8C_y2t_tjE5g&_nc_ht=scontent.fvdc3-1.fna&oh=ad783867d38aa5967c2bf52027553cb5&oe=6148C4E9",
    display: "display:flex"
  },
  {
    id: '4tab3.2',
    number: '02',
    name:"Pão de queijo",
    description: "Delicioso e fofinho pão de queijo. Vem sentir o gostinho de Minas na Bahia.",
    price:"R$1,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/237037312_118298783878335_6063340236486753715_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=730e14&_nc_ohc=HpI1_V_HSdIAX-pRjPz&_nc_ht=scontent.fvdc3-1.fna&oh=37cc9064900d358012d3e3242af08488&oe=614B3A26",
    display: "display:none"
  },
  {
    id: '4tab3.3',
    number: '03',
    name:"Bolachinha (200g)",
    description: "200g da famosa e deliciosa bolachinha de tapioca!",
    price:"R$4,00",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab3.4',
    number: '04',
    name:"Doce de Leite",
    description: "O maravilhoso doce de leite caseiro, super cremoso e delicioso.",
    manyPrices: [
      {
        price: 'R$6,00',
        size: '250g'
      },
      {
        price: 'R$9,00',
        size: '500g'
      },
      {
        price: 'R$18,00',
        size: '1Kg'
      }
    ],
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  },
  {
    id: '4tab3.5',
    number: '05',
    name:"Avoador",
    description: "O tão conhecido biscoito de polvilho (avoador).",
    price:"R$4,50",
    img: "https://scontent.fvdc3-1.fna.fbcdn.net/v/t1.6435-9/234410895_118298827211664_2157678533272376702_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=DumhlDVVISkAX9Zancb&_nc_ht=scontent.fvdc3-1.fna&oh=2c13acb5fc036dcc5e54e4930d6851da&oe=6149038E",
    display: "display:none"
  }
]

document.getElementById('catDiversosPad').innerHTML = catDiversosPad.map(prod => 
  `<div>
    <div id="${prod.id}" class="row tabDiversosPad" data-aos="fade-right" style="${prod.display}">
      <div class="image" data-aos="fade-left">
          <img src="${prod.img}" alt="${prod.name}">
      </div>

      <div class="content">
          <div class="info">
              <h3> <span>${prod.number}.</span> ${prod.name}</h3>
              ${prod.price ? `<text class="priceCatalog">${prod.price}</text>` : ``}
              <p>${prod.description}</p>
              ${prod.manyPrices ?
                `
                <div class="boxManyPrices">
                  ${prod.manyPrices.map((price =>
                    `
                    <div class="manyPrices">
                      <h3 class="headerManyPrices">${price.size}</h3>
                      <div class="bodyManyPrices">${price.price}</div>
                    </div>
                    `
                  ))}
                </div>
                `
                :
                ``
              }
          </div>
      </div>
    </div>
  </div>`
).join('')

let sizePizzaSelected = 'M';

let flavorLeftPizzaSelected = 'Tradicional';
let priceLeftPizzaSelected = 22.00;
let typeLeftPizzaSelected = 1;

let flavorRightPizzaSelected = 'Frango Catupiry';
let priceRightPizzaSelected = 24.00;
let typeRightPizzaSelected = 2;

let priceMakedPizza = 23.00;

let isToTakeOut = false;

/*changing sizes*/

function changePizzaSizeSelection(size, isJustOne){
  document.getElementById("choosePizzaSize").innerHTML = size;
  sizePizzaSelected = size;
  
  if (isJustOne) {
    document.querySelector('.boxImgPizzaChoose').classList.add('oneFlavor');
    document.getElementById("choosePizzaFlavorLeft").innerHTML = `<p title="${flavorRightPizzaSelected}">${flavorRightPizzaSelected}</p>`;
    flavorLeftPizzaSelected = flavorRightPizzaSelected;
    typeLeftPizzaSelected = typeRightPizzaSelected;
    priceLeftPizzaSelected = priceRightPizzaSelected;
    priceMakedPizza = priceRightPizzaSelected;
  } else {
    document.querySelector('.boxImgPizzaChoose').classList.remove('oneFlavor');
  }
  
  if (typeLeftPizzaSelected === typeRightPizzaSelected) {
    calculateMakedPizzaValueChangingSize(true, true);
  } else {
    calculateMakedPizzaValueChangingSize(false, true);
    calculateMakedPizzaValueChangingSize(false, false);
  }

  priceMakedPizza = (priceLeftPizzaSelected+priceRightPizzaSelected)/2;
  document.getElementById('idPriceMakedPizza').innerHTML = convertToReal(priceMakedPizza);
}

function changePricesByChangingSize(isEqual, isLeft, price) {
  if (isEqual){
    priceLeftPizzaSelected = price;
    priceRightPizzaSelected = price;
  } else {
    isLeft 
    ? priceLeftPizzaSelected = price
    : priceRightPizzaSelected = price;
  }
}

function calculateMakedPizzaValueChangingSize(isEqual, isLeft){
  switch (isLeft ? typeLeftPizzaSelected : typeRightPizzaSelected) {
    case 1:
      pizzaPrices1.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;

    case 2:
      pizzaPrices2.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;

    case 3:
      pizzaPrices3.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;

    case 4:
      pizzaPrices4.map(price => {
        if (price.size === sizePizzaSelected) {
          changePricesByChangingSize(isEqual, isLeft, price.price);
        }
      });
      break;
  
    default:
      break;
  }
}

/*changing flavors*/

function changePrices(isLeft, price, isJustOne) {
  if (isJustOne) {
    priceRightPizzaSelected = price;
    priceLeftPizzaSelected = price;
  } else {
    isLeft 
      ? priceLeftPizzaSelected = price
      : priceRightPizzaSelected = price;
  }
  priceMakedPizza = (priceLeftPizzaSelected+priceRightPizzaSelected)/2;
  document.getElementById('idPriceMakedPizza').innerHTML = convertToReal(priceMakedPizza);
}

function calculateMakedPizzaValue(type, isLeft, isJustOne){
  switch (type) {
    case 1:
      pizzaPrices1.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;

    case 2:
      pizzaPrices2.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;

    case 3:
      pizzaPrices3.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;

    case 4:
      pizzaPrices4.map(price => {
        if (price.size === sizePizzaSelected) {
          changePrices(isLeft, price.price, isJustOne);
        }
      });
      break;
  
    default:
      break;
  }
}

function changeLeftPizzaSelection(flavor,type){
  document.getElementById("choosePizzaFlavorLeft").innerHTML = `<p title="${flavor}">${flavor}</p>`;
  flavorLeftPizzaSelected = flavor;
  typeLeftPizzaSelected = type;
  calculateMakedPizzaValue(type, true);
}

function changeRightPizzaSelection(flavor, type){
  document.getElementById("choosePizzaFlavorRight").innerHTML = `<p title="${flavor}">${flavor}</p>`;
  flavorRightPizzaSelected = flavor;
  typeRightPizzaSelected = type;
  console.log(sizePizzaSelected);
  if (sizePizzaSelected==='Brotinho' || sizePizzaSelected==='Brot. Especial') {
    flavorLeftPizzaSelected = flavorRightPizzaSelected;
    typeLeftPizzaSelected = typeRightPizzaSelected;
    document.getElementById("choosePizzaFlavorLeft").innerHTML = `<p title="${flavorRightPizzaSelected}">${flavorRightPizzaSelected}</p>`;
    calculateMakedPizzaValue(type, false, true);
  } else {
    calculateMakedPizzaValue(type, false);
  }
  
}

function toggleCheckbox(element) {
  isToTakeOut = element.checked;
}

function chooseMakedPizza(){
  let stringLevar = isToTakeOut ? ' - [levar]' : '';

  let stringFlavor = 
    flavorLeftPizzaSelected===flavorRightPizzaSelected
    ? flavorRightPizzaSelected
    : `${flavorLeftPizzaSelected}/${flavorRightPizzaSelected}`;

  let objMakedPizzaChoosed = {
    id: `${stringFlavor} - ${sizePizzaSelected}${stringLevar}`,
    name:`Pizza (${sizePizzaSelected})`,
    adittionals: `${stringFlavor}${stringLevar}`,
    isPizza: true,
    priceOne: priceMakedPizza,
    priceNumb: priceMakedPizza,
    img: "images/pizzaIcon.png",
    count: 1
  };

  addItemToCart(objMakedPizzaChoosed);
}

updateShoppingCartHTML();