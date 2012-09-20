MobileGamepad
=============

A Javascript module and python script that allows browser based games to use an external device as a gamepad via websockets.

Only works for games run locally just now, and will always need the user to be running a
local python script.

To Use
=============
Users will need the python script (which has imports from twisted and twxs) to run as the
local WebSockets server.

With the webpage, add Gameside.js as a script then run start() to get the QR code which connects the phone to the page.

Current Status
=============

Can generate QR code which links to a tinyURL of the data URI for a page which loads a websocket which loads the rest of the page and connects the mobile device to the browser.

Currently there's no interaction between browser and mobile device.