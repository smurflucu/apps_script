/*
  target_file_id //ID FILE to be uploaded from Google Drive to Google Cloud Storage (GCS).
  target_bucket_name //Bucket Name
  target_bucket_path //Bucket Path
*/

function gcs_file_upload_script(target_file_id, target_bucket_name, target_bucket_path) {
  const fb_upload_file = DriveApp.getFileById(target_file_id);
  const fb_upload_fileName = fb_upload_file.getName();
  const fb_upload_fileBlob = fb_upload_file.getBlob();

  const fb_upload_lBucketName = target_bucket_name.length
  const fb_upload_bucket_path_partitions = target_bucket_path.split("/");

  const fb_upload_objectName = fb_upload_bucket_path_partitions.slice(1).join("/") + '/' + fb_upload_fileName;

  const fb_upload_bytes = fb_upload_fileBlob.getBytes();
  const fb_upload_url = `https://www.googleapis.com/upload/storage/v1/b/${target_bucket_name}/o?uploadType=media&name=${encodeURIComponent(fb_upload_objectName)}`;
  try {
    const fb_upload_response = UrlFetchApp.fetch(fb_upload_url, {
      method: 'POST',
      contentLength: fb_upload_bytes.length,
      contentType: fb_upload_fileBlob.getContentType(),
      payload: fb_upload_bytes,
      headers: {
        "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
      }
    });
    return JSON.parse(fb_upload_response.getContentText())
  } catch (error) {
    throw new Error('Error Uploading file: ' + error)
  }
}
