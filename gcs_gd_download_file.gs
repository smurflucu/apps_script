/*
  Info: Download single file from GCS copies or Download into Google Drive (root level)
  target_file_name //file name that need to download from Google Cloud Storage (GCS) into Google Drive (GD)
  target_bucket_name //Bucket Name
  target_bucket_path //Bucket Path
*/

function gcp_download_script(target_file_name, target_bucket_name, target_bucket_path) {
  const fb_download_lBucketName = target_bucket_name.length
  const fb_download_bucket_path_partitions = target_bucket_path.split("/");

  const fb_download_objectName = fb_download_bucket_path_partitions.slice(1).join("/") + '/' + target_file_name;

  console.log(fb_download_objectName);
  const fb_download_url = `https://storage.googleapis.com/storage/v1/b/${target_bucket_name}/o/${encodeURIComponent(fb_download_objectName)}?alt=media`;
  try {
    const fb_download_response = UrlFetchApp.fetch(fb_download_url, {
      method: 'GET',
      headers: {
        "Authorization" : "Bearer " + ScriptApp.getOAuthToken()
      }
    });
    //return fb_download_response.getBlob();

    const fb_download_fileBlob = fb_download_response.getBlob();

    //console.log(fb_download_fileBlob)

    if (fb_download_fileBlob) {
      const file = DriveApp.createFile(fb_download_fileBlob).setName(target_file_name);
      //console.log(file.getUrl());

      return file.getUrl();
    }
  } catch (error) {
    console.error('Error getting file:',error);
  }
}
