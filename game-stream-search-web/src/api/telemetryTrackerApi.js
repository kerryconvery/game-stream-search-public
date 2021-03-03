const trackStreamOpened = ({ streamTitle, streamerName, platformName, views }) => {
  gtag('event', 'stream_opened', {
    streamTitle,
    streamerName,
    platformName,
    views,
  });
}

const trackStreamSearch = ({ gameName }) => {
  gtag('event', 'stream_search', {
    gameName,
  });
}

const trackFeaturedChannelOpened = ({ channelName, platformName }) => {
  gtag('event', 'featured_channel_opened', {
    channelName,
    platformName,
  });
}

const trackFeatureChannelNotFound = ({ channelName, platformName }) => {
  gtag('event', 'feature_channel_not_found', {
    channelName,
    platformName,
  })
}

export const getTelemetryTrackerApi = () => {
  return {
    trackStreamOpened,
    trackStreamSearch,
    trackFeaturedChannelOpened,
    trackFeatureChannelNotFound,
  }
}