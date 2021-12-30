

function responseUpdate() {
    if (self.update === 'Reload Browser') {
        self.postMessage('RELOAD')
    } else if(self.updated == undefined) {
        Object.defineProperty(self, 'updated', {
            value: self.update ,
            enumerable: true,
            writable: true,
            configurable: true
          })
    } 
    if (self.updated !== self.update) {
        self.postMessage(self.update)
        self.updated = self.update
    } 

}

function requestUpdate(host, timer) {
    fetch(host + '/jinload/update', {
        method: 'PUT', 
    })
    .then(response => {
        response.text().then(function(text) {
            self.update = text
            responseUpdate(text)
        })
    })
    .catch((error) => {
        console.error('Error:', error)
        self.postMessage('RELOAD')
    })

    setTimeout(() => {
        requestUpdate(host, timer)
    }, timer);

}

onmessage = function (event) {
    if (event) {
        requestUpdate(event.data, 500)
    }
}