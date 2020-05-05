// bridge pattern

/**
 * 
 * abstract View 
 * interface resource
 * 
 * concrete ArtistResource
 * concrete SongResource
 * concrete DetailedView
 * concrete MinimalView
 * 
 */


interface IResource {
  title: () => string;
  body: () => string;
  link: () => string;
  image: () => string;
}

abstract class View {
  resource: IResource;
  constructor(resource: IResource) {
    this.resource = resource;
  }

  render(): string {
    return ''
  };
}

class DetailedView extends View {
  render() {
    return `
    <div>
      <h2>${this.resource.title()}</h2>
      <img src="${this.resource.image()}" />  
      <div>${this.resource.body()}</div>
      <a href="${this.resource.link()}">readmore</a>
    </div>
    `
  }
}
class MinimalView extends View {
  render() {
    return `
    <div>
      <h2>${this.resource.title()}</h2>
      <a href="${this.resource.link()}">readmore</a>
    </div>
    `
  }
}


class ArtistResource implements IResource {
  artist: any
  constructor(artist: any) {
    this.artist = artist;
  }

  title() {
    return this.artist.name
  }
  body() {
    return this.artist.bio
  }
  image() {
    return this.artist.image
  }
  link() {
    return this.artist.slug
  }
}

class SongResource implements IResource {
  song: any
  constructor(song: any) {
    this.song = song;
  }

  title() {
    return this.song.name
  }
  body() {
    return this.song.lyrics
  }
  image() {
    return this.song.coverImage
  }
  link() {
    return this.song.spotifyLink
  }
}



const artist = new ArtistResource({
  name: 'Anurag',
  bio: '404 not found',
  image: '/img/mypic.png',
  slug: '/u/anuraghazra'
})
const song = new SongResource({
  name: 'Cant belive i can fly',
  lyrics: 'la la la la la',
  coverImage: '/img/cover.png',
  spotifyLink: '/s/song/132894'
})

const artist_detail_view = new DetailedView(artist);
const artist_minimal_view = new MinimalView(artist);

const song_detail_view = new DetailedView(song);
const song_minimal_view = new MinimalView(song);

console.log(artist_detail_view.render())
console.log(song_detail_view.render())
console.log(artist_minimal_view.render())
console.log(song_minimal_view.render())

