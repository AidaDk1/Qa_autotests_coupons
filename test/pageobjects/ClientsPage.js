const Page = require('./utils');

class ClientPage extends Page {
    get addClientButton () {
        return $('button.clients-add-user-dialog');
    }

    get userForm () {
        return $('form.add-user-modal__form');
    }

    get firstNameInput () {
        return $('input[formcontrolname="userName"]');
    }

    get surnameInput () {
        return $('input[formcontrolname="userSurname"]');
    }

    get middleNameInput () {
        return $('input[formcontrolname="userMiddleName"]');
    }

    get genderRadio () {
        return $('mat-radio-group mat-radio-button:nth-child(1) div[class=\'mat-radio-label-content\']');
    }

    get emailInput () {
        return $('input[formcontrolname="email"]');
    }

    get phoneInput () {
        return $('input[formcontrolname="phone"]');
    }

    get birthdayInput () {
        return $('input[formcontrolname="birthday"]');
    }

    get saveButton () {
        return $('button[name=\'save\']');
    }

    get searchField () {
        return $('input[placeholder=\'Все пользователи\']');
    }

    get firstTrInListOfClients () {
        return $('table tbody tr:nth-child(1) td');
    }

    get updateMiddleNameInput () {
        return $('input[placeholder="Отчество"]');
    }

    get updateSaveButton () {
        return $('button[name="save"]');
    }


    async createClient() {
        await expect(browser).toHaveUrlContaining('clients');

        await this.addClientButton.click();
        await expect(this.userForm).toExist();

        await this.fillCreateUserForm();
        await this.saveButton.click();

        await browser.pause(5000);

        await browser.acceptAlert()
        await expect(browser).toHaveUrlContaining('clients')
    }

    async updateClient() {
        await expect(browser).toHaveUrlContaining('clients');

        await this.searchField.setValue('Blare');
        await browser.pause(3000);
        expect(await this.searchField.getValue()).toMatch('Blare');
        await browser.keys('Enter');
        await browser.pause(3000);

        await expect(this.firstTrInListOfClients).toExist();
        await this.firstTrInListOfClients.click();
        await browser.pause(5000);

        await this.updateMiddleNameInput.setValue('MiddleName');
        await this.updateSaveButton.click();
        await browser.pause(3000);
        await browser.acceptAlert()
        await browser.pause(3000);
    }

    async viewClient() {
        await expect(browser).toHaveUrlContaining('clients');
        await this.searchField.setValue('MiddleName');
        await browser.keys('Enter');
        await browser.pause(3000);
        await expect(this.firstTrInListOfClients).toExist();
        await this.firstTrInListOfClients.click();
        await browser.pause(5000);
    }

    async fillCreateUserForm() {
        await this.surnameInput.setValue('Blare');
        await this.firstNameInput.setValue('Alex');
        await this.middleNameInput.setValue('Middle');
        await this.genderRadio.click();
        await this.emailInput.setValue(`alexblare${Math.floor(Math.random() * 1000)}@gmail.com`);
        await this.phoneInput.setValue(`996${Math.floor(Math.random() * 555999999)}`)
        await this.birthdayInput.setValue('7/23/2000');
    }
}

module.exports = new ClientPage();
