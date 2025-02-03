import { expect } from 'chai';

describe('diary entry page', () => {
  it('should log in, navigate to diary page, log out, and go to login page', async () => {
    await browser.url('http://localhost:5173/login');

    //fill in log in form
    const emailInput = await $('#email');
    const passwordInput = await $('#password');
    const loginButton = await $('button=Log In');

    await emailInput.setValue('carlos@email.com');
    await passwordInput.setValue('carlos');
    await loginButton.click();

    // wait for navigation after log in
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/diary-entry'),
      {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to /diary-entry',
      },
    );

    // logs out user
    const logoutButton = await $('button=Log out');
    // logoutButton.waitForExist();
    await logoutButton.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/login'),
      {
        timeout: 5000,
        timeoutMsg: 'Expected to be redirected to /login',
      },
    );
    expect(await browser.getUrl()).to.include('/login');
  });
});
