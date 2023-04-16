require("@nomiclabs/hardhat-waffle")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    ganache: {
      url: 'HTTP://127.0.0.1:8545',
      accounts: [
        '0xa32631d121e6ba0143a2f0fa42da06825911e293150b7a5a9b30de82b833061c'
      ]
    }
  }
};

// 0x7888d9de382e071f1583D05B595B973a9E441d9b