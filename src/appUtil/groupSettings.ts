import defaultConfig from './defaultConfig'
import settingsInfo from './securitySettingsInfo';
// console.log('typeof(settingsInfo}: ', typeof(settingsInfo));

const groupSettings = (version: number) => {
    let userVersionNumber: number = parseInt(version.toString().split(".")[0]);

    const testsObj: any = {};
    const versionObj: any = {};
    Object.keys(defaultConfig).forEach((str, index) => {
        versionObj[parseInt(str.split(".")[0])] = index;
    });

    let versionDefaults: any;

    if(userVersionNumber >= 0 && userVersionNumber < 5){
        userVersionNumber = 0;
    }else if(userVersionNumber>= 5 && userVersionNumber < 10){
        userVersionNumber = 5;
    }else if(userVersionNumber >= 10 && userVersionNumber < 12){
        userVersionNumber = 10;
    }else if(userVersionNumber >= 13 && userVersionNumber < 15){
        userVersionNumber = 13;
    }else if(userVersionNumber >= 15){
        userVersionNumber = 15;
    }else {
        console.log('Using default version 13.0.0');
        userVersionNumber = 13;
    }
    // console.log('Found version: ', versionObj[userVersionNumber]);
    // console.log('Group of settings: ', Object.values(defaultConfig)[versionObj[userVersionNumber]]);
    versionDefaults = Object.values(defaultConfig)[versionObj[userVersionNumber]];

    // console.log("versionDefaults: ", versionDefaults);
    for(const [setting, values] of Object.entries(versionDefaults)){
        if(settingsInfo[setting]){
            // console.log('setting: ', setting);
            versionDefaults[setting].failValue = settingsInfo[setting].failValue;
            versionDefaults[setting].description = settingsInfo[setting].description;
        }
    }
    // console.log('versionDefaults: ', versionDefaults);
    return versionDefaults;
}

export default groupSettings