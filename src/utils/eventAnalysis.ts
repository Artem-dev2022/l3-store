export const analyzeEvent = (
        type: string,
        url?: string,
        productProperties?: any,
        secretKey?: string,
        orderId?: number,
        totalPrice?: number,
        productIds?: [number]
    ) => {
    type event = {
        type: string;
        payload: any;
        timestamp: number;
    };

    let data: event = {
        type: type,
        payload: '', 
        timestamp: Date.now()
    }

    if (type === 'route') {
        data.payload = { 'url': url }
    } else if (type === 'viewCard') {
        data.payload = [productProperties, secretKey]
        if (productProperties.log !== '') {
            data.type = 'viewCardPromo' 
        }
    } else if (type === 'addToCard') {
        data.payload = productProperties
    } else if (type === 'purchase') {
        data.payload = { 
            orderId: orderId, 
            totalPrice: totalPrice, 
            productIds: productIds 
        }
    } else {
        return
    }

    console.log(data)
    fetch('/api/sendEvent', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}