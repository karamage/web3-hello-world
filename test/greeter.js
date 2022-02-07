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

contract("Greeter: update greeting", (accounts) => {
  describe("setGreeting(string)", () => {
    describe("when message is sent by the owner", () => {
      it("sets greeting to passed in string", async () => {
        const greeter = await Greeter.deployed();
        const expected = "Hi there!";

        await greeter.setGreeting(expected);
        const actual = await greeter.greet();
        assert.equal(actual, expected, "greeting was not updated");
      });
    });
    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const greeter = await Greeter.deployed();
        const expected = await greeter.greet();
        try {
          await greeter.setGreeting("Not the owner", { from: accounts[1] });
        } catch (err) {
          // console.log("err=", err);
          const errorMessage = "Ownable: caller is not the owner";
          assert.equal(err.reason, errorMessage, "greeting should not update");
          return;
        }
        assert(false, "greeting should not update");
      });
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