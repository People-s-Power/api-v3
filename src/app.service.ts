import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World 2!';
  }
  async conver(currency: string) {
    try {
      const { data } = await axios.get(
        `https://free.currconv.com/api/v7/convert?q=NGN_${currency}&compact=ultra&apiKey=${process.env.FX_ACCESS_KEY}`,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}
