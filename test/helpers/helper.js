module.exports = {
    mainPagePath: "seleniumPractise/#/",
    mainPageTitle: "GreenKart - veg and fruits kart",
    itemToSearch: "Mango",
    mangoPrice: 75,
    orderPagePath: "/seleniumPractise/#/cart",
    countryPagePath: "/seleniumPractise/#/country",
    generateRadomNumber() {
        return Math.round(Math.random() * 100);
    }
}