const items = document.querySelector('.items');
const classCartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const SomaItemPrice = () => {
  let sum = 0;
  const total = document.querySelector('.total-price');
  const arrayList = document.querySelectorAll('li');
  arrayList.forEach((element) => {
    sum += parseFloat(element.innerHTML.split('$')[1] * 100);
  });
  total.innerHTML = sum / 100;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  const olHtml = classCartItems.innerHTML;
  saveCartItems(olHtml);
  SomaItemPrice();
};

const loadLocalStorage = () => {
  const olList = document.querySelector('ol');
  olList.innerHTML = getSavedCartItems();
  document.querySelectorAll('li').forEach((element) => {
    element.addEventListener('click', cartItemClickListener);
  });
};

document.querySelector('.empty-cart').addEventListener('click', () => {
  localStorage.clear();
  document.querySelector('ol').innerHTML = '';
});

document.querySelector('.empty-cart').addEventListener('click', () => {
  localStorage.clear();
  document.querySelector('ol').innerHTML = '';
});

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  classCartItems.appendChild(li);
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
};

const addToCart = async (itemCart) => {
  const itemCarrinho = await fetchItem(itemCart);
  const { id: sku, title: name, price: salePrice } = itemCarrinho;
  createCartItemElement({ sku, name, salePrice });
};

const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const butao = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  section.appendChild(butao);
  butao.addEventListener('click', () => { addToCart(sku); });
  items.appendChild(section);
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addEventToItems = () => {
  items.addEventListener('click', (event) => {
    if (event.target.classList.contains('item__add')) {
      const id = getSkuFromProductItem(event.target.parentNode);
      fetchItem(id).then((data) => {
        addToCart(data);
        const olDoHtml = classCartItems.innerHTML;
        saveCartItems(olDoHtml);
        SomaItemPrice();
      });  
    }
  });
};

const getAPIelement = () => fetchProducts()
  .then((data) => data.results
    .map((element) => createProductItemElement(element)));

window.onload = () => {
  getAPIelement();
  loadLocalStorage();
  addEventToItems();
};