import md5 from "crypto-js";
function arrayBufferToBase64(bytes) {
  if (typeof window === "undefined") {
    return Buffer.from(bytes).toString("base64url");
  }
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return globalThis.btoa(binary).replace(/\+/g, "~").replace(/\//g, "_").replace(/=/g, "");
}
class SubsonicAPI {
  constructor(config) {
    this.authenticated = false;
    this.#config = config;
  }
  #config;
  #fetch;
  #crypto;
  #user;
  async login({ username, password, serverName, version }) {
    this.#crypto = globalThis.crypto;
    this.#fetch = fetch;
    this.#user = { username, password, serverName, version };
    this.authenticated = true;
    try {
      await this.ping();
    } catch (error) {
      this.#user = void 0;
      this.authenticated = false;
      throw error;
    }
  }
  loginSync({ username, password, serverName, version }) {
    this.#crypto = globalThis.crypto;
    this.#fetch = fetch;
    this.#user = { username, password, serverName, version };
    this.authenticated = true;
  }
  #generateSalt() {
    if (!this.#crypto)
      throw new Error("crypto not available");
    return arrayBufferToBase64(
      this.#crypto.getRandomValues(new Uint8Array(16))
    );
  }
  #generateToken(password) {
    const salt = this.#generateSalt();
    return {
      salt,
      token: md5(password + salt)
    };
  }
  async custom(method, params) {
    return this.#request(method, params);
  }
  async customJSON(method, params) {
    return this.#requestJSON(method, params);
  }
  async #requestJSON(method, args) {
    return this.#request(method, args).then(async (res) => res.json()).then(async (res) => res?.["subsonic-response"]);
  }
  async #request(method, params) {
    if (!this.authenticated)
      throw new Error("not authenticated");
    if (!this.#user)
      throw new Error("not authenticated");
    if (!this.#fetch)
      throw new Error("not authenticated");
    let base = this.#config.url;
    if (!base.startsWith("http"))
      base = "https://" + base;
    if (!base.endsWith("/"))
      base += "/";
    if (!base.endsWith("rest/"))
      base += "rest/";
    base += method + ".view";
    const url = new URL(base);
    url.searchParams.set("v", this.#user.version);
    url.searchParams.set("c", this.#user.serverName);
    url.searchParams.set("f", "json");
    url.searchParams.set("u", this.#user.username);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (!value)
          continue;
        if (Array.isArray(value)) {
          for (const v of value) {
            url.searchParams.append(key, v.toString());
          }
        } else {
          url.searchParams.set(key, value.toString());
        }
      }
    }
    {
      url.searchParams.set("u", this.#user.username);
      url.searchParams.set("p", this.#user.password);
    }
    console.log(url.toString());
    return this.#fetch(url.toString());
  }
  async #requestWoFetch(method, params) {
    if (!this.authenticated)
      throw new Error("not authenticated");
    if (!this.#user)
      throw new Error("not authenticated");
    if (!this.#fetch)
      throw new Error("not authenticated");
    let base = this.#config.url;
    if (!base.startsWith("http"))
      base = "https://" + base;
    if (!base.endsWith("/"))
      base += "/";
    if (!base.endsWith("rest/"))
      base += "rest/";
    base += method + ".view";
    const url = new URL(base);
    url.searchParams.set("v", this.#user.version);
    url.searchParams.set("c", this.#user.serverName);
    url.searchParams.set("f", "json");
    url.searchParams.set("u", this.#user.username);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (!value)
          continue;
        if (Array.isArray(value)) {
          for (const v of value) {
            url.searchParams.append(key, v.toString());
          }
        } else {
          url.searchParams.set(key, value.toString());
        }
      }
    }
    {
      url.searchParams.set("u", this.#user.username);
      url.searchParams.set("p", this.#user.password);
    }
    return url.toString();
  }
  #requestWoFetchSync(method, params) {
    if (!this.authenticated)
      throw new Error("not authenticated");
    if (!this.#user)
      throw new Error("not authenticated");
    if (!this.#fetch)
      throw new Error("not authenticated");
    let base = this.#config.url;
    if (!base.startsWith("http"))
      base = "https://" + base;
    if (!base.endsWith("/"))
      base += "/";
    if (!base.endsWith("rest/"))
      base += "rest/";
    base += method + ".view";
    const url = new URL(base);
    url.searchParams.set("v", this.#user.version);
    url.searchParams.set("c", this.#user.serverName);
    url.searchParams.set("f", "json");
    url.searchParams.set("u", this.#user.username);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (!value)
          continue;
        if (Array.isArray(value)) {
          for (const v of value) {
            url.searchParams.append(key, v.toString());
          }
        } else {
          url.searchParams.set(key, value.toString());
        }
      }
    }
    {
      url.searchParams.set("u", this.#user.username);
      url.searchParams.set("p", this.#user.password);
    }
    return url.toString();
  }
  // ----------
  // SYSTEM API
  // ----------
  async ping() {
    if (!this.#config.url) {
      return Promise.reject(new Error("no url"));
    }
    return this.#requestJSON("ping", {});
  }
  async getLicense() {
    return this.#requestJSON("getLicense", {});
  }
  // ------------
  // BROWSING API
  // ------------
  async getMusicFolders() {
    return this.#requestJSON("getMusicFolders", {});
  }
  async getIndexes(args) {
    return this.#requestJSON("getIndexes", args);
  }
  async getMusicDirectory(args) {
    return this.#requestJSON("getMusicDirectory", args);
  }
  async getGenres() {
    return this.#requestJSON("getGenres", {});
  }
  async getArtists(args) {
    return this.#requestJSON("getArtists", args);
  }
  async getArtist(args) {
    return this.#requestJSON("getArtist", args);
  }
  async getAlbum(args) {
    return this.#requestJSON("getAlbum", args);
  }
  async getSong(args) {
    return this.#requestJSON("getSong", args);
  }
  async getVideos(args) {
    return this.#requestJSON("getVideos", args);
  }
  async getVideoInfo(args) {
    return this.#requestJSON("getVideoInfo", args);
  }
  async getArtistInfo(args) {
    return this.#requestJSON("getArtistInfo", args);
  }
  async getArtistInfo2(args) {
    return this.#requestJSON("getArtistInfo2", args);
  }
  async getAlbumInfo(args) {
    return this.#requestJSON("getAlbumInfo", args);
  }
  async getAlbumInfo2(args) {
    return this.#requestJSON("getAlbumInfo2", args);
  }
  async getSimilarSongs(args) {
    return this.#requestJSON("getSimilarSongs", args);
  }
  async getSimilarSongs2(args) {
    return this.#requestJSON("getSimilarSongs2", args);
  }
  async getTopSongs(args) {
    return this.#requestJSON("getTopSongs", args);
  }
  async getAlbumList(args) {
    return this.#requestJSON("getAlbumList", args);
  }
  async getAlbumList2(args) {
    return this.#requestJSON("getAlbumList2", args);
  }
  async getRandomSongs(args) {
    return this.#requestJSON("getRandomSongs", args);
  }
  async getSongsByGenre(args) {
    return this.#requestJSON("getSongsByGenre", args);
  }
  async getNowPlaying() {
    return this.#requestJSON("getNowPlaying", {});
  }
  async getStarred(args) {
    return this.#requestJSON("getStarred", args);
  }
  async getStarred2(args) {
    return this.#requestJSON("getStarred2", args);
  }
  /**
   * @deprecated Deprecated since 1.4.0, use search2 instead.
   */
  async search(args) {
    return this.#requestJSON("search2", args);
  }
  async search2(args) {
    return this.#requestJSON("search2", args);
  }
  async search3(args) {
    return this.#requestJSON("search3", args);
  }
  async getPlaylists(args) {
    return this.#requestJSON("getPlaylists", args);
  }
  async getPlaylist(args) {
    return this.#requestJSON("getPlaylist", args);
  }
  async createPlaylist(args) {
    return this.#requestJSON("createPlaylist", args);
  }
  async updatePlaylist(args) {
    return this.#requestJSON("updatePlaylist", args);
  }
  async deletePlaylist(args) {
    return this.#requestJSON("deletePlaylist", args);
  }
  async stream(args) {
    return this.#request("stream", args);
  }
  async download(args) {
    return this.#request("download", args);
  }
  async downloadWoFetch(args) {
    return this.#requestWoFetch("download", args);
  }
  downloadWoFetchSync(args) {
    return this.#requestWoFetchSync("download", args);
  }
  async hls(args) {
    return this.#request("hls", args);
  }
  async getCaptions(args) {
    return this.#request("getCaptions", args);
  }
  async getCoverArt(args) {
    return this.#request("getCoverArt", args);
  }
  async getCoverArtWoFetch(args) {
    return this.#requestWoFetch("getCoverArt", args);
  }
  getCoverArtWoFetchSync(args) {
    return this.#requestWoFetchSync("getCoverArt", args);
  }
  async getLyrics(args) {
    return this.#request("getLyrics", args);
  }
  async getAvatar(args) {
    return this.#request("getAvatar", args);
  }
  async star(args) {
    return this.#requestJSON("star", args);
  }
  async unstar(args) {
    return this.#requestJSON("star", args);
  }
  async setRating(args) {
    return this.#requestJSON("setRating", args);
  }
  async scrobble(args) {
    return this.#requestJSON("scrobble", args);
  }
  async getShares() {
    return this.#requestJSON("getShares", {});
  }
  async createShare(args) {
    return this.#requestJSON("createShare", args);
  }
  async updateShare(args) {
    return this.#requestJSON("updateShare", args);
  }
  async deleteShare(args) {
    return this.#requestJSON("deleteShare", args);
  }
  async getPodcasts(args) {
    return this.#requestJSON("getPodcasts", args);
  }
  async getNewestPodcasts(args) {
    return this.#requestJSON("getNewestPodcasts", args);
  }
  async refreshPodcasts() {
    return this.#requestJSON("refreshPodcasts", {});
  }
  async createPodcastChannel(args) {
    return this.#requestJSON(
      "createPodcastChannel",
      args
    );
  }
  async deletePodcastChannel(args) {
    return this.#requestJSON(
      "deletePodcastChannel",
      args
    );
  }
  async deletePodcastEpisode(args) {
    return this.#requestJSON(
      "deletePodcastEpisode",
      args
    );
  }
  async downloadPodcastEpisode(args) {
    return this.#request("downloadPodcastEpisode", args);
  }
  async jukeboxControl(args) {
    return this.#requestJSON("jukeboxControl", args);
  }
  async getInternetRadioStations() {
    return this.#requestJSON("getInternetRadioStations", {});
  }
  async createInternetRadioStation(args) {
    return this.#requestJSON(
      "createInternetRadioStation",
      args
    );
  }
  async updateInternetRadioStation(args) {
    return this.#requestJSON(
      "updateInternetRadioStation",
      args
    );
  }
  async deleteInternetRadioStation(args) {
    return this.#requestJSON(
      "deleteInternetRadioStation",
      args
    );
  }
  async getChatMessages(args) {
    return this.#requestJSON("getChatMessages", args);
  }
  async addChatMessage(args) {
    return this.#requestJSON("addChatMessage", args);
  }
  async getUser(args) {
    return this.#requestJSON("getUser", args);
  }
  async getUsers() {
    return this.#requestJSON("getUsers", {});
  }
  async createUser(args) {
    return this.#requestJSON("createUser", args);
  }
  async updateUser(args) {
    return this.#requestJSON("createUser", args);
  }
  async deleteUser(args) {
    return this.#requestJSON("deleteUser", args);
  }
  async changePassword(args) {
    return this.#requestJSON("changePassword", args);
  }
  async getBookmarks() {
    return this.#requestJSON("getBookmarks", {});
  }
  async createBookmark(args) {
    return this.#requestJSON("createBookmark", args);
  }
  async deleteBookmark(args) {
    return this.#requestJSON("deleteBookmark", args);
  }
  async getPlayQueue() {
    return this.#requestJSON("getPlayQueue", {});
  }
  async savePlayQueue(args) {
    return this.#requestJSON("savePlayQueue", args);
  }
  async getScanStatus() {
    return this.#requestJSON("getScanStatus", {});
  }
  /**
   * @description Start scanning media library. (fullScan is only supported by Navidrome)
   */
  async startScan(args) {
    return this.#requestJSON("startScan", args);
  }
}
export {
  SubsonicAPI as S
};
