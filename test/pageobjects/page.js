
module.exports = class Page {
    goTo (path) {
        return browser.url(`https://rahulshettyacademy.com/${path}`)
    }
}
