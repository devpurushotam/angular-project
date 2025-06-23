import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AesService {
  private aesKeyBase64 = 'hX2RzN6YjlVZz8yTQ9kvlhRQmfzn6LxvlEJzjXsKjSo='; // 32-byte AES Key in Base64

  constructor() {}

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  

  private uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    bytes.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
  }

  private async importAESKey(): Promise<CryptoKey> {
    const keyBytes = this.base64ToUint8Array(this.aesKeyBase64);
    return crypto.subtle.importKey(
      'raw',
      keyBytes,
      { name: 'AES-GCM' },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encryptData(data: any): Promise<string> {
    const key = await this.importAESKey();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // Generate IV
  
    // Convert Object to JSON String
    const jsonData = JSON.stringify(data);
    const encoder = new TextEncoder();
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encoder.encode(jsonData)
    );
  
    // Convert to Uint8Array correctly
    const encryptedData = new Uint8Array(encrypted);
    const encryptedBytes = new Uint8Array(iv.length + encryptedData.length);
  
    encryptedBytes.set(iv, 0); // Copy IV to the beginning
    encryptedBytes.set(encryptedData, iv.length); // Append encrypted data
  
    // ✅ Convert Uint8Array to Base64 correctly
    return this.uint8ArrayToBase64(encryptedBytes);
  }
  
  

  async decryptData(encryptedBase64: string): Promise<any> {
    const key = await this.importAESKey();
    const encryptedBytes = this.base64ToUint8Array(encryptedBase64);
    const iv = encryptedBytes.slice(0, 12); // Extract IV
    const data = encryptedBytes.slice(12); // Extract encrypted content
  
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      data
    );
  
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted)); // Convert JSON string back to Object
  }
}  

