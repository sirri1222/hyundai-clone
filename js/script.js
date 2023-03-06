window.onload = function () {
  //  비디오 항목 체크 (video 태그로 파악)
  let videos = document.querySelectorAll(".swVisual video");
  // console.log(videos);
  //  비디오 시간 체크
  let videosTimeArr = [];
  for (let i = 0; i < videos.length; i++) {
    // console.log(videos[i].duration);
    // 시간을 보관한다.
    videosTimeArr[i] = Math.ceil(videos[i].duration);
  }
  // console.log(videosTimeArr);
  // 첫번째 비디오 자동 실행
  let videoIndex = 0;
  videos[videoIndex].play();

  // Visual Slide
  let swVisual = new Swiper(".swVisual", {
    loop: true,
  });
  // 슬라이드 변경 이벤트시 처리
  swVisual.on("slideChange", function () {
    // console.log("슬라이드 교체");
    // 진행중인 비디오 멈춤
    videos[videoIndex].pause();

    // 다음 화면에 보이는 swiper 슬라이드 번호
    // console.log(swVisual.activeIndex);
    // console.log(swVisual.realIndex);
    videoIndex = swVisual.realIndex;
    // 다음 비디오 재생
    // 처음으로 비디오 플레이헤드 이동
    videos[videoIndex].currentTime = 0;
    videos[videoIndex].play();

    // 방어코드: 다음주 추가 설명
    clearInterval(videoTimer);
    videoReset();
  });
  // 비디오 영상이 플레이가 끝나면 다음 슬라이드로 이동
  // 늘어나는 흰색 bar
  let bars = document.querySelectorAll(".bar");
  // console.log(bars);
  // 늘어나는 길이를 위한 값(최대 100)
  let barScaleW = 0;

  // 타이머를 생성한다.
  let videoTimer;
  function videoReset() {
    // 처음에는 0% 로 만들려고
    barScaleW = 0;
    // 최초에 bar 를 초기화 한다.
    for (let i = 0; i < bars.length; i++) {
      let tag = bars[i];
      tag.style.width = `${barScaleW}%`;
    }
    // 활성화 될 bar 클래스 선택
    let activeBar = bars[videoIndex];
    // console.log(activeBar);

    // 일단 타이머를 청소한다.
    // setTimeout  : 1번 실행 clearTimeout()
    // setInterval : 시간마다 연속 실행 clearInterva()
    clearInterval(videoTimer);
    // 비디오 플레이시간
    // console.log("시간 배열 videosTimeArr : ", videosTimeArr);
    // console.log("현재 번호 videoIndex : ", videoIndex);
    let videoTime = videosTimeArr[videoIndex];
    // console.log("선택된 시간 videoTime : ", videoTime);
    // console.log(videoTime);
    videoTimer = setInterval(() => {
      barScaleW++;
      // console.log(barScaleW);
      activeBar.style.width = `${barScaleW}%`;

      if (barScaleW >= 100) {
        swVisual.slideNext();
        clearInterval(videoTimer);
        videoReset();
      }
    }, videoTime * 10);
  }
  videoReset();
};