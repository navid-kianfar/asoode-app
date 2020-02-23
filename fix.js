const replace = require('replace-in-file');
const fs = require('fs');

try {
    // fix for android
    replace.sync({
        files: 'node_modules/react-native-svg/android/build.gradle',
        from: /3.4.1/g,
        to: '3.4.0',
    });
    replace.sync({
        files: 'node_modules/react-native-contacts/android/build.gradle',
        from: /3.1.4/g,
        to: '3.4.0',
    });
    fs.copyFileSync(
        'node_modules/react-native-contacts/android/build.gradle',
        'node_modules/react-native-toast-native/android/build.gradle'
    );
    fs.copyFileSync(
        'node_modules/react-native-contacts/android/build.gradle',
        'node_modules/react-native-restart/android/build.gradle'
    );
    console.log('Android Fixed');

    // fix for ios
    fs.copyFileSync(
        'patch/RCTContacts.m',
        'node_modules/react-native-contacts/ios/RCTContacts/RCTContacts.m'
    );
    replace.sync({
        files: 'node_modules/react-native-contacts/ios/RCTContacts.xcodeproj/project.pbxproj',
        from: /IPHONEOS_DEPLOYMENT_TARGET = 7/g,
        to: 'IPHONEOS_DEPLOYMENT_TARGET = 8',
    });
    replace.sync({
        files: 'node_modules/react-native-fs/RNFS.xcodeproj/project.pbxproj',
        from: /IPHONEOS_DEPLOYMENT_TARGET = 7/g,
        to: 'IPHONEOS_DEPLOYMENT_TARGET = 8',
    });
    replace.sync({
        files: 'node_modules/react-native-doc-viewer/ios/RNReactNativeDocViewer.xcodeproj/project.pbxproj',
        from: /IPHONEOS_DEPLOYMENT_TARGET = 7/g,
        to: 'IPHONEOS_DEPLOYMENT_TARGET = 8',
    });
    replace.sync({
        files: 'node_modules/react-native-toast-native/ios/RNToastNative.xcodeproj/project.pbxproj',
        from: /IPHONEOS_DEPLOYMENT_TARGET = 7/g,
        to: 'IPHONEOS_DEPLOYMENT_TARGET = 8',
    });
    console.log('IOS Fixed');
}
catch (error) {
    console.error('Error occurred:', error);
}
