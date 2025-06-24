import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class SignatureService {
    private secretKey = 'b17d3c2e5a6f8d9e47b52c98fd3c8f4e0b1a2d3e5f6a7b8c9d0e1f2a3b4c5d6e'; // Replace with a securely stored key

    constructor() { }

    /**
     * Sign the request payload using HMAC-SHA256
     * @param payload The request data
     * @returns Signed data and signature
     */
    signRequest(payload: any): { request: any; signature: string } {
        const dataString = JSON.stringify(payload);
        const signature = crypto.HmacSHA256(dataString, this.secretKey).toString();
        return { request: payload, signature };
    }

    /**
     * Verify the response signature to ensure data integrity
     * @param response The response from the server
     * @returns Boolean indicating if the response is valid
     */
    //   verifyResponse(response: any): boolean {
    //     if (!response || !response.data || !response.signature) {
    //       console.error('Invalid response format');
    //       return false;
    //     }
    //     const computedSignature = crypto.HmacSHA256(JSON.stringify(response.data), this.secretKey).toString();
    //     return computedSignature === response.signature;
    //   }

    verifyResponse(responseData: any): boolean {
        if (!responseData || !responseData.signature) {
            console.error('Invalid response format: Missing signature');
            return false;
        }
        const receivedSignature = responseData.signature;
        const responseClone = { ...responseData };
        delete responseClone.signature;
        const computedSignature = crypto.HmacSHA256(JSON.stringify(responseClone), this.secretKey).toString();
        return computedSignature === receivedSignature;
    }
}
