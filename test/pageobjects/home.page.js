const Page = require("./page");

class HomePage extends Page {
    get searchBar() {
        return $("input.search-keyword");
    }

    async searchAnItem(item) {
        let inputField = await this.searchBar;
        await inputField.waitForDisplayed();
        await inputField.setValue(item);
        let productsList = await this.getProductsList();
        let filteredProductsNumber = await this.getSearchedProductsQuantity();
        await browser.waitUntil(async function () {
            return productsList.length === filteredProductsNumber;
        })
    }

    get productsContainer() {
        return $(".products-wrapper > .products");
    }

    async getProductsList() {
        let parent = await this.productsContainer;
        let child = parent.$$("div.product");
        return child;
    }

    async getSearchedProductsQuantity() {
        let productsList = await this.getProductsList();
        return productsList.length;
    }

    get productName() {
        return $(".product h4.product-name")
    }

    async getProductNameText() {
        let nameOfProduct = await this.productName;
        return nameOfProduct.getText();
    }

    get productPrice() {
        return $(".product p.product-price");
    }

    get productQuantityInputField() {
        return $(".stepper-input > .quantity");
    }

    async insertProductQuantity(number) {
        let inputField = await this.productQuantityInputField;
        await inputField.setValue(number);
    }

    async getProductPriceNumber() {
        let priceOfProduct = await (await this.productPrice).getText();
        return +priceOfProduct;
    }

    get addToCartBtn() {
        return $(".product-action > button");
    }

    async addTheProduct(number) {
        await this.insertProductQuantity(number);
        let addBtn = await this.addToCartBtn;
        await addBtn.click();
    }

    get itemsQuantity() {
        return $(".cart-info > table > tbody > tr:nth-child(1) > td:nth-child(3) > strong")
    }

    get totalItemsPrice() {
        return $(".cart-info > table > tbody > tr:nth-child(2) > td:nth-child(3) > strong")
    }

    async getItemsQuantityNumber() {
        let quantity = await this.itemsQuantity;
        let quantityAsNumber = await quantity.getText();
        return +quantityAsNumber;
    }

    async getTotalItemsPrice() {
        let totalPrice = await this.totalItemsPrice;
        let totalPriceAsNumber = await totalPrice.getText();
        return +totalPriceAsNumber;
    }
}

module.exports = new HomePage();
