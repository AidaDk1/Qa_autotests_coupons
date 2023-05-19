const Page = require('./utils');


class LoginPage extends Page {

    get inputUsername () {
        return $('input[name="userName"]');
    }

    get inputPassword () {
        return $('input.password');
    }

    get btnSubmit () {
        return $('button[type="submit"]');
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
        await browser.pause(5000)
    }

    open () {
        return super.open('login');
    }
}

module.exports = new LoginPage();
