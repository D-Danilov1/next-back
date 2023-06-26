const stripe = require('stripe')('sk_test_51KtvkHHb8NpiNcYOE0foBq6PBZuwVkDrrUwg7EhPWmafq7xqlUaFDcQMDZhP4LaDJOnJDz8aD5GE64C9Iud9kZGH00kM3NVuqH');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});

//prod_O99pPHXeXKTdwZ
//price_1NMrVVHb8NpiNcYOxaah6v3B