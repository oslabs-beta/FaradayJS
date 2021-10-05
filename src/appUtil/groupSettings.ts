import defaultConfig from './defaultConfig'
import settingsInfo from './securitySettingsInfo';

const groupSettings = (version: number) => {
    let userVersionNumber: number = parseInt(version.toString().split(".")[0]);
    const testsObj: any = {};
    let versionObj: any = {};
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
    versionDefaults = Object.values(defaultConfig)[versionObj[userVersionNumber]];

    for(const [setting, values] of Object.entries(versionDefaults)){
        if(settingsInfo[setting]){
            versionDefaults[setting].failValue = settingsInfo[setting].failValue;
            versionDefaults[setting].description = settingsInfo[setting].description;
        }
    }
    // add a test for the version, if it is older than version 13
    if(userVersionNumber < 13){
        console.log('Version needs to be updated');
        versionDefaults["needToUpdateVersion"] =  {
            default: true,
            failValue: true,
            description: "It is recommended that you update to the latest version of Electron as Electron is continuiously implementing updates and changes that make your application more secure."
        };
    }

    return versionDefaults;
}

export default groupSettings