const LoginPage = require( "../pageobjects/LoginPage");

describe("Login to Navigator", ()=>{
    beforeEach( async ()=> {
        await  browser.reloadSession();
    })
    it("Invalid login", async ()=>{
        await LoginPage.open()
        await LoginPage.login('Admin', 'InvalidPass')
        await browser.pause(5000);
        await expect(browser).toHaveUrlContaining('http://167.114.201.175:5000/login')
    })


    it("Success login", async ()=>{
        await LoginPage.open();
        await LoginPage.login('Admin', 'Admin@Navi')
        await browser.pause(5000);
        await expect(browser).toHaveUrlContaining('http://167.114.201.175:5000/clients');
    })
})
