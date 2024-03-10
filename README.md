# Web Animation Study
inflearn에서 다음 강의를 보고 정리한 저장소이다.  
> https://www.inflearn.com/course/%EC%9B%B9-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-web-animation-api/dashboard

## 정리

### transition
`transition`은 CSS 속성 값에 변화가 있을 때 이 변화가 한 번에 탁 일어나는 게 아니라 지정해준 일정 시간에 걸쳐서 서서히 변화가 일어나게 해주는 속성이다.  
일정한 애니메이션 진행이 아니라 변화를 주고 싶다면(예를 들어, 끝 부분에 좀 더 느려지게 한다던지) `transition-timing-function`을 사용하면 된다.  
일반적으로 `transition`값에는 `duration`을 지정할 수 있으며 `1s`, `2s`, `1000ms`와 같이 시간을 정의할 수 있다.  

`transition-property`는 어떤 속성에 대해서 변화를 줄 것인지를 정의할 수 있다(ex. scale, background-color, width, ...).  
주의해야 할 건, 모든 속성이 다 적용되는 게 아니라 값 자체가 숫자 값(width, opacity, ...)인 것들에 대해서 가능하다.

`transition-delay`은 지정한 값만큼 대기 후에 애니메이션이 시작된다.

`transition` 애니메이션을 적용할 때, 다음과 같이 적용한다고 치자.
```css
.foo {
    transition: 
        transform 1s cubic-bezier(0, 0.8, 0.92, 0.36),
        background 2s 1s linear;
}
```
그러면 `transform`은 1초에 걸쳐서 cubic-bezier로 변화가 일어나고, `background`는 2초에 걸쳐서 1초 대기 후에 linear로 변화가 일어난다.  
즉, `transform`이 먼저 변화가 일어나고, `background`는 `transform`이 끝난 후에 변화가 일어난다.

`transitioncancel` 이벤트는 중간에 취소됐을 때 발생되는 이벤트인데,  
대표적으로 `transition`이 지정된 객체가 사라졌을 때(대상 자체가 없어졌을 때), 취소가 된다.

### SVG File Animation
SVG 파일에 애니메이션을 적용할 때는 `img` 태그를 사용하면 안 된다.
SVG 파일안의 `svg` 태그를 넣어도 되지만 소스코드가 너무 길어지므로, `object` 태그를 사용하는 것이 좋다. 
`object` 태그를 사용하면, 요소 하나 하나를 객체로 인식하고 스크립트로 조절할 수 있다. 

SVG 파일 안에 HTML처럼 `script`도 작성할 수 있는데, `img`태그를 사용하면 단순 이미지로 취급되끼 떄문에 적용이 안 되고,  
`object` 태그로 선언했을 경우에는 `script`가 적용된다.

일반적인 HTML 태그의 `transition` 동작은 해당 요소의 중앙을 기준으로 동작하지만,  
SVG 파일의 `transition` 동작은 해당 요소의 좌측 상단을 기준으로 동작한다. 그래서, `transform-origin`을 사용해서 중앙을 기준으로 동작하게 할 수 있다.
이렇게 해야 타겟팅된 요소를 중심으로 동작하게 된다.
- `/section1-transition/02/images/key.svg - .key-blade 클래스 참조 - .key-btn.cls-1의 cx, cy를 기준으로 잡음.`

### CSS Animation
`transition`과 세트라는 느낌으로 보면 된다.  
`Web Animation API`라는 것은 `CSS Animation`을 자바스크립트로 컨트롤 할 수 있는 확장된 스펙이라고 보면 된다.

`transition`과 동일한 기능이 많이 있고,  
추가된 기능으로 다음의 기능을 설정할 수 있다.
- name
- direction(normal, reverse, alternate, alternate reverse)
- iteration-count(반복 횟수)
- play-state(running, paused)
- fill-mode(forwards, backwards, both) - 애니메이션의 시작점하고 종료점에 지정된 스타일을 종료되었을 때 어떤 걸로 지정할 것인지를 정함.

계략적인 흐름은 다음과 같이 설정할 수 있다.
1. 어떤 요소를 어디에 그릴지 계산의 과정(calculate, recalculate).
2. 레이아웃 구성
   1. 레이어 - transform, opacity(성능이 좋다.).
   2. 레이어 아닌 것들 - top, left, width, border, background, ...(움직일 때 계산을 계속 해줘야한다).
      1. top, left값들은 굳이 건드리지 말고 `translate`함수를 쓰면 된다.
3. 페인트 과정
4. CSS 애니메이션 구동
   1. 레이어는 성능이 좋음
   2. 레이어가 아닌 것들은 움직이려면 재계산해야되기 때문에 성능이 좀 떨어진다. 

성능이 떨어지더라도 극단적으로 쓰지말자가 아니라 알아서 결정한다.

### Web Animation API
`CSS Animation`을 자바스크립트로 제어할 수 있게 만들어진 스펙(웹 표준)이다.

기존의 자바스크립트 애니메이션은 `setInterval`, `window.requestAnimationFrame`같은 것을 이용해 CPU tick을 반복해 값을 바꿔서 애니메이션을 만들었었는데,  
`Web Animation API`은 `CSS Animation`을 기반으로 만들어진 것이기 때문에 메인 스레드를 점유 안하고 GPU를 쓸 수 있다. 그래서 성능이 좋다.

`CSS Animation`과 똑같은 options들을 가지지만, 이름이 바뀐 것들이 있다.
- easing - timing function = 애니메이션 재생 속도 조절(linear, ...).
- iterations - iteration-count = 반복 횟수
- fill - fill-mode = 재생된 후에 그대로 멈춰있을 건지 처음으로 돌아갈 건지.

`element.animate()`함수의 리턴 값은 Animation 객체다.  
`CSS Animation`에서는 %로 `key frame`을 조절했다면 `Web Animation API`에서는 `offset` 프로퍼티로 조절이 가능하다.

`CSS Animation`같은 경우는 자바스크립트에서 `transtionend` 이벤트나 `animationend` 이벤트를 바인딩해서 이벤트 리스너 함수에서 처리를 했어야 했는데,  
`Web Animation API`는 `Promise`로 제공해준다.

#### Group Effect
`GroupEffect`는 아직 정식 출시가 안 되었기에 외부 스크립트를 가져와야 한다. 현재는 Lv2 단계이다.  
다음의 cdn.js 홈페이지에서 검색 후 다운받았다.
- https://cdnjs.com/libraries/web-animations
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Web_Animations_API_Concepts#animation_effect

애니메이션 생성자(`new Animation`)를 호출할 때 `KeyframeEffect`객체를 넣어줬던 것처럼,  
`KeyframeEffect`객체를 여러개 생성 후, `GroupEffect` 생성자에 파라미터로 넣으면 된다.  
`GroupEffect`객체를 만든 후, 실행 방법은 `document`의 `timeline` 프로퍼티의 `play`메서드를 호출하면된다.  
`play`메서드의 파라미터에 `GroupEffect`객체를 넣으면 된다.

#### Sequence Effect
`SequenceEffect`는 아직 정식 출시가 안 되었기에 외부 스크립트를 가져와야 한다. 현재는 Lv2 단계이다.  
해당 스펙도 아직 출시가 안 되었기에 위 `GroupEffect`처럼 외부 스크립트를 적용하면 된다(같은 파일이다).

해당 기능은 애니메이션을 순차적으로 실행한다는 뜻이다(하나가 끝나면 그 다음것이 이어서 실행).
