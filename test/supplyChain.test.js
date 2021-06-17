const { assert } = require('chai');

const SupplyChain = artifacts.require('supplyChain');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('supplyChain', ([buyer, seller, logistics,importer]) => {
    let supplyChain
  
    before(async () => {
      supplyChain = await SupplyChain.deployed()
    })

    describe('deployment' , async() => {
        it('should deploy' , async() => {

            let address = supplyChain.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })

    describe('product' , async() => {

        it('should add product' , async() => {
            const result = await supplyChain.addProduct("product_1" , {from : seller})
            const productCount = await supplyChain.productCount()

        
           assert.equal(productCount , 1)
           const event = result.logs[0].args
           assert.equal( event.name, "product_1")
           assert.equal( event.owner , seller)
           assert.equal(event.id.toNumber(),productCount.toNumber())
           assert.equal(event.currentLocation,0x0)
        })

        it('should add new location' , async() => {
            const result1 = await supplyChain.changeLocation( 'new fright hub' , 1 , { from: importer})

            const event1 = result1.logs[0].args
            assert.equal(event1.id.toNumber(),1)
            assert.equal(event1.currentLocation, 'new fright hub')
        })

        it("should return info" , async() => {
            const result3 = await supplyChain.fetchInfo( 1 ,{from:buyer})
            const event3  = result3.logs[0].args
            console.log(result3)
        })
    })
})