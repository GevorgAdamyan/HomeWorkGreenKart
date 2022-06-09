const Page = require("./page");

class CountryPage extends Page {
    get dropdownList() {
        return $(".wrapperTwo > div > select");
    }

    async openDropdownList() {
        let dropdown = await this.dropdownList;
        await dropdown.click();
    }

    async getCountriesList() {
        let parent = await this.dropdownList;
        let child = parent.$$("option");
        return child;
    }

    async getCountryIndex() {
        let countries = await this.getCountriesList()
        let index = Math.floor(Math.random() * (countries.length - 1) + 1);
        return index;
    }

    async selectCountry(index) {
        await this.openDropdownList();
        let list = await this.dropdownList
        await list.waitForDisplayed();
        let countries = await this.getCountriesList();
        await countries[index].click();
    }

    get termsAndConditionsCheckbox() {
        return $(".chkAgree");
    }

    async agreeWithTermsAndConditions() {
        let checkbox = await this.termsAndConditionsCheckbox;
        await checkbox.click();
    }

    get proceedBtn() {
        return $(".wrapperTwo > button");
    }

    async confirmTheOrder() {
        let button = await this.proceedBtn;
        await button.click();
    }

    get successMessage() {
        return $('span*=Thank you, your order has been placed successfully')
    }
}

module.exports = new CountryPage();
