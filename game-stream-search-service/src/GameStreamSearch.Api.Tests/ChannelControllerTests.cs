using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GameStreamSearch.Api.Contracts;
using GameStreamSearch.Api.Controllers;
using GameStreamSearch.Application;
using GameStreamSearch.Application.Dto;
using GameStreamSearch.Application.Entities;
using GameStreamSearch.Application.Enums;
using GameStreamSearch.Application.Interactors;
using GameStreamSearch.Application.Providers;
using GameStreamSearch.Application.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;

namespace GameStreamSearch.Api.Tests
{
    public class ChannelControllerTests
    {
        private ChannelsController channelController;
        private Mock<ITimeProvider> timeProviderStub;
        private Mock<IStreamProvider> youTubeStreamProviderStub;
        private Mock<IStreamProvider> twitchtreamProviderStub;
        private Mock<IChannelRepository> channelRepositoryStub;

        private readonly DateTime registrationDate = DateTime.Now;
        private List<Channel> dataStore;

        private readonly StreamerChannelDto youtubeChannelDto = new StreamerChannelDto
        {
            ChannelName = "Youtube channel",
            Platform = StreamPlatformType.YouTube,
            AvatarUrl = "avatar url",
            ChannelUrl = "channel url",
        };

        private readonly StreamerChannelDto twitchChannelDto = new StreamerChannelDto
        {
            ChannelName = "Twitch channel",
            Platform = StreamPlatformType.Twitch,
            AvatarUrl = "avatar url",
            ChannelUrl = "channel url",
        };

        [SetUp]
        public void Setup()
        {
            dataStore = new List<Channel>();
            channelRepositoryStub = new Mock<IChannelRepository>();

            youTubeStreamProviderStub = new Mock<IStreamProvider>();
            youTubeStreamProviderStub.SetupGet(s => s.Platform).Returns(StreamPlatformType.YouTube);
            youTubeStreamProviderStub.Setup(s => s.GetStreamerChannel(youtubeChannelDto.ChannelName)).ReturnsAsync(youtubeChannelDto);

            twitchtreamProviderStub = new Mock<IStreamProvider>();
            twitchtreamProviderStub.SetupGet(s => s.Platform).Returns(StreamPlatformType.Twitch);
            twitchtreamProviderStub.Setup(s => s.GetStreamerChannel(twitchChannelDto.ChannelName)).ReturnsAsync(twitchChannelDto);

            StreamService streamService = new StreamService()
                .RegisterStreamProvider(youTubeStreamProviderStub.Object)
                .RegisterStreamProvider(twitchtreamProviderStub.Object);

            UpsertChannelInteractor addChannelInteractor = new UpsertChannelInteractor(channelRepositoryStub.Object, streamService);
            GetChannelInteractor getChannelInteractor = new GetChannelInteractor(channelRepositoryStub.Object);

            timeProviderStub = new Mock<ITimeProvider>();

            timeProviderStub.Setup(s => s.GetNow()).Returns(registrationDate);

            channelController = new ChannelsController(
                addChannelInteractor,
                getChannelInteractor,
                channelRepositoryStub.Object,
                timeProviderStub.Object);

            Mock<IUrlHelper> urlHelper = new Mock<IUrlHelper>();

            urlHelper.Setup(s => s.Link(nameof(channelController.GetChannel), It.IsAny<object>())).Returns<string, GetChannelParams>((routeName, routeParams) =>
            {
                return routeParams.Channel;
            });

            channelController.Url = urlHelper.Object;
        }

        [Test]
        public async Task Should_Add_A_New_Channel()
        {
            channelRepositoryStub.Setup(s => s.Get(StreamPlatformType.YouTube, "Youtube channel")).ReturnsAsync(() => null);

            var createResponse = await channelController.AddChannel(StreamPlatformType.YouTube, "Youtube channel");
            var createResult = createResponse as CreatedResult;
            var value = createResult.Value as ChannelDto;


            Assert.IsInstanceOf<CreatedResult>(createResponse);
            Assert.AreEqual(createResult.Location, value.ChannelName);

            Assert.AreEqual(value.ChannelName, youtubeChannelDto.ChannelName);
            Assert.AreEqual(value.StreamPlatform, youtubeChannelDto.Platform);
            Assert.AreEqual(value.AvatarUrl, youtubeChannelDto.AvatarUrl);
            Assert.AreEqual(value.ChannelUrl, youtubeChannelDto.ChannelUrl);
        }

