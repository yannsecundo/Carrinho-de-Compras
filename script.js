const items = document.querySelector('.items');
const classeCartItems = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  const item = document.querySelector(classeCartItems).innerHTML;
  getSavedCarItems(item);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  classeCartItems.appendChild(li);
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

const getAPIelement = () => fetchProducts()
  .then((data) => data.results
    .map((element) => createProductItemElement(element)));

window.onload = () => {
  getAPIelement();
};