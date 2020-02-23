import ImagePicker from "react-native-image-crop-picker";

class DeviceService {
  async documentPicker(options = {}) {
    return Promise.resolve(options);
  }
  async imagePicker(options = { width: 300, height: 400 }) {
    options.mediaType = "image";
    return ImagePicker.openPicker(options);
  }
  async videoPicker(options = { width: 300, height: 400 }) {
    options.mediaType = "video";
    options.cropping = false; // DO NOT REMOVE!!!
    return ImagePicker.openPicker(options);
  }
  async imageCamera(options = { width: 300, height: 400 }) {
    options.mediaType = "image";
    return ImagePicker.openCamera(options);
  }
  async videoCamera(options = { width: 300, height: 400 }) {
    options.mediaType = "video";
    options.cropping = false; // DO NOT REMOVE!!!
    return ImagePicker.openCamera(options);
  }
}
const instance = new DeviceService();
export default instance;
