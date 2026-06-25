



export const generateOrderNumber = async () => {
    const orderNumber = `VEN-${Date.now()}`;
    return orderNumber;
}