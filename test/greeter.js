const Greeter = artifacts.require("Greeter");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Greeter", function (accounts) {
  it("should assert true", async function () {
    await Greeter.deployed();
    return assert.isTrue(true);
  });

  describe("greet()", () => {
    it("returns 'Hello, World!'", async () => {
      const greeter = await Greeter.deployed();
      const expected = "Hello, World!";
      const actual = await greeter.greet();
      assert.equal(actual, expected, "greeted with 'Hello, World!");
    });
  });

  describe("owner()", () => {
    it("return the address of the owner", async () => {
      const greeter = await Greeter.deployed();
      const owner = await greeter.owner();
      assert(owner, "the current owner");
    });
    it("matches the address that originally deployed the contract", async () => {
      const greeter = await Greeter.deployed();
      const owner = await greeter.owner();
      const expected = accounts[0];
      assert.equal(owner, expected, "matches address userd to deployed contract");
    });
  });
});

contract("Greeter: update greeting", () => {
  describe("setGreeting(string)", () => {
    it("sets greeting to passed in string", async () => {
      const greeter = await Greeter.deployed();
      const expected = "Hi there!";

      await greeter.setGreeting(expected);
      const actual = await greeter.greet();
      assert.equal(actual, expected, "greeting was not updated");
    });
  });
});

/*
const GreeterContract = artifacts.require("Greeter");

GreeterContract("Greeter", () => {
  it("has been deployed successfully", async () => {
    const greeter = await GreeterContract.deployed();
    assert(greeter, "contract was not deployed");
  });
});
*/