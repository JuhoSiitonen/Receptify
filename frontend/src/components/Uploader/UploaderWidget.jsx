import React from "react";
import { useState } from "react";
import { Widget } from "@uploadcare/react-widget";

import "./styles.css";

const UploaderWidget = ({ files, onChange}) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleChange = (file) => {
        if (file) {
            console.log(file);
        }
        setUploadedFiles(file);
    }

    return (
    <Widget onChange={handleChange} publicKey="e71d11ac7eca6e9bfa96" clearable />
    )
}

export default UploaderWidget;

// npm i @uploadcare/react-widget/en-min

