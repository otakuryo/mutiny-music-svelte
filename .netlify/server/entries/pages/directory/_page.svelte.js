import { c as create_ssr_component, v as validate_component, d as add_attribute, e as escape, o as get_store_value, s as subscribe, p as is_promise, n as noop, f as each } from "../../../chunks/index.js";
import { S as SubsonicAPI } from "../../../chunks/index3.js";
import { I as Icon, S as ServerConfigPersistent, L as Layout } from "../../../chunks/ServerConfigStore.js";
import { w as writable } from "../../../chunks/index2.js";
import { Howl } from "howler";
import { p as page } from "../../../chunks/stores.js";
const Arrow_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "19",
        "y1": "12",
        "x2": "5",
        "y2": "12"
      }
    ],
    ["polyline", { "points": "12 19 5 12 12 5" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-left" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowLeft = Arrow_left;
const Arrow_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "5",
        "y1": "12",
        "x2": "19",
        "y2": "12"
      }
    ],
    ["polyline", { "points": "12 5 19 12 12 19" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-right" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ArrowRight = Arrow_right;
const Check_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M22 11.08V12a10 10 0 1 1-5.93-9.14"
      }
    ],
    ["polyline", { "points": "22 4 12 14.01 9 11.01" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "check-circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const CheckCircle = Check_circle;
const List_end = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M16 12H3" }],
    ["path", { "d": "M16 6H3" }],
    ["path", { "d": "M10 18H3" }],
    ["path", { "d": "M21 6v10a2 2 0 0 1-2 2h-4" }],
    ["path", { "d": "m16 16-2 2 2 2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "list-end" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ListEnd = List_end;
const Pause = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "x": "6",
        "y": "4",
        "width": "4",
        "height": "16"
      }
    ],
    [
      "rect",
      {
        "x": "14",
        "y": "4",
        "width": "4",
        "height": "16"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pause" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Pause$1 = Pause;
const Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["polygon", { "points": "5 3 19 12 5 21 5 3" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "play" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Play$1 = Play;
const Plus_circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    [
      "line",
      {
        "x1": "12",
        "y1": "8",
        "x2": "12",
        "y2": "16"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "y1": "12",
        "x2": "16",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus-circle" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const PlusCircle = Plus_circle;
const Skip_back = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polygon", { "points": "19 20 9 12 19 4 19 20" }],
    [
      "line",
      {
        "x1": "5",
        "y1": "19",
        "x2": "5",
        "y2": "5"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "skip-back" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const SkipBack = Skip_back;
const Skip_forward = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polygon", { "points": "5 4 15 12 5 20 5 4" }],
    [
      "line",
      {
        "x1": "19",
        "y1": "5",
        "x2": "19",
        "y2": "19"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "skip-forward" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const SkipForward = Skip_forward;
const Trash_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "y1": "11",
        "x2": "10",
        "y2": "17"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "y1": "11",
        "x2": "14",
        "y2": "17"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trash-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash2 = Trash_2;
const MusicFolderLineBack = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { id } = $$props;
  let { name } = $$props;
  let { refreshViewOnClick = (event) => {
  } } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.refreshViewOnClick === void 0 && $$bindings.refreshViewOnClick && refreshViewOnClick !== void 0)
    $$bindings.refreshViewOnClick(refreshViewOnClick);
  return `<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"${add_attribute("data-id", id, 0)}${add_attribute("data-name", name, 0)}><a href="${"/directory?id=" + escape(id, true)}"><div class="p-2 flex items-center z-50">${validate_component(ArrowLeft, "ArrowLeft").$$render(
    $$result,
    {
      class: "stroke-current text-slate-900 dark:text-white h-6 w-12 mr-6"
    },
    {},
    {}
  )}

            <div class="flex flex-col"><span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">${escape(name)}</span></div></div></a></div>`;
});
const ImgCover = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { api } = $$props;
  let { title = "Unknown title" } = $$props;
  let { songId = "-1" } = $$props;
  let imageUrl = "https://placehold.it/210x310";
  function getCoverArt() {
    let image = api.getCoverArtWoFetchSync({ id: songId });
    imageUrl = image;
  }
  getCoverArt();
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.songId === void 0 && $$bindings.songId && songId !== void 0)
    $$bindings.songId(songId);
  return `<img loading="lazy"${add_attribute("src", imageUrl, 0)} data-amplitude-song-info="cover_art_url" class="w-12 h-12 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"${add_attribute("alt", title, 0)}>`;
});
const DirectoryLineDirectory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { directory } = $$props;
  let { api } = $$props;
  let { refreshViewOnClick } = $$props;
  if ($$props.directory === void 0 && $$bindings.directory && directory !== void 0)
    $$bindings.directory(directory);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  if ($$props.refreshViewOnClick === void 0 && $$bindings.refreshViewOnClick && refreshViewOnClick !== void 0)
    $$bindings.refreshViewOnClick(refreshViewOnClick);
  return `<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"${add_attribute("data-id", directory.id, 0)}${add_attribute("data-is-dir", directory.isDir, 0)}${add_attribute("data-parent", directory.parent, 0)}${add_attribute("data-title", directory.title, 0)}><a href="${"/directory?id=" + escape(directory.id, true)}"><div class="p-2 flex items-center z-50">${validate_component(ImgCover, "ImgCover").$$render(
    $$result,
    {
      api,
      title: directory.title,
      songId: directory.id
    },
    {},
    {}
  )}

            <div class="flex flex-col"><span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">${escape(directory.title)}</span>
                <div></div></div>
            ${directory.isDir ? `${validate_component(ArrowRight, "ArrowRight").$$render(
    $$result,
    {
      class: "stroke-current text-slate-900 dark:text-white h-6 w-12 ml-auto"
    },
    {},
    {}
  )}` : ``}</div></a></div>`;
});
const playlist = () => {
  const list = [];
  const { subscribe: subscribe2, set, update } = writable(list);
  const methods = {
    addSong: (song) => {
      console.log("*: playlistStore -> addSong()");
      list.push(song);
      let index = list.length - 1;
      set(list);
      return index;
    },
    addSongAtIndex: (song, index) => {
      console.log("*: playlistStore -> addSongAtIndex()");
      list.splice(index, 0, song);
      set(list);
      return index;
    },
    removeSongBySong: (song) => {
      console.log("*: playlistStore -> removeSong()");
      const index = list.indexOf(song);
      list.splice(index, 1);
      set(list);
    },
    removeSongByIndex: (index) => {
      console.log("*: playlistStore -> removeSong()");
      list.splice(index, 1);
      set(list);
    },
    getSongByIndex: (index) => {
      console.log("*: playlistStore -> getSongByIndex()");
      return list[index];
    },
    // getSongBySong: (song) => {
    //     console.log('*: playlistStore -> getSongBySong()');
    //     return list.indexOf(song);
    // },
    getSongList: () => {
      console.log("*: playlistStore -> getSongList()");
      console.log(list);
      return list;
    },
    // getNextSong: (song) => {
    //     console.log('*: playlistStore -> getNextSong()');
    //     const index = list.indexOf(song);
    //     console.log(index, list[index + 1]);
    //     return list[index + 1];
    // },
    // getPrevSong: (song) => {
    //     console.log('*: playlistStore -> getPrevSong()');
    //     const index = list.indexOf(song);
    //     return list[index - 1];
    // },
    // getNextSongIndex: (song) => {
    //     console.log('*: playlistStore -> getNextSongIndex()');
    //     const index = list.indexOf(song);
    //     return index + 1;
    // },
    // getPrevSongIndex: (song) => {
    //     console.log('*: playlistStore -> getPrevSongIndex()');
    //     const index = list.indexOf(song);
    //     return index - 1;
    // },
    getNextSongByIndex: (index) => {
      console.log("*: playlistStore -> getNextSongByIndex()");
      if (index + 1 >= list.length) {
        return list[0];
      }
      return list[index + 1];
    },
    getPrevSongByIndex: (index) => {
      console.log("*: playlistStore -> getPrevSongByIndex()");
      if (index - 1 < 0) {
        return list[list.length - 1];
      }
      return list[index - 1];
    }
  };
  return {
    subscribe: subscribe2,
    ...methods
  };
};
const PlaylistStore = playlist();
const currentSong = writable({ id: "-1", songId: "-1" });
const currentIndex = writable(-1);
const isPlaying = writable(false);
const isStopped = writable(true);
const player = () => {
  const onEndedCallback = () => {
    console.log("Ended");
    let index = get_store_value(currentIndex);
    let nextSong = PlaylistStore.getNextSongByIndex(index);
    if (nextSong) {
      methods.setSongAndPlay(nextSong.downloadSongUrl, nextSong, index + 1);
    }
  };
  const handleLoad = () => {
    const node = playerHowl._sounds[0]._node;
    node.addEventListener("progress", () => {
      const duration = playerHowl.duration();
      if (duration > 0) {
        for (let i = 0; i < node.buffered.length; i++) {
          if (node.buffered.start(node.buffered.length - 1 - i) < node.currentTime) {
            const bufferProgress = node.buffered.end(node.buffered.length - 1 - i) / duration * 100;
            console.log("buffer 3", bufferProgress);
            break;
          }
        }
      }
    });
  };
  const playlist2 = [""];
  const configHowl = {
    src: playlist2,
    html5: true,
    preload: true,
    onplay: () => {
      console.log("Playing");
    },
    onload: handleLoad,
    onpause: () => {
      console.log("Paused");
    },
    onstop: () => {
      console.log("Stopped");
    },
    onend: onEndedCallback
  };
  let playerHowl = new Howl(configHowl);
  const { subscribe: subscribe2, set, update } = writable(playerHowl);
  const methods = {
    setSong: (song, songObj = {}, index = 0) => {
      console.log("*: playerStore -> setSong()");
      console.log(song);
      playerHowl.stop();
      playerHowl.unload();
      playlist2[0] = song;
      playerHowl = new Howl(configHowl);
      playerHowl.load();
      currentSong.set(songObj);
      currentIndex.set(index);
    },
    setSongAndPlay: (song, songObj = {}, index = 0) => {
      console.log("*: playerStore -> setSongAndPlay()");
      methods.setSong(song, songObj, index);
      methods.play();
    },
    play: () => {
      console.log("*: playerStore -> play()");
      playerHowl.play();
      isPlaying.set(true);
      isStopped.set(false);
      navigator.mediaSession.playbackState = "playing";
    },
    pause: () => {
      console.log("*: playerStore -> pause()");
      playerHowl.pause();
      isPlaying.set(false);
      isStopped.set(false);
      navigator.mediaSession.playbackState = "paused";
    },
    toggle: () => {
      console.log("*: playerStore -> toggle()");
      if (isPlaying) {
        methods.pause();
        isPlaying.set(false);
      } else {
        methods.play();
        isPlaying.set(true);
      }
      isStopped.set(false);
    },
    stop: () => {
      console.log("*: playerStore -> stop()");
      playerHowl.stop();
      isStopped.set(true);
      isPlaying.set(false);
    },
    seek: (time) => {
      playerHowl.seek(time);
    },
    volume: (volume) => {
      playerHowl.volume(volume);
    },
    mute: () => {
      playerHowl.mute();
    },
    unmute: () => {
      playerHowl.unmute();
    },
    fade: (from, to, duration) => {
      playerHowl.fade(from, to, duration);
    },
    loop: (loop) => {
      playerHowl.loop(loop);
    },
    rate: (rate) => {
      playerHowl.rate(rate);
    },
    currentTime: () => {
      return playerHowl.seek() || 0;
    },
    duration: () => {
      return playerHowl.duration();
    }
  };
  return {
    subscribe: subscribe2,
    ...methods
  };
};
const PlayerStore = player();
const BtnChecked = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked = false } = $$props;
  let { toggleChecked = () => {
  } } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.toggleChecked === void 0 && $$bindings.toggleChecked && toggleChecked !== void 0)
    $$bindings.toggleChecked(toggleChecked);
  return `<div>${checked ? `${validate_component(CheckCircle, "CheckCircle").$$render(
    $$result,
    {
      class: "stroke-current text-slate-900 dark:text-white h-6 w-6 mr-3"
    },
    {},
    {}
  )}` : `${validate_component(PlusCircle, "PlusCircle").$$render(
    $$result,
    {
      class: "stroke-current text-slate-900 dark:text-white h-6 w-6 mr-3"
    },
    {},
    {}
  )}`}</div>`;
});
const TemporalList = () => {
  const list = [];
  const { subscribe: subscribe2, set, update } = writable(list);
  const methods = {
    addSong: (song) => {
      console.log("*: TemporalListStore -> addSong()");
      list.push(song);
      let index = list.length - 1;
      set(list);
      return index;
    },
    addSongAtIndex: (song, index) => {
      console.log("*: TemporalListStore -> addSongAtIndex()");
      list.splice(index, 0, song);
      set(list);
      return index;
    },
    // removeSongBySong: (song) => {
    //     console.log('*: TemporalListStore -> removeSong()');
    //     const index = list.indexOf(song);
    //     list.splice(index, 1);
    //     set(list);
    // },
    removeSongByIndex: (index) => {
      console.log("*: TemporalListStore -> removeSong()");
      console.log({ index });
      list.splice(index, 1);
      set(list);
    },
    clear: () => {
      console.log("*: TemporalListStore -> clear()");
      list.splice(0, list.length);
      set(list);
    },
    getSongByIndex: (index) => {
      console.log("*: TemporalListStore -> getSongByIndex()");
      return list[index];
    },
    getSongIndexById: (id) => {
      console.log("*: TemporalListStore -> getSongIndexById()");
      const index = list.findIndex((song) => song.id === id);
      return index;
    },
    // getSongBySong: (song) => {
    //     console.log('*: TemporalListStore -> getSongBySong()');
    //     return list.indexOf(song);
    // },
    getSongList: () => {
      console.log("*: TemporalListStore -> getSongList()");
      console.log(list);
      return list;
    }
    // getNextSong: (song) => {
    //     console.log('*: TemporalListStore -> getNextSong()');
    //     const index = list.indexOf(song);
    //     console.log(index, list[index + 1]);
    //     return list[index + 1];
    // },
    // getPrevSong: (song) => {
    //     console.log('*: TemporalListStore -> getPrevSong()');
    //     const index = list.indexOf(song);
    //     return list[index - 1];
    // },
    // getNextSongIndex: (song) => {
    //     console.log('*: TemporalListStore -> getNextSongIndex()');
    //     const index = list.indexOf(song);
    //     return index + 1;
    // },
    // getPrevSongIndex: (song) => {
    //     console.log('*: TemporalListStore -> getPrevSongIndex()');
    //     const index = list.indexOf(song);
    //     return index - 1;
    // },
    // getNextSongByIndex: (index) => {
    //     console.log('*: TemporalListStore -> getNextSongByIndex()');
    //     if (index + 1 >= list.length) {
    //         return list[0];
    //     }
    //     return list[index + 1];
    // },
    // getPrevSongByIndex: (index) => {
    //     console.log('*: TemporalListStore -> getPrevSongByIndex()');
    //     if (index - 1 < 0) {
    //         return list[list.length - 1];
    //     }
    //     return list[index - 1];
    // }
  };
  return {
    subscribe: subscribe2,
    ...methods
  };
};
const TemporalListStore = TemporalList();
const DirectoryLineMusic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isPlaying, $$unsubscribe_isPlaying;
  let $currentSong, $$unsubscribe_currentSong;
  $$unsubscribe_isPlaying = subscribe(isPlaying, (value) => $isPlaying = value);
  $$unsubscribe_currentSong = subscribe(currentSong, (value) => $currentSong = value);
  let { song } = $$props;
  let { api } = $$props;
  let songPlaylistIndex = -1;
  let durationHuman = "00:00";
  function buildSongUrl() {
    return api.downloadWoFetchSync({ id: song.id });
  }
  function addSongToTemporalList() {
    song.downloadSongUrl = buildSongUrl();
    song.songId = song.id;
    let index = TemporalListStore.addSong(song);
    return index;
  }
  function toggleChecked() {
    song.checked = !song.checked;
    if (song.checked) {
      songPlaylistIndex = addSongToTemporalList();
    } else {
      if (songPlaylistIndex === -1) {
        songPlaylistIndex = TemporalListStore.getSongIndexById(song.id);
        if (songPlaylistIndex === -1)
          return;
      }
      TemporalListStore.removeSongByIndex(songPlaylistIndex);
    }
  }
  function getDurationHuman2() {
    if (song.duration === void 0)
      return "00:00";
    let minutes = Math.floor(song.duration / 60);
    let seconds = song.duration - minutes * 60;
    let mmStr = minutes.toString().padStart(2, "0");
    let ssStr = seconds.toString().padStart(2, "0");
    return `${mmStr}:${ssStr}`;
  }
  durationHuman = getDurationHuman2();
  if ($$props.song === void 0 && $$bindings.song && song !== void 0)
    $$bindings.song(song);
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"${add_attribute("data-id", song.id, 0)}${add_attribute("data-is-dir", song.isDir, 0)}${add_attribute("data-parent", song.parent, 0)}${add_attribute("data-title", song.title, 0)}><div class="cursor-pointer"><div class="py-2 flex items-center z-50">${validate_component(BtnChecked, "BtnChecked").$$render(
      $$result,
      { toggleChecked, checked: song.checked },
      {
        checked: ($$value) => {
          song.checked = $$value;
          $$settled = false;
        }
      },
      {}
    )}
            
            ${validate_component(ImgCover, "ImgCover").$$render($$result, { api, title: song.title, songId: song.id }, {}, {})}

            <div class="flex flex-col"><span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">${escape(song.title)}</span>
                <span data-amplitude-song-info="time" class="font-sans text-sm font-medium text-gray-500 dark:text-gray-400">${escape(durationHuman)}</span></div>

            <div class="ml-auto flex flex-row">
                <div>${validate_component(ListEnd, "ListEnd").$$render(
      $$result,
      {
        class: "stroke-current text-slate-900 dark:text-white h-6 w-12"
      },
      {},
      {}
    )}</div>

                ${$isPlaying && $currentSong.id === song.id ? `
                    <div>${validate_component(Pause$1, "Pause").$$render(
      $$result,
      {
        class: "stroke-current text-slate-900 dark:text-white h-6 w-12"
      },
      {},
      {}
    )}</div>` : `
                    <div>${validate_component(Play$1, "Play").$$render(
      $$result,
      {
        class: "stroke-current text-slate-900 dark:text-white h-6 w-12"
      },
      {},
      {}
    )}</div>`}</div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_isPlaying();
  $$unsubscribe_currentSong();
  return $$rendered;
});
const ControlsPlaylist = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { api } = $$props;
  let { list = [] } = $$props;
  let { callbackCheckSonByIndex } = $$props;
  let { callbackUncheckSonByIndex } = $$props;
  if ($$props.api === void 0 && $$bindings.api && api !== void 0)
    $$bindings.api(api);
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  if ($$props.callbackCheckSonByIndex === void 0 && $$bindings.callbackCheckSonByIndex && callbackCheckSonByIndex !== void 0)
    $$bindings.callbackCheckSonByIndex(callbackCheckSonByIndex);
  if ($$props.callbackUncheckSonByIndex === void 0 && $$bindings.callbackUncheckSonByIndex && callbackUncheckSonByIndex !== void 0)
    $$bindings.callbackUncheckSonByIndex(callbackUncheckSonByIndex);
  return `<div class="flex w-100 flex-row"><button type="button" class="btn-small-control-list">Seleccionar todos</button>
    <button type="button" class="btn-small-control-list">Deseleccionar todos</button>
    <button type="button" class="btn-small-control-list">Añadir al final</button>
    
    
    <button type="button" class="btn-small-control-list cursor-help">Show list</button></div>`;
});
const DirectoryIndex = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { directoryId = void 0 } = $$props;
  let api;
  let dataFromServer = Promise.resolve([]);
  async function initSubsonicApi() {
    let server = ServerConfigPersistent.get();
    console.log(server);
    const api2 = new SubsonicAPI({
      url: server.serverUrl,
      type: server.serverType
    });
    api2.loginSync({
      username: server.username,
      password: server.password,
      serverName: server.serverName,
      version: server.serverVersion
    });
    return api2;
  }
  async function getDataFromServer() {
    try {
      api = await initSubsonicApi();
    } catch (error) {
      console.log(error);
      return [];
    }
    await new Promise((r) => setTimeout(r, 50));
    let resMusicDirectory = [];
    if (directoryId) {
      resMusicDirectory.push(await api.getMusicDirectory({ id: directoryId }));
      return resMusicDirectory;
    }
    const resMusicFolders = await api.getMusicFolders();
    if (!resMusicFolders || !resMusicFolders.musicFolders || !resMusicFolders.musicFolders.musicFolder) {
      return [];
    }
    if (resMusicFolders.musicFolders.musicFolder.length > 0) {
      for (const folder of resMusicFolders.musicFolders.musicFolder) {
        resMusicDirectory.push(await api.getMusicDirectory({ id: folder.id }));
      }
    }
    return resMusicDirectory;
  }
  function refreshViewOnClick() {
    dataFromServer = getDataFromServer();
  }
  function toggleDataFromServer(indexes, state) {
    dataFromServer.then((libraries) => {
      libraries.forEach((library) => {
        if (library.directory) {
          indexes.forEach((index) => {
            library.directory.child[index].checked = state;
          });
        }
      });
    });
    dataFromServer = dataFromServer;
  }
  function callbackCheckSonByIndex(indexes) {
    toggleDataFromServer(indexes, true);
  }
  function callbackUncheckSonByIndex(indexes) {
    toggleDataFromServer(indexes, false);
  }
  if ($$props.directoryId === void 0 && $$bindings.directoryId && directoryId !== void 0)
    $$bindings.directoryId(directoryId);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="divide-y w-6/12">${function(__value) {
      if (is_promise(__value)) {
        __value.then(null, noop);
        return `
        <div class="w-full">loading...</div>
    `;
      }
      return function(libraries) {
        return `

        ${each(libraries, (library) => {
          return `${library.directory ? `${library.directory && library.directory.parent ? `${validate_component(MusicFolderLineBack, "MusicFolderLineBack").$$render(
            $$result,
            {
              name: library.directory.name,
              id: library.directory.parent,
              refreshViewOnClick
            },
            {},
            {}
          )}` : ``}

                ${validate_component(ControlsPlaylist, "ControlsPlaylist").$$render(
            $$result,
            {
              api,
              callbackCheckSonByIndex,
              callbackUncheckSonByIndex,
              list: library.directory.child
            },
            {
              list: ($$value) => {
                library.directory.child = $$value;
                $$settled = false;
              }
            },
            {}
          )}

                ${each(library.directory.child, (child) => {
            return `${child.isDir ? `${validate_component(DirectoryLineDirectory, "DirectoryLineDirectory").$$render(
              $$result,
              {
                directory: child,
                api,
                refreshViewOnClick
              },
              {},
              {}
            )}` : `${validate_component(DirectoryLineMusic, "DirectoryLineMusic").$$render(
              $$result,
              { api, song: child },
              {
                song: ($$value) => {
                  child = $$value;
                  $$settled = false;
                }
              },
              {}
            )}`}`;
          })}` : ``}`;
        })}
    `;
      }(__value);
    }(dataFromServer)}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const MusicFolderLine = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { folder } = $$props;
  if ($$props.folder === void 0 && $$bindings.folder && folder !== void 0)
    $$bindings.folder(folder);
  return `<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"${add_attribute("data-id", folder.id, 0)}${add_attribute("data-name", folder.name, 0)}><a href="${"/directory?id=" + escape(folder.id, true)}"><div class="p-2 flex items-center z-50"><img loading="lazy" src="https://placehold.it/210x310" data-amplitude-song-info="cover_art_url" class="w-12 h-12 rounded-sm mr-6 border-bg-player-light-background dark:border-cover-dark-border object-cover"${add_attribute("alt", folder.name, 0)}>

            <div class="flex flex-col"><span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">${escape(folder.name)}</span></div></div></a></div>`;
});
const MusicFolderIndex = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let api;
  async function initSubsonicApi() {
    let server = ServerConfigPersistent.get();
    const api2 = new SubsonicAPI({
      url: server.serverUrl,
      type: server.serverType
    });
    api2.loginSync({
      username: server.username,
      password: server.password,
      serverName: server.serverName,
      version: server.serverVersion
    });
    return api2;
  }
  async function getDataFromServer() {
    api = await initSubsonicApi();
    const resPing = await api.ping();
    if (resPing.status !== "ok") {
      return [];
    }
    const resMusicFolders = await api.getMusicFolders();
    if (!resMusicFolders || !resMusicFolders.musicFolders || !resMusicFolders.musicFolders.musicFolder) {
      return [];
    }
    console.log(resPing, resMusicFolders, resMusicFolders.musicFolders.musicFolder);
    return resMusicFolders;
  }
  return `<div class="divide-y w-6/12">${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return `
        <div>loading...</div>
    `;
    }
    return function(musicFolders) {
      return `
        ${each(musicFolders.musicFolders.musicFolder, (musicFolder) => {
        return `${validate_component(MusicFolderLine, "MusicFolderLine").$$render($$result, { folder: musicFolder }, {}, {})}`;
      })}
    `;
    }(__value);
  }(getDataFromServer())}</div>`;
});
const PlayerControls_svelte_svelte_type_style_lang = "";
const css = {
  code: ".current-duration-container.svelte-8ad275{@apply mx-2 mt-2 mb-0 text-center;}button.svelte-8ad275:disabled{@apply opacity-50 cursor-not-allowed;}.progress-container.svelte-8ad275{height:22px}input[type=range].svelte-8ad275{height:22px;-webkit-appearance:none;margin:0;width:100%;background:#ffffff00}input[type=range].svelte-8ad275:focus{outline:none}input[type=range].svelte-8ad275::-webkit-slider-runnable-track{width:100%;height:16px;cursor:pointer;animate:0.2s;box-shadow:0px 0px 5px #000000;background:#FFFFFF;border-radius:32px;border:0px solid #000000}input[type=range].svelte-8ad275::-webkit-slider-thumb{box-shadow:0px 0px 4px #000000;border:0px solid #000000;height:16px;width:16px;border-radius:16px;background:#000000;cursor:pointer;-webkit-appearance:none;margin-top:0px}input[type=range].svelte-8ad275:focus::-webkit-slider-runnable-track{background:#FFFFFF}input[type=range].svelte-8ad275::-moz-range-track{width:100%;height:16px;cursor:pointer;animate:0.2s;box-shadow:0px 0px 5px #000000;background:#FFFFFF;border-radius:32px;border:0px solid #000000}input[type=range].svelte-8ad275::-moz-range-thumb{box-shadow:0px 0px 4px #000000;border:0px solid #000000;height:16px;width:16px;border-radius:16px;background:#000000;cursor:pointer}input[type=range].svelte-8ad275::-ms-track{width:100%;height:16px;cursor:pointer;animate:0.2s;background:transparent;border-color:transparent;color:transparent}input[type=range].svelte-8ad275::-ms-fill-lower{background:#FFFFFF;border:0px solid #000000;border-radius:64px;box-shadow:0px 0px 5px #000000}input[type=range].svelte-8ad275::-ms-fill-upper{background:#FFFFFF;border:0px solid #000000;border-radius:64px;box-shadow:0px 0px 5px #000000}input[type=range].svelte-8ad275::-ms-thumb{margin-top:1px;box-shadow:0px 0px 4px #000000;border:0px solid #000000;height:16px;width:16px;border-radius:16px;background:#000000;cursor:pointer}input[type=range].svelte-8ad275:focus::-ms-fill-lower{background:#FFFFFF}input[type=range].svelte-8ad275:focus::-ms-fill-upper{background:#FFFFFF}",
  map: null
};
function getDurationHuman$1(duration) {
  if (duration === void 0)
    return "00:00";
  let minutes = Math.floor(duration / 60);
  let seconds = Math.round(duration - minutes * 60);
  let mmStr = minutes.toString().padStart(2, "0");
  let ssStr = seconds.toString().padStart(2, "0");
  return `${mmStr}:${ssStr}`;
}
const PlayerControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isPlaying, $$unsubscribe_isPlaying;
  $$unsubscribe_isPlaying = subscribe(isPlaying, (value) => $isPlaying = value);
  let disablePrev = false;
  let disableNext = false;
  let disablePlay = false;
  function togglePlaying() {
    if (get_store_value(isPlaying)) {
      PlayerStore.pause();
    } else {
      PlayerStore.play();
    }
  }
  function skipBack() {
    console.log("skipBack");
    let index = get_store_value(currentIndex);
    let nextSong = PlaylistStore.getPrevSongByIndex(index);
    if (nextSong) {
      PlayerStore.setSongAndPlay(nextSong.downloadSongUrl, nextSong, index - 1);
    }
  }
  function skipForward() {
    console.log("skipForward");
    let index = get_store_value(currentIndex);
    let prevSong = PlaylistStore.getNextSongByIndex(index);
    if (prevSong) {
      PlayerStore.setSongAndPlay(prevSong.downloadSongUrl, prevSong, index + 1);
    }
  }
  let currentPosition = 0;
  let duration = 0;
  let percentage = "0";
  let durationHuman = "00:00";
  let durationHumanTotal = "00:00";
  let intervalDuration;
  function getCurrentPosition() {
    console.log("getCurrentPosition");
    if (intervalDuration) {
      clearInterval(intervalDuration);
    }
    intervalDuration = setInterval(
      () => {
        duration = PlayerStore.duration();
        currentPosition = Math.round(PlayerStore.currentTime());
      },
      1e3
    );
  }
  isPlaying.subscribe((isPlaying2) => {
    if (isPlaying2) {
      getCurrentPosition();
    }
  });
  function getPercentageDuration() {
    if (currentPosition === 0)
      return "0";
    return (currentPosition / duration * 100).toFixed(2);
  }
  currentSong.subscribe((item) => {
    if (item.id !== "-1") {
      disablePrev = false;
      disableNext = false;
      disablePlay = false;
    } else {
      disablePrev = true;
      disableNext = true;
      disablePlay = true;
    }
  });
  function createMediaCallback() {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.setActionHandler("play", togglePlaying);
      navigator.mediaSession.setActionHandler("pause", togglePlaying);
      navigator.mediaSession.setActionHandler("previoustrack", skipBack);
      navigator.mediaSession.setActionHandler("nexttrack", skipForward);
      navigator.mediaSession.setActionHandler("seekto", (details) => {
        console.log("seekto", details);
        PlayerStore.seek(details.seekTime);
      });
    }
  }
  createMediaCallback();
  $$result.css.add(css);
  durationHumanTotal = getDurationHuman$1(duration);
  durationHuman = getDurationHuman$1(currentPosition);
  {
    if (currentPosition > 0) {
      percentage = getPercentageDuration();
    }
  }
  $$unsubscribe_isPlaying();
  return `<div class="w-full my-3"><div class="flex flex-row justify-center"><button class="player-button-base svelte-8ad275" ${disablePrev ? "disabled" : ""}>${validate_component(SkipBack, "SkipBack").$$render($$result, { class: "icon-base" }, {}, {})}</button>

        
        <button class="player-button-base svelte-8ad275" ${disablePlay ? "disabled" : ""}>${$isPlaying ? `${validate_component(Pause$1, "Pause").$$render($$result, { class: "icon-base" }, {}, {})}` : `${validate_component(Play$1, "Play").$$render($$result, { class: "icon-base" }, {}, {})}`}</button> 

        <button class="player-button-base svelte-8ad275" ${disableNext ? "disabled" : ""}>${validate_component(SkipForward, "SkipForward").$$render($$result, { class: "icon-base" }, {}, {})}</button></div>

    <div class="w-100% mx-2 my-0 current-duration-container svelte-8ad275">${escape(durationHuman)} - ${escape(durationHumanTotal)} - ${escape(percentage)}%
    </div>
    <div class="w-100% mx-2 progress-container svelte-8ad275"><input type="range" min="0"${add_attribute("max", duration, 0)} class="svelte-8ad275"${add_attribute("value", currentPosition, 0)}></div></div>`;
});
function getDurationHuman(duration) {
  if (duration === void 0)
    return "00:00";
  let minutes = Math.floor(duration / 60);
  let seconds = duration - minutes * 60;
  let mmStr = minutes.toString().padStart(2, "0");
  let ssStr = seconds.toString().padStart(2, "0");
  return `${mmStr}:${ssStr}`;
}
const PlayerInformationSong = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { songId = "-1" } = $$props;
  let imageUrl = "https://placehold.it/210x310";
  let song;
  let api = initSubsonicApi();
  function initSubsonicApi() {
    let server = ServerConfigPersistent.get();
    console.log(server);
    const api2 = new SubsonicAPI({
      url: server.serverUrl,
      type: server.serverType
    });
    api2.loginSync({
      username: server.username,
      password: server.password,
      serverName: server.serverName,
      version: server.serverVersion
    });
    return api2;
  }
  currentSong.subscribe((currentSong2) => {
    if (currentSong2 && currentSong2.songId !== "-1") {
      songId = currentSong2.id;
      song = currentSong2;
    }
  });
  function updateMediaMetadata() {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song?.title ?? "--",
        artist: song?.artist ?? "--",
        album: song?.album ?? "--",
        artwork: [
          {
            src: imageUrl,
            sizes: "512x512",
            type: "image/png"
          }
        ]
      });
    }
  }
  if ($$props.songId === void 0 && $$bindings.songId && songId !== void 0)
    $$bindings.songId(songId);
  {
    if (songId && songId !== "-1") {
      imageUrl = api.getCoverArtWoFetchSync({ id: songId });
      updateMediaMetadata();
      if (song !== void 0) {
        api.getCoverArtWoFetchSync({ id: song.parent });
      }
    }
  }
  return `<div class="divider-y w-full my-3"><div class="flex flex-row"><img loading="lazy"${add_attribute("src", imageUrl, 0)} data-amplitude-song-info="cover_art_url" class="w-24 h-24 rounded-sm mr-3 border-bg-player-light-background dark:border-cover-dark-border object-cover"${add_attribute("alt", song?.title, 0)}>
        <div class="flex flex-col"><div class="text-sm font-semibold text-bg-player-light-text dark:text-cover-dark-text">${escape(song?.title ?? "--")}</div>
            <div class="text-xs text-bg-player-light-text dark:text-cover-dark-text">${escape(song?.artist ?? "--")}</div>
            <div class="text-xs text-bg-player-light-text dark:text-cover-dark-text">${escape(song?.album ?? "--")}</div>
            <div class="text-xs text-bg-player-light-text dark:text-cover-dark-text">${escape(getDurationHuman(song?.duration))}</div></div></div></div>`;
});
const PlayerLineMusic = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isPlaying, $$unsubscribe_isPlaying;
  let $currentSong, $$unsubscribe_currentSong;
  $$unsubscribe_isPlaying = subscribe(isPlaying, (value) => $isPlaying = value);
  $$unsubscribe_currentSong = subscribe(currentSong, (value) => $currentSong = value);
  let { song } = $$props;
  let { index = -1 } = $$props;
  let durationHuman = "00:00";
  function getDurationHuman2() {
    if (song.duration === void 0)
      return "00:00";
    let minutes = Math.floor(song.duration / 60);
    let seconds = song.duration - minutes * 60;
    let mmStr = minutes.toString().padStart(2, "0");
    let ssStr = seconds.toString().padStart(2, "0");
    return `${mmStr}:${ssStr}`;
  }
  if ($$props.song === void 0 && $$bindings.song && song !== void 0)
    $$bindings.song(song);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0)
    $$bindings.index(index);
  {
    if (song) {
      durationHuman = getDurationHuman2();
    }
  }
  $$unsubscribe_isPlaying();
  $$unsubscribe_currentSong();
  return `<div class="relative w-player flex flex-col shadow-player-light bg-player-light-background border-player-light-border dark:shadow-player-dark dark:bg-player-dark-background dark:border-player-dark-border dark:backdrop-blur-xl"${add_attribute("data-id", song.id, 0)}${add_attribute("data-is-dir", song.isDir, 0)}${add_attribute("data-parent", song.parent, 0)}${add_attribute("data-title", song.title, 0)}><div class="cursor-pointer"><div class="py-2 flex items-center z-50">
            
            

            
            ${$isPlaying && $currentSong.id === song.id ? `<div>${validate_component(Trash2, "Trash2").$$render(
    $$result,
    {
      class: "stroke-current text-red-500 dark:text-red-700 opacity-50 h-6 w-12 cursor-not-allowed"
    },
    {},
    {}
  )}</div>` : `<div>${validate_component(Trash2, "Trash2").$$render(
    $$result,
    {
      class: "stroke-current text-red-500 dark:text-red-700 h-6 w-12"
    },
    {},
    {}
  )}</div>`}

            <div class="flex flex-col"><span data-amplitude-song-info="name" class="font-sans text-lg font-medium leading-7 text-slate-900 dark:text-white">${escape(song.title)}</span>
                <span data-amplitude-song-info="time" class="font-sans text-sm font-medium text-gray-500 dark:text-gray-400">${escape(durationHuman)}</span></div>

            <div class="ml-auto flex flex-row">${$isPlaying && $currentSong.id === song.id ? `
                    <div>${validate_component(Pause$1, "Pause").$$render(
    $$result,
    {
      class: "stroke-current text-slate-900 dark:text-white h-6 w-12"
    },
    {},
    {}
  )}</div>` : `
                    <div>${validate_component(Play$1, "Play").$$render(
    $$result,
    {
      class: "stroke-current text-slate-900 dark:text-white h-6 w-12"
    },
    {},
    {}
  )}</div>`}</div></div></div></div>`;
});
const PlaylistIndex = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let localPlaylist = [];
  PlaylistStore.subscribe((value) => {
    localPlaylist = value;
  });
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="px-3 mx-3 w-4/12 divide-y">${validate_component(PlayerInformationSong, "PlayerInformationSong").$$render($$result, {}, {}, {})}
    ${validate_component(PlayerControls, "PlayerControls").$$render($$result, {}, {}, {})}
    ${each(localPlaylist, (song, index) => {
      return `${!song.isDir ? `${validate_component(PlayerLineMusic, "PlayerLineMusic").$$render(
        $$result,
        { index, song },
        {
          song: ($$value) => {
            song = $$value;
            $$settled = false;
          }
        },
        {}
      )}` : ``}`;
    })}</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let haveID = false;
  let id = "";
  {
    page.subscribe((value) => {
      haveID = value.url.searchParams.has("id");
      id = value.url.searchParams.get("id") || "";
    });
  }
  return `${validate_component(Layout, "Layout").$$render($$result, {}, {}, {
    default: () => {
      return `${haveID ? `${validate_component(DirectoryIndex, "DirectoryIndex").$$render($$result, { directoryId: id }, {}, {})}` : `${validate_component(MusicFolderIndex, "MusicFolderIndex").$$render($$result, {}, {}, {})}`}
    
    ${validate_component(PlaylistIndex, "PlaylistIndex").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};
