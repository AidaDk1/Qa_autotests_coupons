
module.exports = class Page {

    open (path) {
        return browser.url(`http://167.114.201.175:5000/${path}`)
    }

    pause (milliseconds) {
        return browser.pause(milliseconds);
    }
}
