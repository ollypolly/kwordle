var iosStore = require("app-store-scraper");
const playStore = require("google-play-scraper");
const fs = require("fs");

playStore
  .developer({ devId: "5095490389686529219", fullDetail: true, num: 200 })
  .then((res) => {
    console.log("android apps:" + res.length);

    const androidArr = res.map((item) => ({
      name: item.title,
      downloads: item.minInstalls,
      release_date: item.released,
      contains_3d_in_name: item.title.includes("3D"),
      review_score: item.scoreText,
    }));

    iosStore.developer({ devId: 497961736 }).then((res) => {
      console.log("ios apps:" + res.length);
      const mergedArr = androidArr.map((androidItem) => ({
        ...androidItem,
        icon:
          res.find(
            (iosItem) =>
              iosItem.title === androidItem.name ||
              iosItem.title === `${androidItem.name} 3D`
          )?.icon ?? "",
      }));

      let games = {};

      for (const item of mergedArr) {
        games[item.name] = item;
      }

      games = JSON.stringify(games);

      fs.writeFileSync("play-store-data.json", games);
    });
  });
