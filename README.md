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
