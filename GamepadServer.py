from socket import gethostname
from twisted.internet import protocol, reactor
from txws import WebSocketFactory
import os
import time
users = 0
instructionBuffer = [];
controllerImage = ""

codeToSend = """
function hello():
	alert(hi);
	"""

hostname = gethostname()



class Replier(protocol.Protocol):
    def dataReceived(self, data):
    	print data
    	if data == 'whoami':
    		self.transport.write('{"host": "'+hostname+'"}');
    	else:
	    	global instructionBuffer
	        datadict = eval(data)
	        if datadict['mode'] == 'read':
	        	self.transport.write(instructionBuffer)
	        	instructionBuffer = []
	        if datadict['mode'] == 'update':
	            instructionBuffer += datadict['updates']
	            self.transport.write("ok")

class Factory(protocol.Factory):
    def buildProtocol(self, addr):
        return Replier()

reactor.listenTCP(8080, WebSocketFactory(Factory()))
reactor.run()


