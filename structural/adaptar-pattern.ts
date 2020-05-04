/**

MediaPlayer interface {
  play()
}
AudioPlayer extends MediaPlayer (play() mp3 by default)

AdvancedMediaPlayer interface {
  playVLC()
  playMp4()
}
MediaAdapter extends MediaPlayer uses AdvancedMediaPlayer to play other formats

*/

interface MediaPlayer {
  play?: (audioType: string, fileName: string) => void
}

interface AdvancedMediaPlayer {
  playVLC?: (fileName: string) => void
  playMp4?: (fileName: string) => void
}

class VLCPlayer implements AdvancedMediaPlayer {
  playVLC(fileName: string) {
    console.log("Playing vlc file", fileName);
  }
}
class Mp4Player implements AdvancedMediaPlayer {
  playMp4(fileName: string) {
    console.log("Playing mp4 file", fileName);
  }
}

class MediaAdapter {
  advancedMediaPlayer: AdvancedMediaPlayer
  constructor(audioType: string) {
    if (audioType === "vlc") {
      this.advancedMediaPlayer = new VLCPlayer();
    } else if (audioType === "mp4") {
      this.advancedMediaPlayer = new Mp4Player();
    }
  }

  play(audioType: string, fileName: string) {
    if (audioType === "vlc") {
      this.advancedMediaPlayer.playVLC(fileName);
    } else if (audioType === "mp4") {
      this.advancedMediaPlayer.playMp4(fileName);
    }
  }
}

class AudioPlayer implements MediaPlayer {
  play(audioType: string, fileName: string) {
    if (audioType === "mp3") {
      console.log("Playing mp3 file", fileName);
    } else if (audioType === "vlc" || audioType === "mp4") {
      let player = new MediaAdapter(audioType);
      player.play(audioType, fileName);
    } else {
      console.log("Media not supported - ", audioType);
    }
  }
}

let audioPlayer = new AudioPlayer();
audioPlayer.play("vlc", "music1");
audioPlayer.play("mp4", "music2");
audioPlayer.play("mp3", "music3");
audioPlayer.play("wav", "music3");


class Python {
  print(msg: string) {
    return console.log(msg)
  }
}
class Javascript {
  console(msg: string) {
    return console.log(msg)
  }
}

class LoggerAdapter {
  adapter: any
  constructor(type: string) {
    if (type === "py") {
      this.adapter = new Python();
    } else if (type === "js") {
      this.adapter = new Javascript();
    }
  }

  log(type: string, msg: string) {
    if (type === "py") {
      this.adapter.print(msg)
    } else if (type === "js") {
      this.adapter.console(msg)
    }
  }
}

class Logger {
  adapter: any;
  log(type: string, msg: string) {
    this.adapter = new LoggerAdapter(type)
    this.adapter.log(type, msg)
  }
}

const logger = new Logger();

logger.log('js', 'Hello world js')
logger.log('py', 'Hello world py')