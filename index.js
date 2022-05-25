require('dotenv').config()
const {TwitterClient} = require('twitter-api-client')
const axios = require('axios')

// Create object reference to libs
var Twit = require('twit');
var fs = require('fs');

const twitterClient = new TwitterClient({
	apiKey: process.env.TWITTER_API_KEY,
	apiSecret: process.env.TWITTER_API_SECRET,
	accessToken: process.env.TWITTER_ACCESS_TOKEN,
	accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

// Set interval time. Try to use a not so small interval to avoid Twitter to lock your account.
var INTERVAL = 3*60*60*1000; // 3 hours

function BotStart() {
	console.log("> Twitter bot is running (" + Date() + ")...")

	PostTweet()
}


function PostTweet() {

	axios.get('http://localhost:3000/tweets')
    .then(response => {
    const data = response.data ? response.data : {}
		// console.log(data[0])
    let tweet
		let tweetIndex
    if (data && data.length) {
        //tweet random phrase in the array
				tweetIndex = Math.floor(Math.random()*data.length+1);
        tweet = data[tweetIndex].tweet
				console.log(tweet)
    } else {
        tweet = 'Nothing to tweet';
    }

	twitterClient.tweets.statusesUpdate({
		status: tweet
	}).then (response => {
		console.log("Tweeted!", response)
	}).catch(err => {
		console.error(err)
	})
	}).catch (err => {
    console.error(err)
	})
}

// Start bot and timer
BotStart();
setInterval(BotStart, INTERVAL);


