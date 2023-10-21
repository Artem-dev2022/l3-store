import { ProductData } from 'types';

export const analyzeEvent = (
        type: string,
        payload: {
            url?: string,
            productProperties?: ProductData,
            secretKey?: string,
            orderId?: number,
            totalPrice?: number,
            productIds?: number[]
        }
    ) => {
    let data: {
        type: string,
        payload: [] | {}, 
        timestamp: number
    } = {
        type: type,
        payload: [], 
        timestamp: Date.now()
    }

    if (type === 'route') {
        data.payload = { 'url': payload.url }
    } else if (type === 'viewCard') {
        data.payload = [payload.productProperties, payload.secretKey]
        if (JSON.stringify(payload.productProperties?.log) !== '{}') {
            data.type = 'viewCardPromo' 
        }
    } else if (type === 'addToCard') {
        if (payload.productProperties) data.payload = payload.productProperties
    } else if (type === 'purchase') {
        data.payload = { 
            orderId: payload.orderId, 
            totalPrice: payload.totalPrice, 
            productIds: payload.productIds 
        }
    } else {
        return
    }

    fetch('/api/sendEvent', {
        method: 'POST',
        body: JSON.stringify(data)
    })
}