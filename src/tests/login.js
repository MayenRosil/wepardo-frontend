const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');

(async function testSignInForm() {
  // Inicializa el Driver de Selenium
  let driver = await new Builder().forBrowser('chrome').build();

  // Datos de prueba
  const USERNAME = 'mayenrosil';
  const COMPANY = '1';
  const PASSWORD = '12345';

  try {


    // Navegar a la URL donde está alojada
    await driver.get('http://localhost:3000/signin');



    // Encuentra y rellena los campos
    let companyInput = await driver.findElement(By.id('company'));
    await companyInput.sendKeys(COMPANY);

    let usernameInput = await driver.findElement(By.id('username'));
    await usernameInput.sendKeys(USERNAME);

    let passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys(PASSWORD);



    // Encuentra y presiona el boton de iniciar sesion
    let signInButton = await driver.findElement(By.id('signInButton'));
    await signInButton.click();



    // Valida si un campo esta vacio
    if (!await companyInput.getAttribute('value')) {
      console.log("El campo 'Company' está vacío.");
    }
    if (!await usernameInput.getAttribute('value')) {
      console.log("El campo 'Username' está vacío.");
    }
    if (!await passwordInput.getAttribute('value')) {
      console.log("El campo 'Password' está vacío.");
    }



    // Intentar localizar el elemento snackAlert 
    // Si no existe, las credenciales son correctas
    // Solo se levanta cuando existe un error
    let snackBarMessage = null;
    try {
      snackBarMessage = await driver.wait(until.elementLocated(By.id('snackAlert')), 2000);
      let messageText = await snackBarMessage.getText();
      console.log(messageText);
    } catch (err) {
      console.log("Inicio de sesión exitoso.");
    }


  } catch (error) {
    console.error('Error en la prueba:', error);
  } finally {
    await driver.quit();
  }
})();
