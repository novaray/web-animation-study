const track = document.querySelector('.track');
const galleryTimelineElem = document.querySelector('.gallery-timeline');

track.animate(
	[
		{ transform: 'translate(-50%, 0)' },
		{ transform: 'translate(-50%, calc(2000px - 100vh))' } // 제주도 이미지와 갤러리에서 트랙이 멈춰있게 하는 처리. 브라우저 높이를 빼주었다.
		// 브라우저의 높이를 빼주는 이유는 스크롤 위치만큼 빼주는 것이다.
		// .gallery-timeline의 높이가 2000px
	],
	{
		fill: "both",
		timeline: new ScrollTimeline({
			scrollOffsets: [
				{ target: galleryTimelineElem, edge: "start", threshold: 1 },
				{ target: galleryTimelineElem, edge: "end", threshold: 1 }
			]
		})
	}
);
