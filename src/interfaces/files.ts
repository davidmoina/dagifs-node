export interface ImageRequest {
  name: string;
  data: {
    type: string;
    data: [];
  };
  size: number;
  encoding: string;
  tempFilePath: string;
  truncated: boolean;
  mimetype: string;
  md5: string;
}

export interface FilesRequest {
  image: ImageRequest;
}
