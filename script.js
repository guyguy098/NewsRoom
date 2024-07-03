document.addEventListener('DOMContentLoaded', function() {
  var videoTitles = document.querySelectorAll('.grid-container .video-container h2');

  videoTitles.forEach(function(title) {
    var titleText = title.textContent.trim();

    if (titleText.includes('(Arab)')) {
      title.style.backgroundColor = 'lightred';
    } else if (titleText.includes('(Iran)')) {
      title.style.backgroundColor = 'lightblue';
    } else if (titleText.includes('(Israel)')) {
      title.style.backgroundColor = 'yellow';
    } else if (titleText.includes('(USA)')) {
      title.style.backgroundColor = 'lightgreen';
    }
  });

  const videos = document.querySelectorAll('video');
  videos.forEach(video => {
    video.muted = true;
    video.play();
  });

  const checkboxes = document.querySelectorAll('.checkbox-group input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', filterVideos);
  });
});

function loadStream(videoElementId, streamUrl) {
  var video = document.getElementById(videoElementId);
  if (Hls.isSupported()) {
    var hls = new Hls();
    hls.loadSource(streamUrl);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function() {
      video.play();
    });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = streamUrl;
    video.addEventListener('canplay', function() {});
  }
}

function changeGrid() {
  const gridSelector = document.getElementById('gridSelector');
  const gridContainer = document.getElementById('gridContainer');
  const [columns, rows] = gridSelector.value.split('x').map(Number);
  gridContainer.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  //gridContainer.style.gridAutoRows = `calc((100vh - 70px) / ${rows} - 5px)`;
}

function filterVideos() {
  const arabCheckbox = document.getElementById('arabCheckbox').checked;
  const israelCheckbox = document.getElementById('israelCheckbox').checked;
  const usaCheckbox = document.getElementById('usaCheckbox').checked;
  const iranCheckbox = document.getElementById('iranCheckbox').checked;
  const videoContainers = document.querySelectorAll('.video-container');

  videoContainers.forEach(container => {
    const title = container.querySelector('h2').textContent;

    if (
      (arabCheckbox && title.includes('(Arab)')) ||
      (israelCheckbox && title.includes('(Israel)')) ||
      (usaCheckbox && title.includes('(USA)')) ||
      (iranCheckbox && title.includes('(Iran)'))
    ) {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }

    if (!arabCheckbox && !israelCheckbox && !usaCheckbox && !iranCheckbox) {
      container.style.display = 'block';
    }
  });
}

function navigateToMap() {
  const warMaps = document.getElementById('warMaps');
  const selectedValue = warMaps.value;
  if (selectedValue) {
    window.open(selectedValue, '_blank');
    warMaps.value = '';
    warMaps.selectedIndex = 0;
  }
}

function navigateToNewsSite() {
  const newsSites = document.getElementById('newsSites');
  const selectedValue = newsSites.value;
  if (selectedValue) {
    window.open(selectedValue, '_blank');
    newsSites.value = '';
    newsSites.selectedIndex = 0;
  }
}

    loadStream('video1', 'https://e2.manar.live:9000/live/tracks-v1a1/mono.m3u8');																				//Al-Manar
	loadStream('video2', 'https://live.alarabiya.net/alarabiapublish/alarabiya.smil/playlist.m3u8');															//Al-Arabiya
	loadStream('video3', 'https://mbn-ingest-worldsafe.akamaized.net/hls/live/2038900/MBN_Alhurra_Worldsafe_HLS/master_2596.m3u8');								//Al-Hurra
	loadStream('video4', 'https://mdnlv.cdn.octivid.com/almdn/smil:mpegts.stream.smil/chunklist_b2000000_t64NDgwcA==.m3u8');									//Al-Mayadeen
	loadStream('video5', 'https://live-hls-v3-aje.getaj.net/AJE-V3/index.m3u8');																				//Al-Jazeera Qatar
	loadStream('video29', 'https://live-hls-web-aje.getaj.net/AJE/index.m3u8');																					//Al Jazeera				(USA)
	loadStream('video6', 'https://live-hls-web-aja.getaj.net/AJA/index.m3u8');																					//Al-Jazeera
	loadStream('video7', 'https://hls.iranfarda.live/hls/stream.m3u8');																							//IraneFarda			(Iran)
	loadStream('video8', 'https://simaytv.akamaized.net/hls/live/2043550/simayhls/index.m3u8');																	//Simaye Azadi			(Iran)
	loadStream('video9', 'https://dev-live.livetvstream.co.uk/LS-63503-4/index.m3u8');																			//Iran International	(Iran)
	loadStream('video10', 'https://live.aionet.ir/hls/irinn/irinn.m3u8');																						//Irinn					(Iran)
	loadStream('video11', 'https://live2.snn.ir/hls/snn0_low/index.m3u8');																						//SNN					(Iran)
	loadStream('video12', 'https://live.presstv.ir/hls/presstv_5_482/index.m3u8');																				//Press TV				(Iran)
	loadStream('video13', 'https://kan11w.media.kan.org.il/hls/live/2105694/2105694/master.m3u8');																//כאן 11				(Israel)
