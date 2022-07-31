import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private readonly httpService: HttpService) { }

  public toString(): string {
    return 'Hello from ApiService';
  }

  async auth() {
    const responseData = await lastValueFrom(
      this.httpService.get('https://dummyjson.com/products').pipe(
        map((response) => {
          return response.data.products;
        }),
      ),
    );

    

    console.log();


  }
}
