const fetch = require('node-fetch');
const fs = require('fs');

const search = async function(query, w){
let url = "https://www.youtube.com/results?search_query="+query;
  return fetch(url)
    .then(res => res.text())
    .then(body => {
      let start = body.search('itemSectionRenderer');
      let end = body.search('},{\"continuationItemRenderer');
      body = body.slice(start, end);
      body = "{\""+body+"}";
     
      let fileName;
      
      if(w){
        if (w.includes('.')) {
          fileName = w
        }else{
          fileName = w+'.json'
        }
        fs.writeFile(fileName, body,
      {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
        },
        (err) => {
        if (err)
        console.log(err);
        else {
        console.log(`Data written succesfully inside`, fileName);
      }
      });
      }
      body = JSON.parse(body);

      var result = [];
 
      if(body.itemSectionRenderer.contents[0].videoRenderer){
        var res = 
          {
            videoId: body.itemSectionRenderer.contents[0].videoRenderer.videoId,
            title: body.itemSectionRenderer.contents[0].videoRenderer.title.runs[0].text,
            time: body.itemSectionRenderer.contents[0].videoRenderer.lengthText.simpleText,
            videoLink: "https://www.youtube.com/watch?v="+body.itemSectionRenderer.contents[0].videoRenderer.videoId,
            channelLink:"https://www.youtube.com"+body.itemSectionRenderer.contents[0].videoRenderer.longBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url,
            thumbnail: "https://i.ytimg.com/vi/"+body.itemSectionRenderer.contents[0].videoRenderer.videoId+"/hqdefault.jpg",
            publishedDate: body.itemSectionRenderer.contents[0].videoRenderer.publishedTimeText.simpleText,
            totalViews: body.itemSectionRenderer.contents[0].videoRenderer.viewCountText.simpleText
          }
        result.push(res);

      } 
      //output result
      return result;

    });
};

exports.search = search;