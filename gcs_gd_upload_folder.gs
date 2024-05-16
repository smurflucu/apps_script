/*
  Info: Upload all Files in Google Drive ID Folder to Google Cloud Storage (GCS)
  target_file_id //ID FOLDER GDRIVE to be uploaded from Google Drive to Google Cloud Storage (GCS).
  target_bucket_name //Bucket Name
  target_bucket_path //Bucket Path
*/

function gcs_folder_upload_script(target_folder_id, target_bucket_name, target_bucket_path) {
  const fb_upload_folder = DriveApp.getFolderById(target_folder_id);
  const fb_upload_files = fb_upload_folder.getFiles();

  while (fb_upload_files.hasNext()) {
    let fb_upload_file = fb_upload_files.next();
    let fb_upload_file_blob = fb_upload_file.getBlob();
    let fb_upload_file_name = fb_upload_file.getName();

    let fb_upload_bucket_path_partitions = target_bucket_path.split("/");
    let fb_upload_objectName = fb_upload_bucket_path_partitions.slice(1).join("/") + '/' + fb_upload_file_name;
    let fb_upload_bytes = fb_upload_file_blob.getBytes();
    let fb_upload_url = `https://www.googleapis.com/upload/storage/v1/b/${target_bucket_name}/o?uploadType=media&name=${encodeURIComponent(fb_upload_objectName)}`;

    try {
      const fb_upload_response = UrlFetchApp.fetch(fb_upload_url, {
        method: 'POST',
        contentLength: fb_upload_bytes.length,
        contentType: fb_upload_file_blob.getContentType(),
        payload: fb_upload_bytes,
        headers: {
          "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
        }
      });
      //return JSON.parse(fb_upload_response.getContentText())
      console.log('File: ' + fb_upload_file_name + ', uploaded!')
    } catch (error) {
      throw new Error('Error Uploading file: ' + error);
    }
  }
}