////	loadStream('video13', 'https://kan11.media.kan.org.il/hls/live/2024514/2024514/master.m3u8');																//כאן 11				(Israel)
	loadStream('video14', 'https://mako-streaming.akamaized.net/stream/hls/live/2033791/k12n12wad/profile/0/hdntl=exp=1719660079~acl=%2f*~data=hdntl~hmac=afb6700a126c3dbd526c2fce04b73f36a18ea0aed3ba48c85a64fc18d0589e7b/profileManifest.m3u8?_uid=3202af6a-0fa6-41a1-9588-6c4cb26eab84&rK=a1&_did=e0834e79e72d3daadbac32a11de9569cda97616b');																								//ערוץ 12				(Israel)
	loadStream('video15', 'https://reshet.g-mana.live/media/cdefce3a-14ec-46cc-a147-1275c4a8b9ed/mainManifest.m3u8');											//ערוץ 13				(Israel)
	loadStream('video16', 'https://ch14-channel14-content.akamaized.net/hls/live/2104807/CH14_CHANNEL14/2/streamPlaylist.m3u8');								//ערוץ 14				(Israel)
	loadStream('video20', 'https://bcovlive-a.akamaihd.net/6e3dd61ac4c34d6f8fb9698b565b9f50/eu-central-1/5377161796001/playlist-all_dvr.m3u8');					//i24News 				(USA)
	loadStream('video17', 'https://lnc-news12.tubi.video/index.m3u8');																							//News12 New-York		(USA)
	loadStream('video18', 'https://cnn-cnninternational-1-eu.rakuten.wurl.tv/playlist.m3u8');																	//CNN					(USA)
	loadStream('video19', 'https://lnc-nbc-news-now.tubi.video/master.m3u8');																					//NBC					(USA)
	loadStream('video21', 'http://247preview.foxnews.com/hls/live/2020027/fncv3preview/primary.m3u8');															//FOX news
	loadStream('video22', 'https://lnc-fox-live-now.tubi.video/index.m3u8');																					//Live now from Fox3
	loadStream('video23', 'https://lnc-abc-news.tubi.video/index.m3u8');																						//ABC news
	loadStream('video24', 'https://cbsn-ny.cbsnstream.cbsnews.com/out/v1/ec3897d58a9b45129a77d67aa247d136/master.m3u8');										//CBS
	loadStream('video25', 'https://linear417-gb-hls3-prd-ak.cdn.skycdp.com/100e/Content/HLS_004_1080_30/Live/channel(skynews)/index_1080.m3u8');				//SKynews
	loadStream('video26', 'https://vs-hls-push-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_news_channel_hd/t=3840/v=pv14/b=5070016/main.m3u8');		//BBC

//	24 Канал

document.addEventListener('DOMContentLoaded', function() {
  changeGrid();
  filterVideos();
});
