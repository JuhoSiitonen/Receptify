  require('isomorphic-fetch');

  const { TextDecoder, TextEncoder } = require('util');
  
  Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
  });
  
  const { Blob } = require('buffer');
  const { Headers, FormData, Request, Response } = require('node-fetch');
  
  Object.defineProperties(globalThis, {
      Blob: { value: Blob },
      Headers: { value: Headers },
      FormData: { value: FormData },
      Request: { value: Request },
      Response: { value: Response },
  });