# Node.js todo userauth

This is an API that creates, reads, updates, and destroys todos sent from my [angular front-end app](https://github.com/iposton/angular-todo-userauth). This API is organized in four main files, Routes: has the endpoints for the angular front-end to send data to, Models: to validate the todo data, Maps: to build a data store, and Data: to write the data to file to help us persist the data.

## Software used

Express.js  version 5.0.0-beta.1
Node.js version 18.10.0
Morgan version 1.10.0
uuid version 9.0.1
cors version 2.8.5 

## Install and serve the app

1. run `npm i`
2. `node server.js`

You can interact with the API by going to http://localhost:4000 on your machine. The terminal will log the information and success or error status of each API request.


