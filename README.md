# Don't Blow It (The Environment)

## Arduino Code

1. Upload `microphone.uno` to your arduino uno.

## Serial Proxys
### How to install and run

1. Make sure you have node 12 or higher and npm installed
2. Run `yarn` or `npm init`
3. Edit `index.js` to include your serial port
4. Open `client.html` in a browser and make sure data is being received on serial port
5. Run `yarn buildrun` and watch the browser add a stream of values

## Frontend

1. Make sure you have node 12 or higher, npm installed, and the serial proxy runnning
2. `cd emissions` and run `yarn`
3. Run `yarn dev` and open `localhost:3000` in a browser (preferrably not safari as smooth-scrolling is used and not implemented in safari)