import React from 'react';
import { useState, useRef, useCallback, useEffect } from 'react';
import * as LR from '@uploadcare/blocks';
//import { OutputFileEntry } from '@uploadcare/blocks';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';

import * as st from './Uploader.scss';
import cssOverrides from './Uploader.css?inline';

const baseUrl = 'https://ucarecdn.com/'

LR.registerBlocks(LR);

const Uploader = ({ files, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const ctxProviderRef = useRef();


    const handleRemoveClick = useCallback(
        (uuid) => onChange(files.filter(f => f.uuid !== uuid)),
        [files, onChange],
      );


    useEffect(() => {
        const handleUploadEvent = (e) => {
          if (e.detail) {
            console.log(e.detail);
            console.log("handleUploadEvent running")
            setUploadedFiles([...e.detail]);
          }
        };
        console.log("adding event listener")
        ctxProviderRef.current?.addEventListener('upload-finish', handleUploadEvent);

        //return () => {
        //ctxProviderRef.current?.removeEventListener('upload-finish', handleUploadEvent);
        //};
    }, []);
    
    /*
    useEffect(() => {
        const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();
        console.log("resetUploaderState running")
        const handleDoneFlow = () => {
          resetUploaderState();
    
          onChange([...files, ...uploadedFiles]);
          setUploadedFiles([]);
        };
    
        ctxProviderRef.current?.addEventListener('done-flow', handleDoneFlow);
    
        return () => {
          ctxProviderRef.current?.removeEventListener('done-flow', handleDoneFlow);
        };
      }, [files, onChange, uploadedFiles, setUploadedFiles]);
      */

  return (
    <div className={st.root}>
      <lr-config
        ctx-name="my-uploader"
        pubkey="e71d11ac7eca6e9bfa96"
        confirmUpload={false}
        imgOnly={true}
      />
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={blocksStyles}
      />
      <lr-upload-ctx-provider
        ctx-name="my-uploader"
        ref={ctxProviderRef}
      />
        <div className={st.previews}>
        {files.map((file) => (
          <div key={file.uuid} className={st.preview} >
            {console.log(file.uuid)}
            {console.log(file.cdnUrl)}
            {console.log("map function running")}
            <img
              className={st.previewImage}
              key={file.uuid}
              src={`${baseUrl}/${file.uuid}/-/preview/-/resize/x200/`}
              width="100"
              alt={file.originalFilename || ''}
              title={file.originalFilename || ''}
            />
            <button
              className={st.previewRemoveButton}
              type="button"
              onClick={() => handleRemoveClick(file.uuid)}
            >×</button>
          </div>
        ))}
        </div>
    </div>
  );
}

export default Uploader;