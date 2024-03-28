const { withAppDelegate, withMainApplication } = require("expo/config-plugins");

module.exports = function withLivekit(config) {
  config = withLivekitAndroid(config);
  config = withLivekitIOS(config);
  return config;
};

function withLivekitAndroid(expoConfig) {
  return withMainApplication(expoConfig, (config) => {
    let contents = config.modResults.contents;
    contents = contents.replace(
      "package com.playbackjoe.livekitexpo50",
      [
        "package com.playbackjoe.livekitexpo50",
        "",
        "import com.livekit.reactnative.LiveKitReactNative",
        "import com.livekit.reactnative.audio.AudioType",
      ].join("\n")
    );
    contents = contents.replace(
      "super.onCreate()",
      [
        "LiveKitReactNative.setup(this, AudioType.CommunicationAudioType())",
        "super.onCreate()",
      ].join("\n")
    );
    config.modResults.contents = contents;
    return config;
  });
}

function withLivekitIOS(expoConfig) {
  return withAppDelegate(expoConfig, (config) => {
    let contents = config.modResults.contents;
    contents = contents.replace(
      '#import "AppDelegate.h"',
      ['#import "AppDelegate.h"', '#import "LivekitReactNative.h"'].join("\n")
    );
    contents = contents.replace(
      'self.moduleName = @"main";',
      ['self.moduleName = @"main";', "[LivekitReactNative setup];"].join("\n")
    );
    config.modResults.contents = contents;
    return config;
  });
}
