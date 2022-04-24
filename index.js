const config = require('./config');
const axios = require('axios');
const Twit = require('twit');
const { DOMParser } = require('xmldom')

const todaysDate = new Date();
const dd = String(todaysDate.getDate()).padStart(2, '0');
const mm = String(todaysDate.getMonth() + 1).padStart(2, '0');
const yyyy = todaysDate.getFullYear();
const yyyyJournal = yyyy - 123;
const dataUrl = `${config.astb.api}${yyyyJournal}-${mm}-${dd}.html`

axios.get(dataUrl)
  .then(response => {
    var doc = new DOMParser().parseFromString(response.data, 'text/html');
    var cleanedString = doc.getElementsByClassName('card-body-tagebuch')[0].textContent
    .trim()
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s{2,}/g, ' ');
    if (cleanedString) postTweet(cleanedString);
  })
  .catch(error => {
    console.log(error);
  });

// format and post the tweet
function postTweet(payload) {
    const T = new Twit({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      access_token: config.twitter.access_token,
      access_token_secret: config.twitter.access_token_secret,
    })
  
    let diaryContent = payload;
    if (diaryContent.length > 223) diaryContent = diaryContent.slice(0, 218) + '[...]';
  
    const tweetContent = diaryContent + '\n\nWeiter: ' + dataUrl + '\n#OTD #ArthurSchnitzler';
  
    T.post('statuses/update', {
      status: tweetContent
    }, onTweeted)
  }
  
  function onTweeted(err, reply) {
    if (err !== undefined) {
      console.log(err)
    } else {
      console.log('Tweeted: ' + reply.text)
    }
  }