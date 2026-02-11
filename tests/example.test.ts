describe("Example suite",()=>{
    beforeAll(()=>{
        console.log("Before all test");
    })
    beforeEach(()=>{
        console.log("before each test");
    })
    afterAll(()=>{
        console.log("after all test");
    })
    afterEach(()=>{
        console.log("after Each test");
    })

    it("should move through the whole life cycle declared above",()=>{
        console.log("run the life cycle");
    })
})