import React, { lazy } from 'react'
import { DropzoneArea } from 'material-ui-dropzone';
const StrMgr = () => {
  return (
    <>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText={"Drag and drop an image here or click"}
        onChange={(files) => console.log('Files:', files)}
      />
    </>
  )
}

export default StrMgr
