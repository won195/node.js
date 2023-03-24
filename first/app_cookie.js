let express = require('express');
let cookieParser = require('cookie-parser');
let app = express();
app.use(cookieParser(123456789));
let products = {
  1:{title:'The history of web 1'},
  2:{title:'The next web'}
};
app.get('/products', function(req, res){
  let output = '';
  for(let name in products) {
    output += `
    <li>
      <a href="/cart/${name}">${products[name].title}</a>
    </li>`
  }
  res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">Cart</a>`);
});
/*
cart = {
  1:2,
  2:1
}
*/
app.get('/cart/:id', function(req, res){
  let id = req.params.id;
  if(req.signedCookies.cart) {
    let cart = req.signedCookies.cart;
  } else {
    let cart = {};
  }
  if(!cart[id]){
    cart[id] = 0;
  }
  cart[id] = parseInt(cart[id])+1;
  res.cookie('cart', cart, {signed:true});
  res.redirect('/cart');
});
app.get('/cart', function(req, res){
  let cart = req.signedCookies.cart;
  if(!cart) {
    res.send('Empty!');
  } else {
    let output = '';
    for(let id in cart){
      if(products[id]) {
        output += `<li>${products[id].title}(${cart[id]})</li>`;
      }
    }
  }
  res.send(`
  <h1>Cart</h1>
  <ul>${output}</ul>
  <a href="/products">Products List</a>
  `);
});


app.get('/count', function(req, res){
  if(req.signedCookies.count){
    let count = parseInt(req.signedCookies.count);
  } else {
    let count = 0;
  }
  count = count +1;
  res.cookie('count', count, {signed:true});
  res.send('count : ' + count);
});
app.listen(3003,
  function(){
    console.log('Connected 3003 port!!!');
  });