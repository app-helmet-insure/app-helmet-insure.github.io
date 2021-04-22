import query_abi from '~/abi/query_abi.json';
export const BurgerSwapContract = async (address) => {
    return await new window.WEB3.eth.Contract(
        query_abi.abi,
        '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed'
    );
};
export const burgerswap = async (token, token1) => {
    let Contract = await BurgerSwapContract();
    return Contract.methods
        .getLpValueByFactory(
            '0x1eCaeE6e4e01C45712ccd9262c3e9F623A6ac7ed',
            '0xCa7597633927A98B800738eD5CD2933a74a80e8c',
            '0x948d2a81086A075b3130BAc19e4c6DEe1D2E3fE8',
            '1000000000000000000'
        )
        .call()
        .then((res) => {
            console.log(res);
        });
};
