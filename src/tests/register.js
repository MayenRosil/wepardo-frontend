const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

(async function testRegisterForm() {
  // Inicializa el Driver de Selenium
  let driver = await new Builder().forBrowser('chrome').build();

  // Datos de prueba
  const USERNAME = 'kenny';
  const COMPANY = '1';
  const PASSWORD = '12345';
  const EMAIL = 'kenny@saenz.com';
  const EMPLOYEE = '3';

  try {
    // Navegar a la URL donde está alojada la aplicación
    await driver.get('http://localhost:3000/signin');

    // Esperar a que el botón de registro esté presente y visible
    let openModalButton = await driver.wait(until.elementLocated(By.id('registerButton')), 10000);
    await driver.wait(until.elementIsVisible(openModalButton), 5000);

    // Verificar si el botón está cubierto por otro elemento
    let isDisplayed = await openModalButton.isDisplayed();
    if (!isDisplayed) {
      throw new Error('El botón de registro está cubierto por otro elemento o no está visible.');
    }

    // Usar ActionChains para mover el ratón al elemento antes de hacer clic
    const actions = driver.actions({ bridge: true });
    await actions.move({ origin: openModalButton }).click().perform();

    // Esperar a que el modal de registro se muestre
    let registerModal = await driver.wait(until.elementLocated(By.id('signUpModal')), 10000);
    await driver.wait(until.elementIsVisible(registerModal), 5000);



    // Encuentra y rellena los campos
    let companyInput = await driver.findElement(By.id('companyRegister'));
    await companyInput.sendKeys(COMPANY);

    // Encuentra y rellena los campos
    let usernameInput = await driver.findElement(By.id('usernameRegister'));
    await usernameInput.sendKeys(USERNAME);

    // Encuentra y rellena los campos
    let passwordInput = await driver.findElement(By.id('passwordRegister'));
    await passwordInput.sendKeys(PASSWORD);

    // Encuentra y rellena los campos
    let emailInput = await driver.findElement(By.id('emailRegister'));
    await emailInput.sendKeys(EMAIL);

    // Encuentra y rellena los campos
    let employeeInput = await driver.findElement(By.id('employeeRegister'));
    await employeeInput.sendKeys(EMPLOYEE);



    // Encuentra y presiona el boton de iniciar sesion
    let signInButton = await driver.findElement(By.id('btnCreateAccount'));
    await signInButton.click();


    
    // Intentar localizar el elemento snackAlert 
    // Si no existe, las credenciales son correctas
    // Solo se levanta cuando existe un error
    let snackBarMessage = null;
    try {
      snackBarMessage = await driver.wait(until.elementLocated(By.id('snackAlert')), 2000);
      let messageText = await snackBarMessage.getText();
      console.log(messageText);
    } catch (err) {
      console.log("Creacion de usuario exitosa.");
    }

  } catch (error) {
    console.error('Error en la prueba:', error);
  } finally {
    await driver.quit();
  }
})();
