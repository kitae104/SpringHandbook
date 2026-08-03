# Spring Boot Handbook

컴퓨터관련 학과 학생이 Spring Boot를 처음 배울 때 필요한 핵심 개념을 정리한 정적 HTML 핸드북입니다.

## 구성

- `index.html`: 주제 목록, 검색, 학습 흐름
- `topics-data.js`: 주제별 설명, 어노테이션, 관련 설정, 예제 코드 데이터
- `scripts/generate-pages.js`: `topics-data.js`를 읽어 주제별 HTML 페이지 생성
- `topics/`: 생성된 주제별 블로그형 HTML 페이지
- `styles.css`: 반응형 레이아웃, 가독성 중심 디자인, 요청 흐름 애니메이션
- `script.js`: 홈 주제 렌더링, 검색, 코드 복사, 읽은 위치 표시, 테마 전환
- `.github/workflows/pages.yml`: GitHub Pages 자동 배포
- `vercel.json`: Vercel 정적 배포 설정

## 새 주제 추가

1. `topics-data.js`의 `SPRING_TOPICS` 배열에 기존 항목과 같은 형태로 주제 객체를 추가합니다.
2. 아래 명령으로 주제별 HTML 페이지를 다시 생성합니다.

```bash
npm run build
```

3. 변경 내용을 커밋하고 push하면 GitHub Pages에 자동 배포됩니다.

## 로컬 실행

주제별 페이지를 먼저 생성한 뒤 정적 서버를 실행합니다.

```bash
npm run build
npx serve .
```

## 배포

GitHub에 push하면 GitHub Pages 워크플로가 실행됩니다. Vercel에서는 이 저장소를 Import하거나 Vercel CLI로 배포할 수 있습니다.
