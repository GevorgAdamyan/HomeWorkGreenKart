const Page = require("./page");

class CartPage extends Page {
    get cartLink() {
        return $(".cart-icon > img");
    }
    
    async openCart() {
        let cartBtn = await this.cartLink;
        await cartBtn.click();
    }

    get cartPopUp() {
        return $(".cart> .cart-preview")
    }

    get itemsList() {
        return $(".cart-preview .cart-items")
    }

    async getItemsArray() {
        let parent = await this.itemsList;
        let child = parent.$$("li");
        return child;
    }

    get productName() {
        return $(".cart-preview .product-info > .product-name");
    }

    async getProductNameText() {
        let name = await this.productName;
        return name.getText();
    }

    get proceedToCheckoutBtn() {
        return $(".cart-preview.active > .action-block > button")
    }

    async goToOrderPage() {
        let goToBtn = this.proceedToCheckoutBtn;
        await goToBtn.click();
    }
}

module.exports = new CartPage();
