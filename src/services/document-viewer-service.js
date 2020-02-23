import OpenFile from "react-native-doc-viewer";
import { Platform } from "react-native";
const RNFS = require("react-native-fs");
const SavePath =
  Platform.OS === "ios" ? RNFS.MainBundlePath : RNFS.DocumentDirectoryPath;
const IsIOS = Platform.OS === "ios";

class DocumentViewerService {
  remoteFile(path, fileName, fileExtension = undefined) {
    return new Promise((resolve, reject) => {
      try {
        if (IsIOS) {
          //IOS
          OpenFile.openDoc(
            [
              {
                url: path,
                fileNameOptional: fileName
              }
            ],
            (err, url) => resolve({ err, url })
          );
        } else {
          //Android
          OpenFile.openDoc(
            [
              {
                url: path,
                fileName: fileName,
                cache: false,
                fileType: fileExtension.replace(".", "")
              }
            ],
            (err, url) => resolve({ err, url })
          );
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  localFile(path, fileName, fileExtension = undefined) {
    return new Promise((resolve, reject) => {
      try {
        if (IsIOS) {
          //IOS
          OpenFile.openDoc(
            [
              {
                url: SavePath + path,
                fileNameOptional: fileName
              }
            ],
            (err, url) => resolve({ err, url })
          );
        } else {
          //Android
          if (!fileExtension) {
            fileExtension = fileName.split(".").reverse()[0];
          }
          OpenFile.openDoc(
            [
              {
                url: SavePath + path,
                fileName: fileName,
                cache: true,
                fileType: fileExtension.replace(".", "")
              }
            ],
            (err, url) => resolve({ err, url })
          );
        }
      } catch (e) {
        reject(e);
      }
    });
  }
  base64File(content, fileName, fileExtension) {
    return new Promise((resolve, reject) => {
      try {
        if (IsIOS) {
          //IOS
          OpenFile.openDoc(
            [
              {
                base64: content,
                fileNameOptional: fileName,
                fileType: fileExtension
              }
            ],
            (err, url) => resolve({ err, url })
          );
        } else {
          //Android
          OpenFile.openDoc(
            [
              {
                cache: true,
                base64: content,
                fileName: fileName,
                fileType: fileExtension.replace(".", "")
              }
            ],
            (err, url) => resolve({ err, url })
          );
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

const instance = new DocumentViewerService();
export default instance;
