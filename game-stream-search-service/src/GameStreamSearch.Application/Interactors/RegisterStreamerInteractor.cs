
using System.Threading.Tasks;
using GameStreamSearch.Application.Dto;
using GameStreamSearch.Application.Enums;
using GameStreamSearch.Application.Exceptions;

namespace GameStreamSearch.Application.Interactors
{
    public class RegisterStreamerInteractor : IInteractor<StreamerDto, IRegisterStreamerPresenter>
    {
        private readonly IStreamerRepository streamerRepository;
        private readonly IStreamService streamService;

        public RegisterStreamerInteractor(IStreamerRepository streamerRepository, IStreamService streamService)
        {
            this.streamerRepository = streamerRepository;
            this.streamService = streamService;
        }

        private async Task<bool> StreamerHasChannel(string streamerName, StreamPlatformType streamPlatform)
        {
            StreamerChannelDto streamerChannel;

            try
            {
                streamerChannel = await streamService.GetStreamerChannel(streamerName, streamPlatform);

                return streamerChannel != null;
            }
            catch (StreamProviderUnavailableException)
            {
                // Could not determine whether the streamer has a channel but lets give them the benfit of the doubt
                return true;
            }

        }

        public async Task Invoke(StreamerDto streamer, IRegisterStreamerPresenter presenter)
        {
            var streamerHasChannel = await StreamerHasChannel(streamer.Name, streamer.StreamPlatform);

            if (!streamerHasChannel)
            {
                presenter.PresentStreamerDoesNotHaveAChannel(streamer.Name, streamer.StreamPlatform);

                return;
            }

            var existingStreamer = await streamerRepository.GetStreamerByNameAndPlatform(streamer.Name, streamer.StreamPlatform);

            if (existingStreamer != null)
            {
                presenter.PresentStreamerRegistered(existingStreamer.Id);

                return;
            }

            await streamerRepository.SaveStreamer(streamer);

            presenter.PresentStreamerRegistered(streamer.Id);
        }
    }
}
