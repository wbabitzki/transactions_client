import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

import { environment } from "./../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class S3uploadService {

  constructor() { }

  uploadFile(file: File) {
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: environment.region
      }
    );

    const params = {
      Bucket: 'wba-file-store',
      Key: file.name,
      Body: file,
      ContentType: contentType
    };
    
    bucket.upload(params, function (err: any, data: any) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      console.log('Successfully uploaded file.', data);
      return true;
    });
  }
}
