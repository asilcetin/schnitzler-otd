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
    postTweet(response.data.trim());
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
  if (diaryContent.length > 190) diaryContent = diaryContent.slice(0, 190) + '[...]';
  const diaryEntryLink = config.astb.gui + yyyyJournal+'-'+mm+'-'+dd+'.xml';
  const tweetContent = '#OTD vor 123 Jahren im Tagebuch von #ArthurSchnitzler:\n\n' + diaryContent + '\n\nWeiter: ' + diaryEntryLink;

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
