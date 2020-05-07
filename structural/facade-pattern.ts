const someAPIService = {
  '/api/musics': { data: ['I belive i can fly.mp3', 'Unconditional.mp3'] },
  '/api/videos': { data: ['Awesome javascript tutorials.mp4', 'Funny Video.mp4'] },
  '/api/articles': { data: ['GraphQL step by step', 'Typescript secrets'] }
}

// facade pattern
const MUSIC = 'musics';
const VIDEO = 'videos';
const ARTICLE = 'articles';
class APIFacade {
  musicApi: MusicAPI;
  videoApi: VideoAPI;
  articleApi: ArticleAPI;
  constructor() {
    this.musicApi = new MusicAPI('/api/musics')
    this.videoApi = new VideoAPI('/api/videos')
    this.articleApi = new ArticleAPI('/api/articles')
  }

  getAll(type: string): any {
    switch (type) {
      case MUSIC:
        return this.musicApi.get()
      case VIDEO:
        return this.videoApi.get()
      case ARTICLE:
        return this.articleApi.get()
      default:
        return null;
    }
  }

  find(type: string, keyword: string): any {
    switch (type) {
      case MUSIC:
        return this.musicApi.find(keyword)
      case VIDEO:
        return this.videoApi.find(keyword)
      case ARTICLE:
        return this.articleApi.find(keyword)
      default:
        return null;
    }
  }
}


class APIResource {
  url: string;
  constructor(url: string) {
    this.url = url
  }

  async get() {
    return someAPIService[this.url]
  }

  async find(name: string) {
    return someAPIService[this.url].data.find((m: string) => {
      return m.search(name)
    })
  }
}


class MusicAPI extends APIResource {
  url: string;
  constructor(url: string) {
    super(url)
  }
}

class VideoAPI extends APIResource {
  url: string;
  constructor(url: string) {
    super(url)
  }
}

class ArticleAPI extends APIResource {
  url: string;
  constructor(url: string) {
    super(url)
  }
}


let api = new APIFacade();
api
  .getAll(MUSIC)
  .then(data => {
    console.log('-----MUSICS')
    console.log(data)
  });
api
  .find(MUSIC, 'i can fly')
  .then(console.log);

api
  .getAll(VIDEO)
  .then((data) => {
    console.log('-----VIDEOS')
    console.log(data)
  });
api
  .find(VIDEO, 'Awesome javascript')
  .then(console.log);

api
  .getAll(ARTICLE)
  .then((data) => {
    console.log('-----ARTICLES')
    console.log(data)
  });
api
  .find(ARTICLE, 'graphql')
  .then(console.log);