import './scroll-timeline.js';

const gallery = document.querySelector('.gallery');
const galleryTimeline = document.querySelector('.gallery-timeline');

gallery.animate(
  [
    {transform: 'translateX(0)'},
    {transform: 'translateX(calc(-100% + 100vw))'}  // 사진을 왼쪽으로 밀어야 되니까 -100%, 자기폭만큼 다 왼쪽으로 밀어버리니 여백이 생기기에 브라우저 폭만큼 더해줌.
  ],
  {
    fill: 'both',
    timeline: new ScrollTimeline({
      scrollOffsets: [
        { target: galleryTimeline, edge: 'start', threshold: 1},
        { target: galleryTimeline, edge: 'end', threshold: 1}
      ]
    })
  }
);
