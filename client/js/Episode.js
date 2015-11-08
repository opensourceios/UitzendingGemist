var Episode = function(data, series_data){
  this.id = data.mid
  this.name = data.name.replace('&', '&amp;')
  this.description = data.description
  this.image = data.stills ? data.stills[0].url : data.image
  this.broadcasters = data.broadcasters.join(', ')
  this.genres = data.genres.join(', ')
  this.duration = Math.round(data.duration / 60)
  if(series_data){
    this.series = new Series(series_data)
  }
}

Episode.popular = function(callback) {
  UitzendingGemist.Episode.popular(function(episodes){
    callback(
      episodes.map(function(episode){
        return new Episode(episode, episode.series)
      })
    )
  })
}
Episode.find = function(episode_id, series_id, callback) {
  UitzendingGemist.Series.find(series_id, function(series){
    episode = series.episodes.filter(function(episode){
      return episode.mid == episode_id
    })[0]

    callback(new Episode(episode, series))
  })
}
