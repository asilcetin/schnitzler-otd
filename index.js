const config = require('./config');
const axios = require('axios');
const Twit = require('twit');

const todaysDate = new Date();
const dd = String(todaysDate.getDate()).padStart(2, '0');
const mm = String(todaysDate.getMonth() + 1).padStart(2, '0');
const yyyy = todaysDate.getFullYear();
const yyyyJournal = yyyy - 123;

axios.get(config.astb.api + '/collections/editions/entry__'+yyyyJournal+'-'+mm+'-'+dd+'.xml?format=text')
  .then(response => {
    const cleanedString = response.data
      .trim()
      .replace(/(\r\n|\n|\r)/gm, '')
      .replace(/\s{2,}/g, ' ');
    postTweet(cleanedString);
  })
  .catch(error => {
    console.log(error);
  });

function postTweet(payload) {
  const T = new Twit({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token: config.twitter.access_token,
    access_token_secret: config.twitter.access_token_secret,
  })

  let diaryContent = payload;
  if (diaryContent.length > 218) diaryContent = diaryContent.slice(0, 218) + '[...]';
  const diaryEntryLink = config.astb.gui + yyyyJournal+'-'+mm+'-'+dd+'.xml';
  const tweetContent = diaryContent + '\n\nWeiter: ' + diaryEntryLink + '\n#OTD #ArthurSchnitzler';

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
