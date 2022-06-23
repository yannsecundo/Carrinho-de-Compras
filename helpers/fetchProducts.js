const fetchProducts = async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    
  const data = await fetch(url)
    .then((response) => response.json());
    return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
