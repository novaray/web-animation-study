import './scroll-timeline.js';

const progress = document.querySelector('.progress');
const scrollBox = document.querySelector('.scroll-box');
const targetImages = document.querySelectorAll('.target-image');

progress.animate(
  [
    { transform: 'scaleX(0)' },
    { transform: 'scaleX(1)' }
  ],
  {
    timeline: new ScrollTimeline({
      scrollOffsets: [
        // 스크롤 타임기존에 기준이 되는 요소를 넣어주면 된다.
        {
          // threshold : 한계점 - 기준이 되는 위치가 있을 때 얼마나 지나감에 따라 적용(1로 하면 전체 적용, 0.5로 하면 절반 지나갔을 때 적용)
          target: document.body, edge: 'start', threshold: 1
        },
        {
          target: document.body, edge: 'end', threshold: 1
        },
        // { target: scrollBox, edge: 'start', threshold: 1 },
        // { target: scrollBox, edge: 'end', threshold: 1 }
      ]
    })
  }
);

targetImages.forEach((image) => {
  const imageTop = image.offsetTop;
  const imageHeight = image.offsetHeight;

  const offset1 = imageTop + imageHeight - window.innerHeight;  // 이미지가 닿은 위치부터 브라우저의 높이를 뺌.
  const offset2 = imageTop - 200;

  image.animate(
    [
      { opacity: 0 },
      { opacity: 1 }
    ],
    {
      timeline: new ScrollTimeline({
        scrollOffsets: [
          new CSSUnitValue(offset1, 'px'),
          new CSSUnitValue(offset2, 'px')
        ]
      })
    }
  )
});
