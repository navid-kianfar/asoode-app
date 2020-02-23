const icons = {
  jpg: require("../assets/images/files/icons8-jpg-80.png"),
  png: require("../assets/images/files/icons8-png-80.png"),
  gif: require("../assets/images/files/icons8-gif-80.png"),
  archive: require("../assets/images/files/icons8-archive-80.png"),
  rar: require("../assets/images/files/icons8-rar-80.png"),
  "7z": require("../assets/images/files/icons8-7zip-80.png"),
  tar: require("../assets/images/files/icons8-tar-80.png"),
  xls: require("../assets/images/files/icons8-xls-80.png"),
  csv: require("../assets/images/files/icons8-csv-80.png"),
  ppt: require("../assets/images/files/icons8-ppt-80.png"),
  pdf: require("../assets/images/files/icons8-pdf-80.png"),
  word: require("../assets/images/files/icons8-word-80.png"),
  "image-file": require("../assets/images/files/icons8-image-file-80.png"),
  "audio-file": require("../assets/images/files/icons8-audio-file-80.png"),
  "video-file": require("../assets/images/files/icons8-video-file-80.png"),
  document: require("../assets/images/files/icons8-document-80.png")
};

class FileService {
  imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];

  extractName(url) {
    return (url || "").split("/").reverse()[0];
  }

  isImage(file) {
    const name = file instanceof File ? file.name : file;
    const ext = this.extension(name);
    return this.imageExtensions.indexOf(ext) !== -1;
  }

  extension(file) {
    const str = (file instanceof File ? file.name : file) || "";
    const parts = str.split(".");
    return parts[parts.length - 1].toLowerCase();
  }

  icon(extension) {
    switch (extension.toLowerCase()) {
      case "jpg":
      case "jpeg":
        return "jpg";
      case "gif":
        return "gif";
      case "bmp":
      case "svg":
        return "image-file";
      case "zip":
      case "gz":
        return "archive";
      case "rar":
        return "rar";
      case "7z":
        return "7z";
      case "tar":
        return "tar";
      case "mp3":
        return "audio-file";
      case "mp4":
      case "mkv":
      case "flv":
      case "web":
      case "ogg":
        return "video-file";
      case "pdf":
        return "pdf";
      case "xls":
      case "xlsx":
        return "xls";
      case "ppt":
      case "pptx":
        return "ppt";
      case "csv":
        return "csv";
      case "doc":
      case "docx":
      case "rtf":
      case "txt":
        return "word";
      default:
        return "document";
    }
  }

  fileThumbnail(file) {
    const extension = this.extension(file);
    const icon = this.icon(extension);
    return icons[icon];
  }
}

const instance = new FileService();
export default instance;
