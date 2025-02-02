import { expect } from 'chai';

describe('Login Form', () => {
  let emailInput,
    passwordInput,
    submitButton,
    errorMessage,
    googleButton,
    githubButton,
    registerButton,
    togglePasswordButton;

  beforeEach(async () => {
    await browser.url('http://localhost:5173/login');

    emailInput = await $('#email');
    passwordInput = await $('#password');
    submitButton = await $('button[type=submit]');
    errorMessage = await $('.error-message');
    googleButton = await $('button=Sign In with Google');
    githubButton = await $('button=Sign In with Github');
    registerButton = await $('button=Register');
    togglePasswordButton = await $('button=show');
  });
  it('should load the login form with email and password fields', async () => {
    expect(await emailInput).to.exist;
    expect(await passwordInput).to.exist;
    expect(await submitButton).to.exist;
  });

  it('should display error message when login fails', async () => {
    await emailInput.setValue('wrong-email@test.com');
    await passwordInput.setValue('wrong-password');
    await submitButton.click();
    expect(await errorMessage).to.exist;
  });

  it('should toggle password visibility', async () => {
    expect(await passwordInput.getAttribute('type')).to.equal(
      'password',
    );
    await togglePasswordButton.click();
    expect(await passwordInput.getAttribute('type')).to.equal('text');
  });

  it('should navigate to register page on register button click', async () => {
    await registerButton.click();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/register'),
      {
        timeout: 5000,
      },
    );
  });

  it('should navigate to google OAuth page on google button click', async () => {
    await googleButton.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).to.include('accounts.google');
  });

  it('should navigate to github login when on button click', async () => {
    await githubButton.click();
    const currentUrl = await browser.getUrl();
    console.log('github redirect: ', currentUrl);
    console.log('github redirect: ', currentUrl);
    console.log('github redirect: ', currentUrl);
    console.log('github redirect: ', currentUrl);
    console.log('github redirect: ', currentUrl);
    console.log('github redirect: ', currentUrl);

    expect(currentUrl).to.include('github');
  });
});
