const MainPage = require("../pageobjects/main.page");
const HomePage = require("../pageobjects/home.page");
const CartPage = require("../pageobjects/cart.page")
const OrdersPage = require("../pageobjects/order.page");
const CountryPage = require("../pageobjects/country.page");
const helper = require("../helpers/helper")
const chai = require("chai");
const expectChai = chai.expect;

describe("Online order e2e test", () => {
    it("Openning the page", async () => {
        let path = helper.mainPagePath;
        let title = helper.mainPageTitle;
        await MainPage.goTo(path);
        let currentUrl = await MainPage.getCurrentUrl();
        let pageTitle = await MainPage.getCurrentPageTitle();
        expectChai(currentUrl).to.contain(path);
        expectChai(pageTitle).to.be.equal(title);
    })

    it("Searching the item", async () => {
        await HomePage.searchAnItem(helper.itemToSearch);
        let productName = await HomePage.getProductNameText();
        let productPrice = await HomePage.getProductPriceNumber();
        expectChai(productName).to.contain(helper.itemToSearch);
        expectChai(productPrice).to.be.equal(helper.mangoPrice);
    })

    it("Adding an item to cart", async () => {
        let productQuantity = helper.generateRadomNumber();
        let productPrice = helper.mangoPrice;
        let orederPrice = productPrice * productQuantity;
        await HomePage.addTheProduct(productQuantity);
        let addBtn = await HomePage.addToCartBtn;
        let itemsQuantity = await HomePage.getItemsQuantityNumber();
        let totalPrice = await HomePage.getTotalItemsPrice();
        await expect(addBtn).toHaveElementClass("added")
        expectChai(itemsQuantity).to.be.equal(1);
        expectChai(totalPrice).to.be.equal(orederPrice);
    })

    it("Opening the cart", async () => {
        await CartPage.openCart();
        let cart = await CartPage.cartPopUp;
        let itemsInCart = await CartPage.getItemsArray();
        let productInCartName = await CartPage.getProductNameText();
        await expect(cart).toHaveElementClass("active");
        await expect(itemsInCart).toHaveLength(1);
        expectChai(productInCartName).to.contain(helper.itemToSearch)
    })

    it("Navigating to order page", async () => {
        await CartPage.goToOrderPage();
        let productTable = await OrdersPage.productTable;
        await productTable.waitForDisplayed();
        let theProductsList = await OrdersPage.getProductsList();
        let currentUrl = await MainPage.getCurrentUrl();
        let nameOfProduct = await OrdersPage.getProductNameText();
        let numberOfProduct = await OrdersPage.getNumberOfPriducts();
        let priceOfProduct = await OrdersPage.getProductPrice();
        let displayedTotalPrice = await OrdersPage.getTotalPrice();
        let actualTotalPrice = numberOfProduct * priceOfProduct;
        await expect(theProductsList).toHaveLength(1);
        expectChai(await productTable.isDisplayed()).to.be.true;
        expectChai(currentUrl).to.contain(helper.orderPagePath);
        expectChai(nameOfProduct).to.contain(helper.itemToSearch);
        expectChai(displayedTotalPrice).to.be.equal(actualTotalPrice)
    })

    it("Navigate to placing order page", async () => {
        await OrdersPage.placeAnOrder();
        let countries = await CountryPage.dropdownList;
        await countries.waitForDisplayed();
        let currentUrl = await MainPage.getCurrentUrl();
        expectChai(currentUrl).to.contain(helper.countryPagePath);
    })

    it("Selecting the country and agree with Terms and Conditions", async () => {
        let index = await CountryPage.getCountryIndex();
        let countries = await CountryPage.getCountriesList();
        let checkbox = await CountryPage.termsAndConditionsCheckbox;
        await CountryPage.selectCountry(index);
        await CountryPage.agreeWithTermsAndConditions();
        expectChai(await countries[index].isSelected()).to.be.true;
        expectChai(await checkbox.isSelected()).to.be.true;
    })

    it("Complete the order", async() => {
        await CountryPage.confirmTheOrder();
        let success = await CountryPage.successMessage;
        expectChai(await success.isDisplayed()).to.be.true;
    })
})
