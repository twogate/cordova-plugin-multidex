/**
 * This scripts sets the "android:name" on the "application" element in AndroidManifest.xml
 * to "android.support.multidex.MultiDexApplication", as required to support Multidexing.
 */
module.exports = function(ctx) {
    var fs = ctx.requireCordovaModule('fs'),
        path = ctx.requireCordovaModule('path'),
        xml = ctx.requireCordovaModule('cordova-common').xmlHelpers;

    var manifestPath = path.join(ctx.opts.projectRoot, 'platforms/android/app/src/main/AndroidManifest.xml');
    var doc = xml.parseElementtreeSync(manifestPath);
    if (doc.getroot().tag !== 'manifest') {
        throw new Error(manifestPath + ' has incorrect root node name (expected "manifest")');
    }

    // Setup application/@android:name for Multidexing (cf. http://developer.android.com/tools/building/multidex.html)
    doc.getroot().find('./application').attrib['android:name'] = 'android.support.multidex.MultiDexApplication';

    //write the manifest file
    fs.writeFileSync(manifestPath, doc.write({indent: 4}), 'utf-8');

};
