require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  test('testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  test('testando se a função é chamada', async () => {
    await fetchProducts('computador')
    expect(fetch).toHaveBeenCalled();
  });

  test('testando se a função utiliza o endpoint https://api.mercadolibre.com/sites/MLB/search?q=computador', async () => {
    await fetchProducts("computador")
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  test('teste se a função não receber nenhum argumento', async () => {
    const expected = await fetchProducts();
    expect(expected).toEqual(new Error('You must provide an url'))
  });

  test(' testa se a função fetchProducts retorna a mesma estrutura de dados de computadorSearch', async () => {
    const expected = await fetchProducts('computador');
    expect(expected).toEqual(computadorSearch)
  });
});
