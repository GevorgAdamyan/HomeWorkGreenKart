const Page = require("./page");

class OrdersPage extends Page {
    get productTable() {
        return $(".products > #productCartTables");
    }

    async getProductsList() {
        let parent = this.productTable;
        let child = parent.$$("tbody");
        return child;
    }

    get productNameCell() {
        return $("td > .product-name")
    }

    async getProductNameText() {
        let name = await this.productNameCell;
        return name.getText();
    }

    get productQuantityCell() {
        return $("td > .quantity")
    }

    async getNumberOfPriducts() {
        let quantity = await this.productQuantityCell;
        let quantityAsNumber = await quantity.getText()
        return +quantityAsNumber;
    }

    get productPriceCell() {
        return $("td:nth-child(4) .amount")
    }

    async getProductPrice() {
        let price = await this.productPriceCell;
        let priceAsNumber = await price.getText();
        return +priceAsNumber;
    }

    get totalPriceCell() {
        return $("td:nth-child(5) .amount")
    }

    async getTotalPrice() {
        let totalPrice = await this.totalPriceCell;
        let totalPriceAsNumber = await totalPrice.getText();
        return +totalPriceAsNumber;
    }

    get placeAnOrderBtn() {
        return $(".products > div > button")
    }

    async placeAnOrder() {
        let button = await this.placeAnOrderBtn;
        await button.click();
    }
}

module.exports = new OrdersPage();
