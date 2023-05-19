const assert = require("assert");
const LoginPage = require("../pages/LoginPage");
const CouponsPage = require("../pages/CouponsPage");

describe("Coupons Page", function () {
  beforeEach(async function () {
    await LoginPage.open();
    await LoginPage.login("username", "password");
    await CouponsPage.open();
  });

  afterEach(async function () {
    await CouponsPage.logout();
  });

  it("should display coupon list", async function () {
    const couponList = await CouponsPage.getCouponList();
    assert.ok(await couponList.isDisplayed(), "Coupon list is not displayed");
  });

  it("should create a new coupon", async function () {
    const discount = "10%";
    const clientName = "John Doe";
    const benefit = "50";
    const startDate = "2023-05-20";
    const endDate = "2023-06-30";

    await CouponsPage.createCoupon(
      discount,
      clientName,
      benefit,
      startDate,
      endDate
    );

    const successMessage = await CouponsPage.getSuccessMessage();
    assert.ok(
      await successMessage.isDisplayed(),
      "Success message is not displayed"
    );

    const couponList = await CouponsPage.getCouponList();
    assert.ok(await couponList.isDisplayed(), "Coupon list is not displayed");

    const createdCoupon = await CouponsPage.findCouponInList(clientName);
    assert.ok(createdCoupon, "Created coupon is not found in the list");
  });

  it("should display validation errors for invalid fields", async function () {
    await CouponsPage.clickCreateCouponButton();
    await CouponsPage.clickSaveButton();

    const validationErrors = await CouponsPage.getValidationErrors();
    assert.ok(validationErrors.length > 0, "Validation errors not displayed");
  });

  it("should not create a coupon with invalid fields", async function () {
    const couponListCount = await CouponsPage.getCouponListCount();

    await CouponsPage.clickCreateCouponButton();
    await CouponsPage.clickSaveButton();

    const newCouponListCount = await CouponsPage.getCouponListCount();
    assert.equal(
      newCouponListCount,
      couponListCount,
      "Coupon with invalid fields was created"
    );
  });
});
