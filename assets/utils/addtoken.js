import Message from '~/components/common/Message';
async function addToken({
    tokenAddress,
    tokenSymbol,
    tokenDecimals,
    tokenImage,
}) {
    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        console.log(tokenAddress, tokenSymbol, tokenDecimals, tokenImage);
        await ethereum
            .request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            })
            .then((success) => {
                if (success) {
                    Message({
                        message: `${tokenSymbol} added successfully`,
                        type: 'success',
                    });
                } else {
                }
            });
    } catch (error) {
        console.log(error);
    }
}
export default addToken;
