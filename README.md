# schnitzler-otd
This twitter-bot will tweet a snippet from an entry written by Arthur Schnitzler on this day in his diary.

## Installation / Usage
### Setup Twitter App
Make a copy of the config-sample.js and rename it to config.js and add your app tokens from Twitter:
```
config.twitter.consumer_key = '';
config.twitter.consumer_secret = '';
config.twitter.access_token = '';
config.twitter.access_token_secret = '';
```
### Project setup
```
npm install
```
### Run the project
```
npm start
```
### Running the bot daily
For this project the goal is to run the script every morning at 04:00 server time. Using a cronjob like the following would do the trick:
```
0 4 * * * admin /usr/bin/node /{path_to_your_project}/schnitzler-otd/index.js
```