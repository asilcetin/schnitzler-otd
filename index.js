const config = require('./config');
const axios = require('axios');
const Twit = require('twit');


axios.get(config.astb.api + '/collections/editions/entry__1900-01-01.xml?format=text')
  .then(response => {
    console.log(response.data.trim());
  })
  .catch(error => {
    console.log(error);
  });

var T = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret,
})


T.get('account/verify_credentials', {
  include_entities: false,
  skip_status: true,
  include_email: false
}, onAuthenticated)


function onAuthenticated(err, res) {
  if (err) {
      throw err
  }
  console.log('Authentication successful. Running bot...\r\n')
}


T.post('statuses/update', {
  status: "Tweeting my first automated tweet."
}, onTweeted)


function onTweeted(err, reply) {
  if (err !== undefined) {
      console.log(err)
  } else {
      console.log('Tweeted: ' + reply.text)
  }
}
