const Page = require("./utils");

class CouponsPage extends Page {
  get createCouponButton() {
    return $("button.create-coupon-btn");
  }

  get discountField() {
    return $("input[name='discount']");
  }

  get clientNameField() {
    return $("input[name='clientName']");
  }

  get benefitField() {
    return $("input[name='benefit']");
  }

  get startDateField() {
    return $("input[name='startDate']");
  }

  get endDateField() {
    return $("input[name='endDate']");
  }

  get saveButton() {
    return $("button.save-btn");
  }

  get successMessage() {
    return $("div.success-message");
  }

  get couponList() {
    return $("div.coupon-list");
  }

  async open() {
    await browser.url("http://167.114.201.175:5000/coupons");
    await browser.pause(5000);
  }

  async createCoupon(discount, clientName, benefit, startDate, endDate) {
    await this.createCouponButton.click();
    await this.discountField.setValue(discount);
    await this.clientNameField.setValue(clientName);
    await this.benefitField.setValue(benefit);
    await this.startDateField.setValue(startDate);
    await this.endDateField.setValue(endDate);
    await this.saveButton.click();
    await browser.waitUntil(() => this.successMessage.isDisplayed());
  }

  async checkCouponListExist() {
    await expect(this.couponList).toBeDisplayed();
  }
}

module.exports = new CouponsPage();
