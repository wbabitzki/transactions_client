import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as aws4 from 'aws4';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoredFile } from '../shared/models/stored-files';

import { environment } from "./../../environments/environment";


const options : any = { 
  method: 'GET',
  host: '2qqd1th9qg.execute-api.eu-central-1.amazonaws.com', 
  path: '/Test/list-stored-files', 
};

const credential = {
  secretAccessKey: environment.secretAccessKey,
  accessKeyId: environment.accessKeyId
};

@Injectable({
  providedIn: 'root'
})
export class StoredFilesService {

  constructor(private httpClient: HttpClient) {} 
  
  getStoredFiles(): Observable<StoredFile[]> {  

    aws4.sign(options, credential); 
    
    return this.httpClient.get<HttpResponse<any>>('https://' + options.host + options.path, {
      headers: {
        'Authorization': options.headers!['Authorization'] as string,
        'X-Amz-Date': options.headers!['X-Amz-Date'] as string
      }
    }).pipe(
      map(response => JSON.parse(response.body))
    );
  }
}
