const Page = require("./page");

class MainPage extends Page {
    async goTo(path) {
        await super.goTo(path);
        await browser.maximizeWindow();
    }

    async getCurrentUrl() {
        return browser.getUrl();
    }

    async getCurrentPageTitle() {
        return browser.getTitle();
    }
}

module.exports = new MainPage();
