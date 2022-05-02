const text = 'Hello World';
const crypto = ['CELO','ETH','BTC'];

 test ('should return Hello World', () => {
   expect(text).toMatch(/World/);
 });

 test('should return CELO, ETH, BTC', () => {
    expect(crypto).toContain('CELO');
    expect(crypto).toContain('ETH');
    expect(crypto).toContain('BTC');
  });

test('dont have XRP', () => {  
  expect(crypto).not.toContain('XRP');
});

test('Boolean', () => {
  expect(true).toBeTruthy();
  expect(false).toBeFalsy();
});
                                        