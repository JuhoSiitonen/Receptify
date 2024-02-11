import React from "react";
import { useState, useCallback } from "react";
import { Widget } from "@uploadcare/react-widget";
import * as st from './Uploader.scss';

const baseUrl = 'https://ucarecdn.com/'


const UploaderWidget = ({ files, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleChange = (file) => {
        if (file) {
            console.log(file);
        }
        setUploadedFiles([...uploadedFiles, file]);
        console.log("uploadedFiles: ", uploadedFiles);
    }
    const handleRemoveClick = useCallback(
        (uuid) => onChange(uploadedFiles.filter(f => f.uuid !== uuid)),
        [files, onChange],
      );


    return (
    <div>
    <Widget 
        onChange={handleChange} 
        publicKey={process.env.UPLOADCARE_PUBLIC_KEY}
        clearable
        imagesOnly
        previewStep='true'
        />
    <div className={st.previews}>
        {uploadedFiles.map((file) => (
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
    )
}

export default UploaderWidget;
