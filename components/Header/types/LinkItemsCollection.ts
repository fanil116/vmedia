import { Strings } from "@/locales/types/enums/strings";
import { LinkItemCode } from "./enums/link-item-code";
import { LinkItem } from "./LinkItem";
import { publisher } from "@ca.vmedia.tv/domains";
export enum ShowAllContentType {
    Channels = "channels",
    NewSeries = "NewSeries",
    NewMovies = "NewMovies",
    RecommendedSeries = "RecommendedSeries",
    RecommendedMovies = "RecommendedMovies",
    GenreSubItems = "GenreSubItems",
    MostPopularVod = "MostPopularVod",
    ContinueWatching = "ContinueWatching",
    WatchAgain = "WatchAgain",
    Trends = "Trends"
}

export const linkItems = {
    root: new LinkItem('', LinkItemCode.Root, "/"),
    error: new LinkItem('', LinkItemCode.Error, "/error"),
    home: new LinkItem(Strings.MENU_HOME, LinkItemCode.Home, "/home"),
    guide: new LinkItem(Strings.MENU_GUIDE, LinkItemCode.Guide, "/guide"),
    guideHealtHub: new LinkItem(
        Strings.MENU_GUIDE, 
        LinkItemCode.Guide, 
        "/guide",
        "IconHome"
    ),
    onDemand: new LinkItem(
        Strings.MENU_ON_DEMAND,
        LinkItemCode.OnDemand,
        "/vod"
    ),
    myTv: new LinkItem(Strings.MENU_MYTV, LinkItemCode.MyTv, "/mytv"),
    search: new LinkItem(
        Strings.MENU_SEARCH,
        LinkItemCode.Search,
        "/search",
        "IconSearch"
    ),
    settings: new LinkItem(
        Strings.MENU_SETTINGS,
        LinkItemCode.Settings,
        "/settings",
        "IconSettings"
    ),
    showAllChannels: new LinkItem(
        Strings.VOD_CHANNELS,
        LinkItemCode.Channels,
        `/vod/show-all-channels`
    ),
    showAllPrograms: new LinkItem(
        Strings.MY_TV_ALL_PROGRAMS,
        LinkItemCode.allPrograms,
        `/mytv/all-programs`
    ),
    showAllFavChannels: new LinkItem(
        Strings.MY_TV_FAVORITE_CHANNELS,
        LinkItemCode.favChannels,
        `/mytv/show-all-fav-channels`
    ),
    showAllOnDemand: new LinkItem(
        Strings.MY_TV_ALL_ON_DEMANDS,
        LinkItemCode.allOnDemand,
        `/mytv/all-on-demand`
    ),
    showAllNewShows: new LinkItem(
        Strings.VOD_NEW_SHOWS,
        LinkItemCode.NewShows,
        `/vod/show-all?type=${ShowAllContentType.NewSeries}`
    ),
    showAllNewMovies: new LinkItem(
        Strings.VOD_NEW_MOVIES,
        LinkItemCode.NewMovies,
        `/vod/show-all?type=${ShowAllContentType.NewMovies}`
    ),
    showAllRecommendedShows: new LinkItem(
        Strings.VOD_RECOMMENDED_SHOWS,
        LinkItemCode.RecommendedShows,
        `/vod/show-all?type=${ShowAllContentType.RecommendedSeries}`
    ),
    showAllRecommendedMovies: new LinkItem(
        Strings.VOD_RECOMMENDED_MOVIES,
        LinkItemCode.RecommendedMovies,
        `/vod/show-all?type=${ShowAllContentType.RecommendedMovies}`
    ),
    subgenres: new LinkItem(
        Strings.VOD_SUBGENRES,
        LinkItemCode.SubGenres,
        "/vod/genres"
    ),
    showAllForGenre: new LinkItem(
        Strings.VOD_SUBGENRES,
        LinkItemCode.SubGenresContent,
        `/vod/show-all-subitems`
    ),
    detailGenre: new LinkItem(
        Strings.VOD_DETAIL_GENRES,
        LinkItemCode.DetailGenre,
        `/vod/detail-genre`
    ),
    account: new LinkItem(
        Strings.SETTINGS_NAVIGATION_ACCOUNT,
        LinkItemCode.Account,
        "/settings/account"
    ),
    subscription: new LinkItem(
        Strings.SETTINGS_NAVIGATION_SUBSCRIPTION,
        LinkItemCode.Subscription,
        "/settings/subscription"
    ),
    favorites: new LinkItem(
        Strings.SETTINGS_NAVIGATION_FAVORITES,
        LinkItemCode.Favorites,
        "/settings/favorites"
    ),
    settingsPlayer: new LinkItem(
        Strings.SETTINGS_NAVIGATION_PLAYER,
        LinkItemCode.SettingsPlayer,
        "/settings/player"
    ),
    parentControl: new LinkItem(
        Strings.SETTINGS_NAVIGATION_PARENT,
        LinkItemCode.ParentalControl,
        "/settings/parent-control"
    ),
    privacy: new LinkItem(
        Strings.SETTINGS_NAVIGATION_PRIVACY,
        LinkItemCode.Privacy,
        "/settings/privacy-policy"
    ),
    about: new LinkItem(
        Strings[`SETTINGS_NAVIGATION_ABOUT_${publisher}` as keyof typeof Strings],
        LinkItemCode.About,
        "/settings/about-us"
    ),
    login: new LinkItem(Strings.LOGIN_SIGNIN, LinkItemCode.Login, "/login"),
    logInSignIn: new LinkItem(Strings.LOGIN_SIGNIN, LinkItemCode.LogInSignIn, "/login/sign-in"),
    logInForgot: new LinkItem(Strings.LOGIN_SIGNIN, LinkItemCode.LogInForgot, "/login/forgot"),
    logInOkta: new LinkItem("", LinkItemCode.LogInOkta, "/login/okta"),
    logInSignWays: new LinkItem("", LinkItemCode.LogInSignWays, "/login/sign-ways"),
    detailsVodMovies: new LinkItem(
        Strings.MENU_HOME,
        LinkItemCode.DetailsMovies,
        "/detailsVodMovies"
    ),
    detailsVodSeries: new LinkItem(
        Strings.MENU_HOME,
        LinkItemCode.DetailsSeries,
        "/detailsVodSeries"
    ),
    detailsPrograms: new LinkItem(
        Strings.MENU_HOME,
        LinkItemCode.DetailsPrograms,
        "/detailsPrograms"
    ),
    searchLiveTV: new LinkItem(
        Strings.SEARCH_LIVE_TV,
        LinkItemCode.SearchLiveTV,
        "/search/all-live"
    ),
    searchChannels: new LinkItem(
        Strings.SEARCH_CHANNELS,
        LinkItemCode.SearchChannels,
        "/search/all-channels"
    ),
    searchMovies: new LinkItem(
        Strings.SEARCH_MOVIES_ON_DEMAND,
        LinkItemCode.SearchMovies,
        "/search/all-movies"
    ),
    searchShows: new LinkItem(
        Strings.SEARCH_TV_SHOWS_ON_DEMAND,
        LinkItemCode.SearchShows,
        "/search/all-shows"
    ),
    searchCredits: new LinkItem(
        Strings.SEARCH_CAST_AND_CREW,
        LinkItemCode.SearchCastAndCrew,
        "/search/all-credits"
    ),
    player: new LinkItem(
        "",
        LinkItemCode.Player,
        "/player"
    ),
    trailer: new LinkItem(
        "",
        LinkItemCode.Trailer,
        "/trailer"
    ),
    showAllMostPopular: new LinkItem(
        Strings.VOD_MOST_POPULAR,
        LinkItemCode.ShowAllMostPopular,
        `/vod/show-all?type=${ShowAllContentType.MostPopularVod}`
    ),
    showAllContinueWatchingVod: new LinkItem(
        Strings.HOME_FIZZ_CONTINUE_WATCHING,
        LinkItemCode.ShowAllContinueWatching,
        `/vod/show-all?type=${ShowAllContentType.ContinueWatching}`
    ),
    showAllWatchAgain: new LinkItem(
        Strings.HOME_WATCH_AGAIN,
        LinkItemCode.ShowAllWatchAgain,
        `/vod/show-all?type=${ShowAllContentType.WatchAgain}`
    ),
    showAllTrends: new LinkItem(
        Strings.HOME_TRENDS,
        LinkItemCode.ShowAllTrends,
        `/home/show-all?type=${ShowAllContentType.Trends}`
    ),
};