        [Test]
        public async Task Should_Allow_Adding_The_Same_Channel_For_Multiple_Platforms()
        {
            channelRepositoryStub.Setup(s => s.Get(StreamPlatformType.Twitch, "Twitch channel")).ReturnsAsync(() => null);
            channelRepositoryStub.Setup(s => s.Get(StreamPlatformType.YouTube, "Youtube channel")).ReturnsAsync(() => null);
            channelRepositoryStub.Setup(s => s.SelectAllChannels()).ReturnsAsync(() =>
            {
                return new ChannelListDto
                {
                    Items = new List<ChannelDto>
                    {
                        new ChannelDto
                        {
                            ChannelName = "Twitch channel",
                            StreamPlatform = StreamPlatformType.Twitch,
                        },
                        new ChannelDto
                        {
                            ChannelName = "Youtube channel",
                            StreamPlatform = StreamPlatformType.YouTube,
                        }
                    }
                };
            });

            await channelController.AddChannel(StreamPlatformType.Twitch, "Twitch channel");
            await channelController.AddChannel(StreamPlatformType.YouTube, "Youtube channel");

            var response = await channelController.GetChannels();

            var okAction = response as OkObjectResult;
            var value = okAction.Value as ChannelListDto;

            Assert.AreEqual(value.Items.First().ChannelName, "Twitch channel");
            Assert.AreEqual(value.Items.First().StreamPlatform, StreamPlatformType.Twitch);
            Assert.AreEqual(value.Items.Last().ChannelName, "Youtube channel");
            Assert.AreEqual(value.Items.Last().StreamPlatform, StreamPlatformType.YouTube);
        }

        [Test]
        public async Task Should_Update_The_Channel_And_Respond_With_The_Channel_If_The_Channel_Already_Exists_For_The_Platform()
        {
            channelRepositoryStub.Setup(s => s.Add(It.IsAny<Channel>())).Callback<Channel>(channel => dataStore.Add(channel));
            channelRepositoryStub.Setup(s => s.Get(StreamPlatformType.YouTube, "Youtube channel")).ReturnsAsync(() => {
                return dataStore.Count > 0 ? dataStore[0] : null;
           });

            channelRepositoryStub.Setup(s => s.Update(It.IsAny<Channel>())).Callback<Channel>(channel => dataStore[0] = channel);
            channelRepositoryStub.Setup(s => s.SelectAllChannels()).ReturnsAsync(() => {
                return new ChannelListDto
                {
                    Items = new List<ChannelDto>
                    {
                        new ChannelDto
                        {
                            ChannelName = dataStore[0].ChannelName,
                            StreamPlatform = dataStore[0].StreamPlatform,
                            AvatarUrl = dataStore[0].AvatarUrl,
                            ChannelUrl = dataStore[0].ChannelUrl,
                        }
                    }
                };
            });


            StreamerChannelDto updatedChannelDto = new StreamerChannelDto
            {
                ChannelName = "Youtube channel",
                Platform = StreamPlatformType.YouTube,
                AvatarUrl = "new avatar url",
                ChannelUrl = "new channel url",
            };

            youTubeStreamProviderStub.Setup(s => s.GetStreamerChannel(updatedChannelDto.ChannelName)).ReturnsAsync(updatedChannelDto);

            await channelController.AddChannel(StreamPlatformType.YouTube, "Youtube channel");

            var updateResponse = await channelController.AddChannel(StreamPlatformType.YouTube, "Youtube channel");

            var result = updateResponse as OkObjectResult;
            var value = result.Value as ChannelDto;


            var getResponse = await channelController.GetChannels();
            var getResult = getResponse as OkObjectResult;
            var getValue = getResult.Value as ChannelListDto;

            Assert.AreEqual(getValue.Items.Count(), 1);
            Assert.IsInstanceOf<OkObjectResult>(updateResponse);
            Assert.AreEqual(value.AvatarUrl, updatedChannelDto.AvatarUrl);
            Assert.AreEqual(value.ChannelUrl, updatedChannelDto.ChannelUrl);
        }

        [Test]
        public async Task Should_Respond_With_Bad_Request_With_Error_When_Channel_Does_Not_Exist_On_The_Platform()
        {
            var response = await channelController.AddChannel(StreamPlatformType.Twitch, "Fake Streamer");
            var result = response as BadRequestObjectResult;
            var value = result.Value as ErrorResponseContract;

            Assert.IsInstanceOf<BadRequestObjectResult>(response);
            Assert.AreEqual(value.Errors.First().ErrorCode, ErrorCodeType.ChannelNotFoundOnPlatform);
        }
    }
}
