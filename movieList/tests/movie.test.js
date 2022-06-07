const {Builder, Capabilities, By} = require('selenium-webdriver')

require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html')
})

afterAll(async () => {
    await driver.quit()
})

describe('tests for movie-list page', () => {

    test('test movie name is checked',async() => {
        //first we need the input field
        await driver.findElement(By.xpath('//input')).sendKeys('test \n')
        //we need the button
        // await driver.findElement(By.xpath(`//button`)).click()
        //use Xpath to get the li element which was newly created
        const movie = await driver.findElement(By.xpath(`//li`))
        //use the isDisplayed method which evaluates to true or false
        const displayed =  await movie.isDisplayed()
        //expect result of isdisplayed to be true
       await driver.findElement(By.xpath(`//li/span`)).click()

       await driver.sleep(3000)

       expect(By.xpath(`//class="checked"`)).toBeTruthy()
        
    })

    test('delete a movie', async() => {
    
        await driver.findElement(By.xpath('//input')).sendKeys('test \n')
        
        await driver.findElement(By.xpath(`//li/button`)).click()
        
        await driver.sleep(2000)
    
        expect(By.xpath('//ul')).not.toContain('test')
    })

    test('delete notification',async() => {
        await driver.findElement(By.xpath('//input')).sendKeys('test \n')
        
        await driver.findElement(By.xpath(`//li/button`)).click()

        await driver.sleep(2000)

        expect(By.id('message')).toBeTruthy()

    })
})