# Spring Boot Handbook

컴퓨터관련 학과 학생이 Spring Boot를 처음 배울 때 필요한 핵심 개념을 정리한 정적 HTML 핸드북입니다.

## 구성

- `index.html`: 전체 문서와 예제 코드
- `styles.css`: 반응형 레이아웃, 가독성 중심 디자인, 요청 흐름 애니메이션
- `script.js`: 검색, 코드 복사, 읽은 위치 표시, 테마 전환
- `.github/workflows/pages.yml`: GitHub Pages 자동 배포
- `vercel.json`: Vercel 정적 배포 설정

## 로컬 실행

정적 파일만 사용하므로 `index.html`을 바로 열어도 됩니다.

```bash
npx serve .
```

## 배포

GitHub에 push하면 GitHub Pages 워크플로가 실행됩니다. Vercel에서는 이 저장소를 Import하거나 Vercel CLI로 배포할 수 있습니다.
