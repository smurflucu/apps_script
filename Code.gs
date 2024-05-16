/*
  This just for sample to call the function upload for single file from google drive (GD) into google cloud storage (GCS)
  replace "ID FILE GDRIVE", "BUCKET NAME", and "BUCKET PATH" as you needs
*/

function sample_call_upload() {
  const upload_variable = gcs_file_upload_script('ID FILE GDRIVE','BUCKET NAME','BUCKET PATH')

  if (upload_variable) {
    console.log('File Uploaded Successfully:',upload_variable)
  }
}
