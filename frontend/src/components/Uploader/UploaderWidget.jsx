import { useState } from "react";
import { Widget } from "@uploadcare/react-widget";
import './Uploader.css';

const baseUrl = 'https://ucarecdn.com/'

const UploaderWidget = ({ files, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleChange = file => {
        if (!file) {
          onChange("")
          setUploadedFiles([])
          return;
        }
        file.done(file => {
          setUploadedFiles([...uploadedFiles, file]);
          onChange(file.uuid);
        });
    }

    return (
    <div>
    <Widget 
        publicKey={process.env.UPLOADCARE_PUBLIC_KEY}
        clearable
        imagesOnly
        previewStep='true'
        onFileSelect={handleChange}
        />
    <div className='preview'>
        {uploadedFiles.map((file) => (
          <div key={file.uuid} >
            <img
              key={file.uuid}
              src={`${baseUrl}/${file.uuid}/-/preview/-/resize/x200/`}
              width="100"
              alt={file.originalFilename || ''}
              title={file.originalFilename || ''}
            />
          </div>
        ))}
    </div>
    </div>
    )
}

export default UploaderWidget;
