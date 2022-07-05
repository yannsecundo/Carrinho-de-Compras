require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
   it("Test se fetchItem é uma função", () => {
    expect(typeof fetchItem).toBe("function");
  });
  it("Test se a função fetchItem com o id do item  'MLB1607748387' e teste se fetch foi chamada", async () => {
    await fetchItem("MLB1607748387");
    expect(fetch).toHaveBeenCalled();
  });
  it("Test se ao chamar a função fetchItem com o id do item 'MLB1607748387', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/items/MLB1615760527'", async () => {
     await fetchItem("MLB1607748387")
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1607748387");
  });
  it("Testa se o retorno da função fetchItem com o argumento do item 'MLB1615760527' é uma estrutura de dados igual ao objeto item que já está importado no arquivo", async () => {
    const expected = await fetchItem("MLB1615760527")
    expect(expected).toEqual(item);
  });
  it("Test se ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: 'You must provide an url'", async () => {
    const expected = await fetchItem()
    expect(expected).toEqual(new Error('You must provide an url'));
  });
});
