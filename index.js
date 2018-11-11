const requestp = require('request-promise')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const port = 3000
const jwt = require('jsonwebtoken')

const webToken = () => {
  const cert = process.env.PRIVATE_KEY.replace(/###n/g, '\n')

  return jwt.sign({
    iss: process.env.APP_ID
  },
  cert, {
    algorithm: 'RS256',
    expiresIn: '10m'
  })
}

const installationToken = (installationId) => requestp({
  url: `https://api.github.com/installations/${installationId}/access_tokens`,
  json: true,
  headers: {
    'Authorization': 'Bearer ' + this.webToken(),
    'User-Agent': process.env.APP_NAME,
    'Accept': 'application/vnd.github.machine-man-preview+json'
  },
  method: 'POST'
})

const addComment = (url, body, token) => requestp({
  url,
  json: true,
  headers: {
    'Authorization': 'token ' + token,
    'User-Agent': process.env.APP_NAME,
    'Accept': 'application/vnd.github.machine-man-preview+json'
  },
  method: 'POST',
  body: {
    body
  }
})

const main = (req, res) => {
  if (typeof req.body === 'undefined') {
    res.status(400).send('No message defined!')
  } else {
    const payload = req.body
    if (payload.action === 'synchronize') {
      console.log('Accepted Request: synchronize')
      this.installationToken(payload.installation.id)
        .then(({
          token
        }) => {
          const timeToWait = process.env.WAIT_MS || 120000 // 2 minutes
          console.log(`waiting before doing a PR comment for ${timeToWait} ms.`)
          setTimeout(() => {
            console.log('now doing a PR comment')
            addComment(payload.pull_request.comments_url, process.env.COMMENT, token)
          }, timeToWait)
          return res.status(200).send('OK')
        })
    }
  }
}

server.post('/', bodyParser.json(), main)
server.listen(port, () => console.log(`listening on port ${port}!`))

module.exports = { main, addComment, webToken, installationToken }
