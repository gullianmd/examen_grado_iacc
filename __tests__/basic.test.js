// Pruebas básicas de Jest
describe('Pruebas básicas de configuración', () => {
  test('debería sumar números correctamente', () => {
    expect(1 + 1).toBe(2);
  });

  test('debería verificar valores truthy', () => {
    expect(true).toBeTruthy();
    expect('hello').toBeTruthy();
  });

  test('debería verificar igualdad de objetos', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toEqual({ name: 'test', value: 42 });
  });
});
