const TOPIC_PARTS = [
  {
    id: "part-1",
    title: "Part 1. Spring 기초",
    shortTitle: "기초",
    description: "IoC, DI, Bean, MVC처럼 Spring Boot를 이해하기 전에 잡아야 하는 핵심 개념",
    color: "#1f7a5f",
    tint: "#e8f4ef",
    deep: "#155f49",
  },
  {
    id: "part-2",
    title: "Part 2. API 계층 구조",
    shortTitle: "API",
    description: "Controller부터 Transaction까지 실제 백엔드 기능을 구성하는 계층과 데이터 흐름",
    color: "#2867b2",
    tint: "#e9f1fb",
    deep: "#1f4f88",
  },
  {
    id: "part-3",
    title: "Part 3. 인증과 보안",
    shortTitle: "보안",
    description: "Spring Security, JWT, 세션 기반 인증처럼 요청을 신뢰할 수 있게 만드는 흐름",
    color: "#b4472b",
    tint: "#faece7",
    deep: "#8c321d",
  },
  {
    id: "part-4",
    title: "Part 4. 실무 개발",
    shortTitle: "실무",
    description: "빌드, 설정, 문서화, 협업, 운영 로그처럼 팀 프로젝트에서 계속 만나는 도구",
    color: "#8a5a18",
    tint: "#f6efe1",
    deep: "#6d4510",
  },
  {
    id: "part-5",
    title: "Part 5. 확장과 운영",
    shortTitle: "확장",
    description: "AOP, Redis, Docker, CI/CD, Spring AI처럼 서비스 품질과 확장성을 높이는 주제",
    color: "#6f4aa8",
    tint: "#f0ecf8",
    deep: "#553782",
  },
];

function topic(data) {
  return {
    level: "핵심",
    readingTime: "약 8분",
    badge: "",
    keywords: [],
    flow: [
      ["문제 인식", "이 기술이 해결하는 코드의 복잡도나 운영 문제를 먼저 확인합니다."],
      ["Spring 연결점", "어노테이션, 설정 파일, 빈 등록 위치가 어떤 실행 흐름에 들어가는지 봅니다."],
      ["검증 포인트", "테스트, 로그, API 응답, DB 결과 중 무엇으로 동작을 확인할지 정합니다."],
    ],
    ...data,
  };
}

const SPRING_TOPICS = [
  topic({
    slug: "spring-framework",
    part: "part-1",
    number: "01",
    title: "Spring Framework",
    summary: "자바 애플리케이션에서 객체 생성, 의존성 연결, 웹 요청 처리, 데이터 접근을 체계적으로 맡아 주는 기반 프레임워크입니다.",
    body: [
      "Spring Framework는 애플리케이션 코드가 직접 객체를 만들고 연결하던 방식을 컨테이너 중심 구조로 바꿉니다. 개발자는 어떤 객체가 필요하고 어떤 책임을 가지는지 선언하고, Spring은 객체 생명주기와 의존성 연결을 관리합니다.",
      "Spring Boot를 배울 때도 핵심 동작은 Spring Framework 위에서 이뤄집니다. 자동 설정과 starter가 편의를 제공하지만, IoC, DI, Bean, AOP, MVC를 모르면 문제가 생겼을 때 원인을 추적하기 어렵습니다.",
      "실무에서는 프레임워크가 해 주는 일과 개발자가 명시해야 하는 일을 구분하는 감각이 중요합니다. 예를 들어 Bean 등록은 Spring이 해도, 계층의 책임과 트랜잭션 경계는 개발자가 설계해야 합니다.",
    ],
    flow: [
      ["컨테이너 시작", "ApplicationContext가 설정을 읽고 Bean 후보를 수집합니다."],
      ["객체 등록", "@Component, @Configuration, @Bean으로 정의된 객체가 BeanDefinition으로 관리됩니다."],
      ["요청 처리", "웹 요청, DB 접근, 보안 필터 같은 기능이 등록된 Bean들의 협력으로 실행됩니다."],
    ],
    annotations: [
      ["@Component", "Spring이 관리할 일반 컴포넌트를 등록합니다."],
      ["@Configuration", "Bean 등록 메서드를 포함하는 설정 클래스를 나타냅니다."],
      ["@Bean", "외부 라이브러리 객체처럼 직접 생성해야 하는 객체를 Spring Bean으로 등록합니다."],
    ],
    related: [
      ["build.gradle", "spring-boot-starter-web, spring-boot-starter-data-jpa 같은 starter 의존성을 확인합니다."],
      ["패키지 구조", "메인 클래스 하위 패키지에 컴포넌트가 있어야 기본 스캔 대상에 포함됩니다."],
      ["ApplicationContext", "Bean 조회, 생명주기, 이벤트 처리의 중심이 되는 컨테이너입니다."],
    ],
    exampleTitle: "Spring이 관리하는 서비스 객체",
    language: "java",
    code: `@Service
public class CourseService {
    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public CourseDetail findCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow(() -> new CourseNotFoundException(courseId));
        return CourseDetail.from(course);
    }
}`,
    lambdaDescription: "orElseThrow는 예외를 나중에 만들기 위한 Supplier를 받으므로, 익명 클래스 대신 람다 표현식으로 줄일 수 있습니다.",
    lambdaExample: `import java.util.function.Supplier;

// 익명 클래스로 작성한 경우
Course course = courseRepository.findById(courseId)
    .orElseThrow(new Supplier<CourseNotFoundException>() {
        @Override
        public CourseNotFoundException get() {
            return new CourseNotFoundException(courseId);
        }
    });

// 람다 표현식으로 변경
Course course = courseRepository.findById(courseId)
    .orElseThrow(() -> new CourseNotFoundException(courseId));`,
    watch: [
      "Spring Framework는 단순 라이브러리가 아니라 애플리케이션의 객체 흐름을 관리하는 런타임에 가깝습니다.",
      "자동 설정이 있다고 해서 설계 책임이 사라지는 것은 아닙니다. 계층 경계와 예외 정책은 프로젝트에서 정해야 합니다.",
      "Bean 등록 실패는 대부분 패키지 스캔 범위, 생성자 의존성 누락, 같은 타입 Bean 충돌에서 시작됩니다.",
    ],
  }),
  topic({
    slug: "spring-boot",
    part: "part-1",
    number: "02",
    title: "Spring Boot",
    summary: "Spring 프로젝트를 빠르게 실행하고 운영할 수 있도록 자동 설정, 내장 서버, starter 의존성, 실행 진입점을 제공하는 도구입니다.",
    body: [
      "Spring Boot는 복잡한 XML 설정과 WAS 배포 절차를 줄이고, main 메서드 실행만으로 웹 서버를 시작할 수 있게 합니다. 내장 Tomcat과 자동 설정 덕분에 작은 API부터 빠르게 만들 수 있습니다.",
      "하지만 Boot가 모든 결정을 대신하지는 않습니다. 클래스패스에 어떤 의존성이 있는지, application.yml에 어떤 값이 있는지, 사용자가 직접 등록한 Bean이 있는지에 따라 자동 설정 결과가 달라집니다.",
      "좋은 학습 순서는 starter로 빠르게 실행해 본 뒤, 자동으로 만들어진 MVC, Jackson, DataSource, JPA 설정이 어떤 조건에서 켜지는지 하나씩 추적하는 것입니다.",
    ],
    flow: [
      ["main 실행", "SpringApplication.run이 애플리케이션 컨텍스트 생성을 시작합니다."],
      ["자동 설정 평가", "클래스패스와 설정 값 조건에 맞는 AutoConfiguration이 적용됩니다."],
      ["웹 서버 시작", "내장 서버가 열리고 DispatcherServlet이 요청을 받을 준비를 합니다."],
    ],
    annotations: [
      ["@SpringBootApplication", "@SpringBootConfiguration, @EnableAutoConfiguration, @ComponentScan을 합친 시작 어노테이션입니다."],
      ["@SpringBootTest", "테스트에서 실제 Boot 애플리케이션 컨텍스트를 로딩합니다."],
      ["@ConfigurationProperties", "application.yml 값을 타입 안전한 설정 객체로 바인딩합니다."],
    ],
    related: [
      ["Application.java", "메인 클래스의 패키지가 컴포넌트 스캔 기준점이 됩니다."],
      ["application.yml", "포트, DB, 로그, 프로필, 외부 API 설정을 관리합니다."],
      ["build.gradle", "starter 의존성과 Java 버전을 확인합니다."],
    ],
    exampleTitle: "Boot 실행 진입점과 설정 바인딩",
    language: "java",
    code: `@SpringBootApplication
public class HandbookApplication {
    public static void main(String[] args) {
        SpringApplication.run(HandbookApplication.class, args);
    }
}

@ConfigurationProperties(prefix = "handbook.storage")
public record StorageProperties(String bucket, Duration timeout) {
}`,
    watch: [
      "메인 클래스가 너무 깊은 패키지에 있으면 일부 Bean이 스캔되지 않을 수 있습니다.",
      "자동 설정이 기대와 다를 때는 의존성, 프로필, 직접 등록한 Bean을 함께 확인해야 합니다.",
      "개발 환경에서 동작한 설정이 운영 환경에서도 같은 값으로 실행된다고 가정하면 안 됩니다.",
    ],
  }),
  topic({
    slug: "http",
    part: "part-1",
    number: "03",
    title: "HTTP",
    summary: "브라우저, 모바일 앱, 백엔드 서버가 요청과 응답을 주고받기 위해 사용하는 웹 통신 규칙입니다.",
    body: [
      "HTTP는 Spring Boot API의 입구입니다. URL은 어떤 자원을 다룰지, 메서드는 어떤 행동을 할지, 헤더와 본문은 요청의 부가 정보와 데이터를 전달합니다.",
      "처음에는 GET은 조회, POST는 생성, PUT/PATCH는 수정, DELETE는 삭제라는 기준으로 익히면 됩니다. 이후 멱등성, 캐시, 상태 코드, 인증 헤더까지 함께 보면 API 설계 품질이 올라갑니다.",
      "Spring MVC는 HTTP 요청을 자바 메서드 호출로 바꿔 줍니다. 이 변환 과정에서 경로 변수, 쿼리 파라미터, JSON 본문, 검증 오류가 모두 처리됩니다.",
    ],
    flow: [
      ["요청 수신", "클라이언트가 메서드, URL, 헤더, 본문을 포함해 서버에 요청합니다."],
      ["매핑 선택", "Spring MVC가 URL과 HTTP 메서드에 맞는 Controller 메서드를 찾습니다."],
      ["응답 반환", "반환 객체가 JSON으로 직렬화되고 상태 코드와 함께 전달됩니다."],
    ],
    annotations: [
      ["@GetMapping", "GET 요청을 Controller 메서드에 연결합니다."],
      ["@PostMapping", "POST 요청을 Controller 메서드에 연결합니다."],
      ["@RequestBody", "요청 본문의 JSON을 자바 객체로 변환합니다."],
      ["@PathVariable", "URL 경로 일부를 메서드 파라미터로 받습니다."],
    ],
    related: [
      ["Controller", "HTTP 요청을 가장 먼저 받는 애플리케이션 계층입니다."],
      ["CORS", "프론트엔드와 백엔드 주소가 다를 때 브라우저 정책을 조정합니다."],
      ["Swagger", "메서드, URL, 요청 본문, 응답 코드를 문서로 확인합니다."],
    ],
    exampleTitle: "HTTP 요청과 Controller 매핑",
    language: "java",
    code: `@RestController
@RequestMapping("/api/courses")
class CourseController {
    @GetMapping("/{courseId}")
    CourseResponse findCourse(@PathVariable Long courseId) {
        return courseService.findCourse(courseId);
    }

    @PostMapping
    ResponseEntity<CourseResponse> create(@RequestBody CourseCreateRequest request) {
        CourseResponse response = courseService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}`,
    watch: [
      "404는 URL 매핑 문제, 400은 요청 값 문제, 401과 403은 인증과 권한 문제, 500은 서버 내부 오류인 경우가 많습니다.",
      "GET 요청에 중요한 변경 작업을 넣으면 캐시와 재시도 상황에서 예상하지 못한 부작용이 생길 수 있습니다.",
      "상태 코드와 응답 본문을 함께 설계해야 프론트엔드에서 오류를 안정적으로 처리할 수 있습니다.",
    ],
  }),
  topic({
    slug: "rest-api",
    part: "part-1",
    number: "04",
    title: "REST API",
    summary: "자원을 URL로 표현하고 HTTP 메서드로 행동을 구분하는 API 설계 스타일입니다.",
    body: [
      "REST API는 함수 이름을 URL에 그대로 붙이는 방식이 아니라, 학생, 게시글, 주문 같은 자원을 중심으로 주소를 설계합니다. 행동은 GET, POST, PUT, PATCH, DELETE 같은 HTTP 메서드로 표현합니다.",
      "좋은 REST API는 프론트엔드와 백엔드가 서로 예측 가능한 규칙으로 협업하게 합니다. 같은 목록 조회라면 페이지, 정렬, 검색 조건을 쿼리 파라미터로 통일하고, 생성 결과는 201 Created처럼 명확한 상태 코드로 알려 줍니다.",
      "REST를 너무 이론적으로 완벽하게 지키는 것보다 팀이 일관되게 이해할 수 있는 URL, 상태 코드, 에러 응답 형식을 정하는 것이 중요합니다.",
    ],
    flow: [
      ["자원 식별", "API가 다루는 핵심 명사를 찾고 복수형 URL로 표현합니다."],
      ["행동 매핑", "조회, 생성, 수정, 삭제를 HTTP 메서드에 맞춥니다."],
      ["응답 규격화", "성공과 실패 응답의 상태 코드와 JSON 구조를 문서화합니다."],
    ],
    annotations: [
      ["@RestController", "View가 아니라 JSON 데이터를 반환하는 Controller입니다."],
      ["@RequestMapping", "공통 URL prefix와 공통 조건을 지정합니다."],
      ["@ResponseStatus", "성공 응답 상태 코드를 명시할 때 사용합니다."],
    ],
    related: [
      ["DTO", "요청 DTO와 응답 DTO를 분리해 API 스펙을 안정적으로 유지합니다."],
      ["Exception", "실패 응답을 일관된 JSON 구조로 설계합니다."],
      ["Swagger", "API 명세를 문서로 공개하고 직접 호출해 볼 수 있게 합니다."],
    ],
    exampleTitle: "게시글 REST API",
    language: "java",
    code: `@RestController
@RequestMapping("/api/posts")
class PostController {
    @GetMapping
    Page<PostSummary> list(@PageableDefault(size = 20) Pageable pageable) {
        return postService.list(pageable);
    }

    @PatchMapping("/{postId}")
    PostResponse updateTitle(
        @PathVariable Long postId,
        @RequestBody PostTitleUpdateRequest request
    ) {
        return postService.updateTitle(postId, request.title());
    }
}`,
    watch: [
      "URL에 /createPost, /deletePost처럼 동사를 과도하게 넣으면 HTTP 메서드의 의미가 흐려집니다.",
      "모든 성공 응답을 200으로만 보내면 생성, 삭제, 비동기 처리 상태를 구분하기 어렵습니다.",
      "API 버전과 응답 필드 변경 정책을 정하지 않으면 프론트엔드 배포와 백엔드 배포가 강하게 묶입니다.",
    ],
  }),
  topic({
    slug: "mvc",
    part: "part-1",
    number: "05",
    title: "MVC",
    summary: "Model, View, Controller로 책임을 나누는 구조이며 Spring MVC는 웹 요청 처리의 핵심 기반입니다.",
    body: [
      "MVC는 요청 처리 코드를 한 클래스에 몰아넣지 않기 위한 기본 구조입니다. Controller는 요청을 해석하고, Model은 화면 또는 응답에 필요한 데이터를 담고, View는 사용자에게 보여 줄 표현을 담당합니다.",
      "REST API 프로젝트에서는 서버 템플릿 View 대신 JSON 응답을 반환하는 경우가 많습니다. 그래도 URL 매핑, 파라미터 바인딩, 검증, 예외 처리 같은 Spring MVC 흐름은 그대로 사용됩니다.",
      "MVC를 이해하면 Controller가 어디까지 책임져야 하는지 판단할 수 있습니다. Controller가 비즈니스 규칙과 저장 로직을 직접 처리하기 시작하면 테스트와 변경이 어려워집니다.",
    ],
    annotations: [
      ["@Controller", "서버 템플릿 View 이름을 반환하는 전통적인 MVC Controller입니다."],
      ["@RestController", "@Controller와 @ResponseBody를 합친 API용 Controller입니다."],
      ["@ModelAttribute", "쿼리 파라미터나 form 데이터를 객체로 바인딩합니다."],
    ],
    related: [
      ["DispatcherServlet", "모든 웹 요청을 받아 적절한 Handler로 보내는 Spring MVC의 중심입니다."],
      ["templates", "Thymeleaf 같은 서버 렌더링 화면 파일을 둘 수 있습니다."],
      ["@WebMvcTest", "MVC 계층만 가볍게 테스트할 때 사용합니다."],
    ],
    exampleTitle: "REST API에서의 Spring MVC",
    language: "java",
    code: `@RestController
class CourseController {
    @GetMapping("/api/courses")
    List<CourseSummary> courses(@RequestParam(defaultValue = "spring") String keyword) {
        return courseService.search(keyword);
    }
}`,
    watch: [
      "Controller가 Service 역할까지 맡으면 HTTP 세부 사항과 비즈니스 규칙이 섞입니다.",
      "서버 렌더링 MVC와 REST API MVC는 응답 방식이 다르지만 요청 매핑 기반은 같습니다.",
      "파라미터 바인딩 실패와 검증 실패를 구분하면 오류 응답 설계가 쉬워집니다.",
    ],
  }),
  topic({
    slug: "ioc",
    part: "part-1",
    number: "06",
    title: "IoC",
    summary: "객체 생성과 연결의 제어권을 개발자 코드가 아니라 Spring 컨테이너가 갖는 구조입니다.",
    body: [
      "IoC는 Inversion of Control의 줄임말입니다. 일반 자바 코드에서는 필요한 객체를 new로 직접 만들지만, Spring에서는 컨테이너가 객체를 만들고 필요한 곳에 전달합니다.",
      "이 구조 덕분에 구현체 교체, 테스트 대역 사용, 설정 변경이 쉬워집니다. Service는 어떤 Repository 구현체가 들어오는지 몰라도 인터페이스에 의존해 동작할 수 있습니다.",
      "IoC를 이해해야 DI, Bean, 테스트 코드가 왜 그렇게 작성되는지 연결해서 볼 수 있습니다. 단순히 어노테이션을 붙이는 법보다 제어 흐름이 어디로 이동했는지 보는 것이 핵심입니다.",
    ],
    annotations: [
      ["@ComponentScan", "지정 패키지 아래의 컴포넌트를 찾아 Bean으로 등록합니다."],
      ["@SpringBootApplication", "기본 컴포넌트 스캔을 포함합니다."],
      ["ApplicationContext", "객체 생성과 의존성 연결을 관리하는 Spring 컨테이너입니다."],
    ],
    related: [
      ["패키지 위치", "컴포넌트가 스캔 범위 안에 있는지 확인합니다."],
      ["Bean 충돌", "같은 타입 Bean이 여러 개면 @Qualifier 또는 @Primary가 필요할 수 있습니다."],
      ["테스트 설정", "테스트에서 가짜 구현체를 주입해 제어 흐름을 바꿀 수 있습니다."],
    ],
    exampleTitle: "직접 생성 방식과 IoC 방식",
    language: "java",
    code: `// 직접 생성 방식
StudentRepository repository = new MemoryStudentRepository();
StudentService service = new StudentService(repository);

// Spring IoC 방식
@Service
class StudentService {
    private final StudentRepository repository;

    StudentService(StudentRepository repository) {
        this.repository = repository;
    }
}`,
    watch: [
      "IoC는 객체를 없애는 개념이 아니라 객체 생성과 연결 위치를 바꾸는 개념입니다.",
      "new로 직접 만든 객체는 Spring의 생명주기 관리와 DI 대상이 아닙니다.",
      "제어권이 컨테이너에 있으므로 설정 문제는 런타임 시작 시점에 드러나는 경우가 많습니다.",
    ],
  }),
  topic({
    slug: "di",
    part: "part-1",
    number: "07",
    title: "DI",
    summary: "필요한 의존 객체를 클래스 내부에서 직접 만들지 않고 외부에서 주입받는 방식입니다.",
    body: [
      "DI는 Dependency Injection의 줄임말입니다. Service가 Repository 구현체를 직접 만들지 않고 생성자를 통해 받으면 실제 DB Repository와 테스트용 Fake Repository를 쉽게 바꿀 수 있습니다.",
      "Spring Boot에서는 생성자 주입을 기본으로 권장합니다. 필수 의존성이 명확하고, final 필드로 불변성을 표현할 수 있으며, 테스트에서도 객체를 직접 조립하기 쉽습니다.",
      "DI는 단순히 @Autowired를 쓰는 기술이 아니라 의존 방향을 정리하는 설계 방법입니다. 고수준 정책은 구체 구현보다 인터페이스와 역할에 의존해야 변경에 강합니다.",
    ],
    annotations: [
      ["@Autowired", "의존성을 자동 주입합니다. 생성자가 하나라면 생략할 수 있습니다."],
      ["@Qualifier", "같은 타입 Bean이 여러 개일 때 이름으로 선택합니다."],
      ["@Primary", "같은 타입 Bean 중 기본으로 사용할 Bean을 지정합니다."],
    ],
    related: [
      ["Lombok", "@RequiredArgsConstructor로 final 필드 생성자를 줄일 수 있습니다."],
      ["테스트", "Mock 또는 Fake 구현체를 생성자로 넣어 단위 테스트를 작성합니다."],
      ["순환 참조", "서로를 필요로 하는 구조가 생기면 책임 분리를 먼저 검토합니다."],
    ],
    exampleTitle: "생성자 주입과 인터페이스 의존",
    language: "java",
    code: `public interface StudentRepository {
    Optional<Student> findById(Long id);
}

@Service
class StudentService {
    private final StudentRepository studentRepository;

    StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
}`,
    watch: [
      "필드 주입은 테스트와 불변성 측면에서 불리합니다.",
      "순환 참조가 생기면 DI 설정으로 억지 해결하기보다 설계 책임을 다시 나누는 편이 좋습니다.",
      "인터페이스를 남용하면 구조가 복잡해질 수 있으므로 실제 교체 가능성이 있는 의존성에 우선 적용합니다.",
    ],
  }),
  topic({
    slug: "bean",
    part: "part-1",
    number: "08",
    title: "Bean",
    summary: "Spring 컨테이너가 생성, 보관, 주입, 생명주기 관리를 담당하는 객체입니다.",
    body: [
      "Bean은 Spring이 관리하는 객체입니다. Controller, Service, Repository 같은 주요 구성 요소는 Bean으로 등록되어 서로 주입되고 요청 처리에 참여합니다.",
      "직접 작성한 클래스는 @Component 계열 어노테이션으로 등록하고, 외부 라이브러리 객체는 @Configuration 클래스의 @Bean 메서드로 등록하는 방식이 일반적입니다.",
      "Bean의 범위, 이름, 생성 시점, 초기화와 종료 콜백을 이해하면 설정 문제를 더 정확하게 추적할 수 있습니다. 대부분의 웹 애플리케이션 Bean은 singleton scope로 하나만 만들어져 공유됩니다.",
    ],
    annotations: [
      ["@Component", "일반 Bean 등록에 사용합니다."],
      ["@Service", "비즈니스 서비스 역할을 표현합니다."],
      ["@Repository", "데이터 접근 계층을 표현하고 예외 변환과도 관련됩니다."],
      ["@Bean", "메서드 반환 객체를 Bean으로 등록합니다."],
    ],
    related: [
      ["ApplicationContext", "Bean을 보관하고 찾아 주는 컨테이너입니다."],
      ["Bean 이름", "기본 이름은 클래스명의 첫 글자를 소문자로 바꾼 형태입니다."],
      ["Scope", "singleton, prototype, request 등 Bean 생성 범위를 결정합니다."],
    ],
    exampleTitle: "외부 라이브러리 객체 Bean 등록",
    language: "java",
    code: `@Configuration
class SecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}`,
    watch: [
      "new로 직접 만든 객체는 Spring Bean이 아니므로 DI와 생명주기 관리를 받지 않습니다.",
      "singleton Bean에 요청별 상태를 필드로 저장하면 동시성 문제가 생길 수 있습니다.",
      "같은 타입 Bean이 여러 개면 주입 대상이 모호해져 애플리케이션 시작이 실패할 수 있습니다.",
    ],
  }),
  topic({
    slug: "controller",
    part: "part-2",
    number: "09",
    title: "Controller",
    summary: "HTTP 요청을 받아 입력을 해석하고 Service를 호출한 뒤 응답 형태로 변환하는 API 진입 계층입니다.",
    body: [
      "Controller는 URL, HTTP 메서드, 요청 파라미터, 요청 본문을 애플리케이션 기능 호출로 연결합니다. 클라이언트와 가장 가까운 계층이므로 API 스펙의 모양이 이곳에서 드러납니다.",
      "좋은 Controller는 얇습니다. 인증된 사용자 정보, 요청 DTO, 경로 변수 같은 입력을 모아 Service에 전달하고, 결과를 응답 DTO와 상태 코드로 바꾸는 역할에 집중합니다.",
      "비즈니스 규칙, 트랜잭션, DB 조회 조건이 Controller에 누적되면 테스트가 어려워지고 API 변경과 정책 변경이 서로 영향을 줍니다.",
    ],
    flow: [
      ["요청 매핑", "URL과 HTTP 메서드에 맞는 Controller 메서드가 선택됩니다."],
      ["입력 변환", "PathVariable, RequestParam, RequestBody가 자바 값으로 변환됩니다."],
      ["응답 작성", "Service 결과가 DTO와 상태 코드로 반환됩니다."],
    ],
    annotations: [
      ["@RestController", "JSON 응답을 반환하는 Controller를 만듭니다."],
      ["@RequestMapping", "공통 URL prefix를 지정합니다."],
      ["@RequestParam", "쿼리 스트링 값을 파라미터로 받습니다."],
      ["@Valid", "요청 DTO 검증을 실행합니다."],
    ],
    related: [
      ["Service", "실제 비즈니스 판단과 트랜잭션 경계를 위임합니다."],
      ["DTO", "외부 요청과 응답 구조를 표현합니다."],
      ["ExceptionHandler", "Controller 주변에서 발생한 예외를 API 응답으로 바꿉니다."],
    ],
    exampleTitle: "얇은 Controller 예제",
    language: "java",
    code: `@RestController
@RequestMapping("/api/students")
class StudentController {
    private final StudentService studentService;

    @PostMapping
    ResponseEntity<StudentResponse> create(@Valid @RequestBody StudentCreateRequest request) {
        StudentResponse response = studentService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}`,
    watch: [
      "Controller에서 repository.save를 직접 호출하기 시작하면 계층 분리가 깨집니다.",
      "요청 검증 실패와 비즈니스 규칙 위반은 다른 오류로 다루는 것이 좋습니다.",
      "프론트엔드가 의존하는 응답 필드는 임의로 바꾸지 말고 DTO 버전 관리 관점에서 봐야 합니다.",
    ],
  }),
  topic({
    slug: "service",
    part: "part-2",
    number: "10",
    title: "Service",
    summary: "비즈니스 규칙을 실행하고 여러 Repository나 외부 API 호출을 하나의 유스케이스로 묶는 계층입니다.",
    body: [
      "Service는 애플리케이션이 실제로 해야 하는 일을 표현합니다. 학생을 등록한다, 주문을 결제한다, 게시글을 공개한다 같은 유스케이스가 이 계층에 놓입니다.",
      "Service는 트랜잭션 경계가 되는 경우가 많습니다. 여러 Entity를 조회하고 변경하는 작업이 하나의 성공 또는 실패 단위로 묶여야 하기 때문입니다.",
      "Controller는 HTTP를 알고, Repository는 저장 기술을 알지만, Service는 비즈니스 규칙을 중심으로 두 계층을 조율합니다. 이 역할이 분명하면 테스트도 자연스럽게 유스케이스 중심으로 작성됩니다.",
    ],
    annotations: [
      ["@Service", "비즈니스 서비스 Bean임을 나타냅니다."],
      ["@Transactional", "메서드 실행을 DB 트랜잭션으로 감쌉니다."],
      ["@RequiredArgsConstructor", "final 의존성 생성자를 Lombok으로 생성합니다."],
    ],
    related: [
      ["Repository", "영속 객체 조회와 저장을 맡깁니다."],
      ["Domain Model", "Entity 내부 메서드로 상태 변경 규칙을 옮길 수 있습니다."],
      ["테스트", "Repository를 Fake로 바꿔 유스케이스 규칙을 검증합니다."],
    ],
    exampleTitle: "유스케이스 중심 Service",
    language: "java",
    code: `@Service
@Transactional
class EnrollmentService {
    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public EnrollmentResponse enroll(Long courseId, Long studentId) {
        Course course = courseRepository.getById(courseId);
        Student student = studentRepository.getById(studentId);
        course.enroll(student);
        return EnrollmentResponse.from(course, student);
    }
}`,
    watch: [
      "Service가 너무 많은 일을 하면 유스케이스 단위로 클래스를 나누는 것이 낫습니다.",
      "단순 CRUD만 있는 예제에서도 검증, 권한, 트랜잭션 경계를 Service에서 다룰지 판단해야 합니다.",
      "외부 API 호출과 DB 변경을 같은 트랜잭션에 넣을 때는 실패 보상 전략을 별도로 고민해야 합니다.",
    ],
  }),
  topic({
    slug: "repository",
    part: "part-2",
    number: "11",
    title: "Repository",
    summary: "도메인 객체를 조회하고 저장하는 데이터 접근 계층이며, JPA에서는 인터페이스만으로 기본 쿼리를 만들 수 있습니다.",
    body: [
      "Repository는 DB 접근 세부 구현을 Service에서 분리합니다. Service는 저장소가 JPA인지, JDBC인지, 외부 API인지 알 필요 없이 필요한 데이터를 요청합니다.",
      "Spring Data JPA를 사용하면 JpaRepository를 상속한 인터페이스만으로 기본 CRUD와 페이징 메서드를 사용할 수 있습니다. 메서드 이름 기반 쿼리는 작은 조건에서는 편리하지만 복잡해지면 JPQL이나 Querydsl을 고려해야 합니다.",
      "Repository는 단순 데이터 접근 계층이지만 쿼리 성능과 트랜잭션 지연 로딩 문제의 시작점이기도 합니다. 어떤 연관을 함께 조회할지 명시하는 습관이 중요합니다.",
    ],
    annotations: [
      ["@Repository", "데이터 접근 계층 Bean을 표현합니다."],
      ["@Query", "직접 JPQL 또는 native query를 작성합니다."],
      ["@EntityGraph", "연관 객체를 함께 조회하도록 지정할 수 있습니다."],
    ],
    related: [
      ["JpaRepository", "기본 CRUD, 정렬, 페이징 기능을 제공합니다."],
      ["Transaction", "쓰기 작업과 지연 로딩은 트랜잭션 범위에 영향을 받습니다."],
      ["SQL 로그", "실제로 실행되는 쿼리를 확인해야 성능 문제를 찾을 수 있습니다."],
    ],
    exampleTitle: "Spring Data JPA Repository",
    language: "java",
    code: `public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findBySlug(String slug);

    @Query("select c from Course c where c.published = true order by c.createdAt desc")
    List<Course> findPublishedCourses(Pageable pageable);
}`,
    watch: [
      "메서드 이름 쿼리가 길어지면 읽기 어렵고 변경에 취약합니다.",
      "N+1 문제는 Repository 조회 방식과 Entity 연관 설정이 함께 만든 결과인 경우가 많습니다.",
      "Repository에서 DTO를 바로 조회할지 Entity를 조회할지는 화면 목적과 도메인 로직 위치를 보고 결정합니다.",
    ],
  }),
  topic({
    slug: "dto",
    part: "part-2",
    number: "12",
    title: "DTO",
    summary: "API 요청과 응답 데이터를 표현하는 객체로, 외부 계약과 내부 Entity 구조를 분리합니다.",
    body: [
      "DTO는 Data Transfer Object의 줄임말입니다. 클라이언트가 보내는 JSON과 서버가 반환하는 JSON 구조를 자바 타입으로 표현합니다.",
      "Entity를 그대로 응답하면 DB 구조와 API 계약이 강하게 묶이고, 민감한 필드가 노출될 위험이 있습니다. 요청 DTO와 응답 DTO를 분리하면 검증 규칙과 노출 필드를 명확히 제어할 수 있습니다.",
      "DTO는 단순히 필드를 복사하는 객체가 아니라 API의 언어입니다. 이름, nullable 여부, 값 범위, 날짜 포맷 같은 규칙을 명확히 담아야 합니다.",
    ],
    annotations: [
      ["record", "불변 DTO를 간결하게 정의할 수 있습니다."],
      ["@JsonProperty", "JSON 필드 이름을 명시적으로 지정합니다."],
      ["@Schema", "Swagger 문서에 필드 설명과 예시를 추가합니다."],
    ],
    related: [
      ["Validation", "요청 DTO에 입력 검증 규칙을 붙입니다."],
      ["Entity", "내부 저장 구조와 외부 응답 구조를 분리합니다."],
      ["Mapper", "Entity와 DTO 변환 책임을 정리합니다."],
    ],
    exampleTitle: "요청 DTO와 응답 DTO 분리",
    language: "java",
    code: `public record CourseCreateRequest(
    @NotBlank String title,
    @Size(max = 500) String description
) {
}

public record CourseResponse(
    Long id,
    String title,
    String description,
    boolean published
) {
    static CourseResponse from(Course course) {
        return new CourseResponse(course.getId(), course.getTitle(), course.getDescription(), course.isPublished());
    }
}`,
    watch: [
      "Entity를 요청 DTO로 사용하면 클라이언트가 수정하면 안 되는 필드까지 바인딩될 수 있습니다.",
      "응답 DTO는 화면 요구에 맞게 만들되, 너무 화면 하나에만 묶이면 재사용성이 떨어집니다.",
      "DTO 변환 코드가 여러 곳에 흩어지면 필드 추가 시 누락이 생기기 쉽습니다.",
    ],
  }),
  topic({
    slug: "entity",
    part: "part-2",
    number: "13",
    title: "Entity",
    summary: "DB 테이블과 매핑되는 도메인 객체이며 JPA가 영속성 컨텍스트에서 상태 변화를 추적합니다.",
    body: [
      "Entity는 단순한 테이블 모양 클래스가 아닙니다. JPA가 식별자와 필드 상태를 추적하고, 트랜잭션 커밋 시점에 변경 내용을 DB에 반영합니다.",
      "좋은 Entity는 상태 변경 규칙을 메서드로 표현합니다. 외부에서 setter로 아무 값이나 바꾸는 구조보다 enroll, publish, changeTitle 같은 의미 있는 메서드가 안정적입니다.",
      "연관관계, 지연 로딩, equals와 hashCode, 기본 생성자 같은 JPA 제약을 이해해야 예상하지 못한 쿼리와 상태 변경 문제를 줄일 수 있습니다.",
    ],
    annotations: [
      ["@Entity", "JPA가 관리하는 영속 객체로 등록합니다."],
      ["@Id", "Entity 식별자를 지정합니다."],
      ["@GeneratedValue", "식별자 생성 전략을 지정합니다."],
      ["@Column", "컬럼 제약과 이름을 지정합니다."],
    ],
    related: [
      ["Repository", "Entity를 조회하고 저장합니다."],
      ["Transaction", "변경 감지와 lazy loading은 트랜잭션 범위와 관련됩니다."],
      ["DDL", "컬럼 길이, null 허용 여부, 인덱스를 DB 관점에서 확인합니다."],
    ],
    exampleTitle: "규칙을 가진 Entity",
    language: "java",
    code: `@Entity
public class Course {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String title;

    private boolean published;

    protected Course() {
    }

    public void publish() {
        if (title == null || title.isBlank()) {
            throw new IllegalStateException("제목 없이 공개할 수 없습니다.");
        }
        this.published = true;
    }
}`,
    watch: [
      "무분별한 setter는 도메인 규칙을 우회하게 만듭니다.",
      "양방향 연관관계는 편리하지만 주인 개념과 동기화 메서드를 모르면 버그가 생기기 쉽습니다.",
      "Entity를 JSON으로 직접 반환하면 지연 로딩과 순환 참조 문제가 발생할 수 있습니다.",
    ],
  }),
  topic({
    slug: "jpa",
    part: "part-2",
    number: "14",
    title: "JPA",
    summary: "자바 객체와 관계형 DB 테이블을 매핑하고 영속성 컨텍스트를 통해 변경 감지, 지연 로딩, 트랜잭션 동작을 제공합니다.",
    body: [
      "JPA는 SQL을 완전히 숨기는 기술이 아니라 객체 중심으로 DB 접근 코드를 작성하게 돕는 표준입니다. Hibernate는 JPA 구현체로 많이 사용됩니다.",
      "핵심은 영속성 컨텍스트입니다. 같은 트랜잭션 안에서 조회한 Entity는 관리 상태가 되고, 필드 변경은 커밋 시점에 update SQL로 반영될 수 있습니다.",
      "JPA를 제대로 쓰려면 Entity 설계와 실제 SQL을 함께 봐야 합니다. 연관관계 fetch 전략, cascade, orphanRemoval, batch size는 성능과 데이터 무결성에 직접 영향을 줍니다.",
    ],
    annotations: [
      ["@ManyToOne", "다대일 연관관계를 매핑합니다."],
      ["@OneToMany", "일대다 연관관계를 매핑합니다."],
      ["@Transactional", "영속성 컨텍스트와 DB 트랜잭션 범위를 엮습니다."],
      ["@Modifying", "벌크 update/delete 쿼리에 사용합니다."],
    ],
    related: [
      ["EntityManager", "JPA의 핵심 API이며 영속성 컨텍스트를 다룹니다."],
      ["SQL 로그", "JPQL이 어떤 SQL로 바뀌는지 확인합니다."],
      ["Migration", "Entity 변경이 실제 DB 스키마와 맞는지 관리합니다."],
    ],
    exampleTitle: "지연 로딩을 고려한 조회",
    language: "java",
    code: `public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    @EntityGraph(attributePaths = {"student", "course"})
    List<Enrollment> findByCourseId(Long courseId);
}`,
    watch: [
      "JPA는 SQL을 몰라도 되는 기술이 아닙니다. SQL을 더 의식적으로 보게 만드는 기술입니다.",
      "LAZY 로딩은 기본 선택으로 좋지만 조회 시점과 트랜잭션 범위를 이해해야 합니다.",
      "벌크 쿼리는 영속성 컨텍스트의 Entity 상태와 DB 상태를 어긋나게 만들 수 있습니다.",
    ],
  }),
  topic({
    slug: "crud",
    part: "part-2",
    number: "15",
    title: "CRUD",
    summary: "Create, Read, Update, Delete의 기본 데이터 조작 흐름으로 대부분의 API 기능을 구성하는 출발점입니다.",
    body: [
      "CRUD는 단순해 보이지만 백엔드 구조를 익히기 가장 좋은 흐름입니다. 요청 DTO, 검증, Entity 생성, Repository 저장, 응답 DTO 변환이 한 번에 연결됩니다.",
      "조회는 페이징과 정렬, 생성은 중복 검증, 수정은 권한과 부분 업데이트, 삭제는 물리 삭제와 논리 삭제 여부를 고민해야 합니다.",
      "단순 예제에서 끝내지 말고 상태 코드, 오류 응답, 트랜잭션, 테스트까지 붙이면 실제 프로젝트에서 반복되는 패턴을 잡을 수 있습니다.",
    ],
    annotations: [
      ["@PostMapping", "생성 요청을 처리합니다."],
      ["@GetMapping", "조회 요청을 처리합니다."],
      ["@PatchMapping", "부분 수정 요청을 처리합니다."],
      ["@DeleteMapping", "삭제 요청을 처리합니다."],
    ],
    related: [
      ["DTO", "요청과 응답 구조를 분리합니다."],
      ["Validation", "생성 및 수정 입력을 검증합니다."],
      ["Transaction", "수정과 삭제의 일관성을 보장합니다."],
    ],
    exampleTitle: "게시글 제목 수정 흐름",
    language: "java",
    code: `@Transactional
public PostResponse updateTitle(Long postId, String title) {
    Post post = postRepository.findById(postId)
        .orElseThrow(() -> new PostNotFoundException(postId));
    post.changeTitle(title);
    return PostResponse.from(post);
}`,
    lambdaDescription: "Repository 조회 실패 시 예외를 만드는 Supplier는 람다 표현식으로 간결하게 작성할 수 있습니다.",
    lambdaExample: `import java.util.function.Supplier;

// 익명 클래스로 작성한 경우
Post post = postRepository.findById(postId)
    .orElseThrow(new Supplier<PostNotFoundException>() {
        @Override
        public PostNotFoundException get() {
            return new PostNotFoundException(postId);
        }
    });

// 람다 표현식으로 변경
Post post = postRepository.findById(postId)
    .orElseThrow(() -> new PostNotFoundException(postId));`,
    watch: [
      "수정 API에서 Entity를 새로 만들어 save하면 기존 연관관계나 영속 상태를 잃을 수 있습니다.",
      "삭제는 실제 delete와 deleted 플래그를 두는 논리 삭제 중 요구사항에 맞게 선택해야 합니다.",
      "목록 조회는 처음부터 페이징을 고려하지 않으면 데이터가 많아질 때 성능 문제가 생깁니다.",
    ],
  }),
  topic({
    slug: "validation",
    part: "part-2",
    number: "16",
    title: "Validation",
    summary: "클라이언트가 보낸 값이 API 규칙에 맞는지 확인하고 잘못된 입력을 일관된 오류 응답으로 바꾸는 과정입니다.",
    keywords: ["Validation", "Bean Validation", "@Valid", "@Validated", "DTO 검증", "입력 검증", "필드 오류"],
    body: [
      "Validation은 잘못된 값이 Service와 DB까지 들어가기 전에 차단하는 방어선입니다. 빈 문자열, 잘못된 이메일, 범위를 벗어난 숫자 같은 형식 오류는 요청 DTO에서 검증하는 것이 자연스럽습니다.",
      "비즈니스 규칙과 단순 입력 검증은 구분해야 합니다. 예를 들어 제목 길이는 DTO 검증으로 처리할 수 있지만, 이미 마감된 강좌에 등록할 수 없다는 규칙은 Service나 도메인 모델에서 판단하는 편이 낫습니다.",
      "검증 실패 응답은 프론트엔드가 필드별 메시지를 표시할 수 있도록 구조화하는 것이 좋습니다. field, code, message를 분리하면 화면별 문구 처리와 다국어 대응도 쉬워집니다.",
      "Controller 요청 검증에는 @Valid를, Service 메서드 파라미터 검증에는 @Validated를 사용할 수 있습니다. 다만 Service 검증은 프록시 기반으로 동작하므로 같은 클래스 내부 호출에서는 기대한 검증이 실행되지 않을 수 있습니다.",
    ],
    flow: [
      ["DTO 바인딩", "JSON 요청 본문이 요청 DTO로 변환됩니다."],
      ["Bean Validation 실행", "@Valid 또는 @Validated가 붙은 지점에서 제약 조건을 검사합니다."],
      ["오류 응답 변환", "BindingResult나 MethodArgumentNotValidException을 필드별 오류 JSON으로 바꿉니다."],
    ],
    annotations: [
      ["@Valid", "요청 DTO의 Bean Validation을 실행합니다."],
      ["@Validated", "Spring의 메서드 파라미터 검증과 validation group 적용에 사용합니다."],
      ["@NotBlank", "null, 빈 문자열, 공백만 있는 문자열을 막습니다."],
      ["@Size", "문자열, 컬렉션 길이 범위를 제한합니다."],
      ["@Email", "이메일 주소 형식인지 검증합니다."],
      ["@Pattern", "정규식 기반 형식을 검증합니다."],
    ],
    related: [
      ["DTO", "검증 어노테이션은 주로 요청 DTO에 둡니다."],
      ["Exception", "MethodArgumentNotValidException을 공통 오류 응답으로 바꿉니다."],
      ["Swagger", "검증 규칙을 API 문서에 반영합니다."],
      ["Testing", "MockMvc 테스트로 잘못된 요청이 400과 필드 오류를 반환하는지 확인합니다."],
    ],
    exampleTitle: "요청 DTO 검증",
    language: "java",
    code: `public record MemberSignupRequest(
    @Email String email,
    @NotBlank @Size(min = 8, max = 64) String password,
    @NotBlank @Size(max = 30) String nickname
) {
}

@RestControllerAdvice
class ValidationExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        List<FieldErrorResponse> fields = ex.getFieldErrors().stream()
            .map(error -> new FieldErrorResponse(error.getField(), error.getDefaultMessage()))
            .toList();
        return ResponseEntity.badRequest().body(new ErrorResponse("INVALID_REQUEST", fields));
    }
}`,
    watch: [
      "검증 어노테이션만으로 모든 비즈니스 규칙을 처리하려고 하면 코드가 어색해집니다.",
      "검증 실패 응답이 필드명과 메시지를 포함하지 않으면 프론트엔드에서 사용자에게 설명하기 어렵습니다.",
      "중첩 DTO나 List 내부 요소 검증에는 @Valid 위치를 신경 써야 합니다.",
      "정규식 검증은 복잡해질수록 읽기 어렵기 때문에 별도 Validator나 도메인 값 객체로 분리할지 검토합니다.",
    ],
  }),
  topic({
    slug: "exception",
    part: "part-2",
    number: "17",
    title: "Exception",
    summary: "예상 가능한 실패를 HTTP 상태 코드와 일관된 JSON 응답으로 변환해 API 사용자가 문제를 이해하게 합니다.",
    body: [
      "예외 처리는 서버 오류를 숨기는 작업이 아니라 실패를 계약으로 만드는 작업입니다. 없는 리소스, 권한 부족, 검증 실패, 중복 데이터 같은 상황은 각각 다른 상태 코드와 메시지를 가져야 합니다.",
      "@RestControllerAdvice를 사용하면 여러 Controller에서 발생한 예외를 한 곳에서 처리할 수 있습니다. 이렇게 하면 API 오류 응답 모양을 통일하고 중복 코드를 줄일 수 있습니다.",
      "로그에는 개발자가 원인을 추적할 정보가 필요하지만, 응답에는 사용자에게 보여도 되는 정보만 담아야 합니다. 내부 스택 트레이스나 SQL 오류를 그대로 노출하면 보안 문제가 됩니다.",
    ],
    annotations: [
      ["@RestControllerAdvice", "전역 예외 처리 클래스를 정의합니다."],
      ["@ExceptionHandler", "특정 예외 타입을 처리하는 메서드를 지정합니다."],
      ["ResponseEntity", "상태 코드와 응답 본문을 함께 반환합니다."],
    ],
    related: [
      ["ErrorResponse DTO", "code, message, details 같은 표준 오류 응답을 정의합니다."],
      ["Logging", "예외 원인과 요청 정보를 운영 로그에 남깁니다."],
      ["Validation", "검증 오류를 필드별 메시지로 변환합니다."],
    ],
    exampleTitle: "전역 예외 응답",
    language: "java",
    code: `@RestControllerAdvice
class ApiExceptionHandler {
    @ExceptionHandler(CourseNotFoundException.class)
    ResponseEntity<ErrorResponse> handleNotFound(CourseNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("COURSE_NOT_FOUND", ex.getMessage()));
    }
}

public record ErrorResponse(String code, String message) {
}`,
    watch: [
      "모든 예외를 500으로 처리하면 클라이언트가 복구 가능한 실패와 서버 장애를 구분할 수 없습니다.",
      "Exception 메시지에 민감한 내부 정보를 담으면 응답으로 노출될 수 있습니다.",
      "전역 예외 처리에서 너무 넓은 Exception을 먼저 잡으면 세부 예외 처리가 실행되지 않을 수 있습니다.",
    ],
  }),
  topic({
    slug: "transaction",
    part: "part-2",
    number: "18",
    title: "Transaction",
    summary: "여러 DB 작업을 하나의 성공 또는 실패 단위로 묶어 데이터 일관성을 지키는 기능입니다.",
    body: [
      "트랜잭션은 여러 변경 작업이 모두 성공하거나 모두 실패하도록 묶습니다. 수강 신청에서 정원 감소와 신청 내역 저장이 따로 성공하면 데이터가 어긋날 수 있으므로 하나의 트랜잭션이 필요합니다.",
      "Spring에서는 @Transactional을 주로 Service 메서드에 붙입니다. 프록시 기반으로 동작하므로 같은 클래스 내부 메서드 호출에서는 트랜잭션이 새로 적용되지 않는 점을 알아야 합니다.",
      "읽기 전용 조회에는 readOnly 옵션을 주고, 쓰기 작업에는 예외 발생 시 롤백 정책을 명확히 이해해야 합니다. 기본적으로 RuntimeException 계열은 롤백 대상입니다.",
    ],
    annotations: [
      ["@Transactional", "메서드를 트랜잭션 범위로 실행합니다."],
      ["readOnly", "조회 전용 트랜잭션 최적화 의도를 나타냅니다."],
      ["propagation", "기존 트랜잭션 참여 또는 새 트랜잭션 생성 방식을 정합니다."],
    ],
    related: [
      ["Service", "유스케이스 단위 트랜잭션 경계를 두기 좋습니다."],
      ["JPA", "변경 감지와 lazy loading이 트랜잭션 범위에 영향을 받습니다."],
      ["DB Lock", "동시 수정 문제는 트랜잭션과 락 전략을 함께 봐야 합니다."],
    ],
    exampleTitle: "수강 신청 트랜잭션",
    language: "java",
    code: `@Service
class EnrollmentService {
    @Transactional
    public void enroll(Long courseId, Long studentId) {
        Course course = courseRepository.findByIdForUpdate(courseId)
            .orElseThrow();
        Student student = studentRepository.getReferenceById(studentId);
        course.enroll(student);
        enrollmentRepository.save(new Enrollment(course, student));
    }
}`,
    watch: [
      "private 메서드나 같은 클래스 내부 호출에는 Spring 트랜잭션 프록시가 기대대로 적용되지 않습니다.",
      "checked exception은 기본 롤백 대상이 아니므로 rollbackFor 설정이 필요할 수 있습니다.",
      "트랜잭션을 너무 길게 잡으면 DB 연결과 락을 오래 점유해 처리량이 떨어집니다.",
    ],
  }),
  topic({
    slug: "spring-security",
    part: "part-3",
    number: "19",
    title: "Spring Security",
    summary: "인증, 인가, 보안 필터 체인, CSRF, 세션 정책을 제공하는 Spring의 보안 프레임워크입니다.",
    body: [
      "Spring Security는 요청이 Controller에 도달하기 전에 필터 체인에서 인증과 권한을 확인합니다. 사용자가 누구인지 확인하는 인증과, 어떤 기능을 사용할 수 있는지 판단하는 인가를 분리해서 생각해야 합니다.",
      "REST API에서는 form login과 서버 세션을 끄고 JWT 같은 토큰 기반 인증을 붙이는 경우가 많습니다. 이때도 핵심은 SecurityContext에 인증된 사용자 정보를 넣고 권한 규칙을 적용하는 것입니다.",
      "보안 설정은 동작하지 않을 때 디버깅이 어렵기 때문에 URL 매칭 순서, 필터 위치, 인증 실패와 권한 실패 응답을 명확히 관리해야 합니다.",
    ],
    annotations: [
      ["SecurityFilterChain", "요청 보안 정책을 구성하는 핵심 Bean입니다."],
      ["@PreAuthorize", "메서드 실행 전 권한 표현식을 검사합니다."],
      ["Authentication", "인증된 사용자와 권한 정보를 담습니다."],
      ["SecurityContextHolder", "현재 요청의 보안 컨텍스트를 조회합니다."],
    ],
    related: [
      ["JWT Filter", "토큰을 읽고 검증한 뒤 Authentication을 등록합니다."],
      ["ExceptionHandling", "401 인증 실패와 403 권한 실패 응답을 분리합니다."],
      ["CORS/CSRF", "브라우저 기반 요청 정책과 함께 설정해야 합니다."],
    ],
    exampleTitle: "REST API 보안 설정",
    language: "java",
    code: `@Bean
SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**", "/swagger-ui/**").permitAll()
            .anyRequest().authenticated())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}`,
    lambdaDescription: "Spring Security 설정 메서드는 함수형 인터페이스를 받으므로, 설정 객체를 람다 매개변수로 받아 필요한 정책만 이어서 지정할 수 있습니다.",
    lambdaExample: `// 세션 정책 설정을 람다로 작성
http.sessionManagement(session ->
    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

// 인가 규칙 설정을 람다로 작성
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/**", "/swagger-ui/**").permitAll()
    .anyRequest().authenticated());`,
    watch: [
      "401은 인증이 안 된 상태, 403은 인증은 됐지만 권한이 부족한 상태로 구분해야 합니다.",
      "URL 매칭 순서가 넓은 규칙부터 나오면 뒤의 세부 규칙이 적용되지 않을 수 있습니다.",
      "비밀번호 저장에는 반드시 단방향 해시를 사용하고 평문 로그를 남기면 안 됩니다.",
    ],
  }),
  topic({
    slug: "jwt",
    part: "part-3",
    number: "20",
    title: "JWT",
    summary: "서명된 JSON 토큰으로 사용자 식별 정보와 만료 시간을 담아 stateless 인증에 자주 사용하는 방식입니다.",
    body: [
      "JWT는 JSON Web Token의 줄임말로 header, payload, signature로 구성됩니다. 서버는 서명을 검증해 토큰이 위조되지 않았는지 확인하고 payload의 사용자 식별자와 권한을 읽습니다.",
      "JWT는 서버 세션 저장소 없이 인증 상태를 확인할 수 있어 확장에 유리하지만, 발급된 토큰을 즉시 폐기하기 어렵다는 단점이 있습니다. 그래서 access token 만료 시간을 짧게 두고 refresh token 전략을 함께 씁니다.",
      "토큰 payload는 암호화가 아니라 Base64URL 인코딩일 뿐입니다. 민감한 개인정보나 비밀번호 같은 값은 절대 넣으면 안 됩니다.",
    ],
    annotations: [
      ["Bearer Token", "Authorization 헤더에 Bearer 접두사와 함께 전달합니다."],
      ["Claims", "토큰 payload에 담긴 사용자 식별자, 권한, 만료 시간 같은 값입니다."],
      ["Signature", "서버의 비밀키 또는 개인키로 토큰 위조 여부를 검증합니다."],
    ],
    related: [
      ["Spring Security", "JWT 검증 결과를 Authentication으로 변환합니다."],
      ["Redis", "refresh token 저장 또는 블랙리스트 관리에 사용할 수 있습니다."],
      ["HTTPS", "토큰 탈취를 막기 위해 전송 구간 보안이 필수입니다."],
    ],
    exampleTitle: "JWT 인증 필터의 핵심 흐름",
    language: "java",
    code: `class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
        String token = resolveBearerToken(request);
        if (token != null && jwtProvider.validate(token)) {
            Authentication authentication = jwtProvider.toAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}`,
    watch: [
      "JWT payload는 누구나 디코딩할 수 있으므로 민감 정보를 넣으면 안 됩니다.",
      "만료 시간이 긴 access token은 탈취 시 피해 범위가 커집니다.",
      "서명 알고리즘과 키 관리 정책을 명확히 하지 않으면 위조 토큰 검증 문제가 생길 수 있습니다.",
    ],
  }),
  topic({
    slug: "session-vs-jwt",
    part: "part-3",
    number: "21",
    title: "Session vs JWT",
    summary: "서버가 인증 상태를 저장하는 세션 방식과 클라이언트가 서명된 토큰을 보관하는 JWT 방식을 비교합니다.",
    body: [
      "세션 방식은 서버가 로그인 상태를 저장하고 클라이언트는 session id만 쿠키로 들고 있습니다. 서버에서 강제 로그아웃이나 세션 만료를 즉시 제어하기 쉽습니다.",
      "JWT 방식은 토큰 자체에 인증 정보를 담고 서명으로 검증합니다. 서버 간 공유 저장소 없이 검증할 수 있어 수평 확장에 유리하지만 토큰 폐기와 탈취 대응을 별도로 설계해야 합니다.",
      "둘 중 하나가 항상 정답은 아닙니다. 웹 화면 중심 서비스, 모바일 앱, 외부 API, 마이크로서비스 여부에 따라 쿠키 세션, JWT, opaque token, 하이브리드 구조를 선택합니다.",
    ],
    annotations: [
      ["JSESSIONID", "Spring MVC 세션 기반 인증에서 자주 보는 세션 쿠키 이름입니다."],
      ["SessionCreationPolicy", "Spring Security에서 세션 생성 전략을 설정합니다."],
      ["Refresh Token", "짧은 access token을 재발급하기 위한 장기 토큰입니다."],
    ],
    related: [
      ["Cookie", "세션 방식에서 브라우저가 session id를 저장하는 매체입니다."],
      ["Redis", "여러 서버가 세션 또는 refresh token을 공유할 때 사용합니다."],
      ["CSRF", "쿠키 기반 인증에서는 CSRF 방어를 함께 고려해야 합니다."],
    ],
    exampleTitle: "JWT 기반 stateless 설정",
    language: "java",
    code: `http
    .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    .csrf(AbstractHttpConfigurer::disable)
    .authorizeHttpRequests(auth -> auth
        .requestMatchers("/api/auth/login").permitAll()
        .anyRequest().authenticated());`,
    lambdaDescription: "세션을 만들지 않는 정책과 요청별 인가 규칙은 람다 표현식으로 설정 객체를 받아 바로 지정할 수 있습니다.",
    lambdaExample: `// session 매개변수는 SessionManagementConfigurer를 설정하는 람다입니다.
http.sessionManagement(session ->
    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

// auth 매개변수는 URL별 인가 규칙을 설정하는 람다입니다.
http.authorizeHttpRequests(auth -> auth
    .requestMatchers("/api/auth/login").permitAll()
    .anyRequest().authenticated());`,
    watch: [
      "JWT를 localStorage에 저장하면 XSS 공격에 취약할 수 있습니다.",
      "쿠키 세션은 서버 저장소와 CSRF 정책을 함께 설계해야 합니다.",
      "로그아웃 요구사항이 강하면 토큰 블랙리스트나 refresh token 폐기 정책이 필요합니다.",
    ],
  }),
  topic({
    slug: "gradle",
    part: "part-4",
    number: "22",
    title: "Gradle",
    summary: "의존성 관리, 빌드, 테스트, 패키징을 자동화하는 JVM 프로젝트 빌드 도구입니다.",
    body: [
      "Gradle은 Spring Boot 프로젝트의 의존성, 플러그인, 테스트, jar 생성 과정을 관리합니다. starter를 추가하면 관련 라이브러리 묶음과 자동 설정 후보가 함께 들어옵니다.",
      "빌드 파일을 읽을 수 있어야 프로젝트가 어떤 기능을 사용하는지 빠르게 파악할 수 있습니다. web, validation, data-jpa, security, redis 같은 의존성은 코드 구조와 실행 동작에 직접 연결됩니다.",
      "팀 프로젝트에서는 로컬 IDE 실행뿐 아니라 CI에서 ./gradlew test 또는 ./gradlew build가 안정적으로 돌아가는지 확인하는 것이 중요합니다.",
    ],
    annotations: [
      ["plugins", "Java, Spring Boot, dependency-management 같은 빌드 기능을 켭니다."],
      ["dependencies", "컴파일, 런타임, 테스트 의존성을 선언합니다."],
      ["tasks", "test, bootJar 같은 빌드 작업을 설정합니다."],
    ],
    related: [
      ["build.gradle", "프로젝트 의존성과 플러그인 설정의 중심 파일입니다."],
      ["gradle wrapper", "팀원이 같은 Gradle 버전으로 빌드하게 합니다."],
      ["CI/CD", "자동 테스트와 빌드 명령으로 사용됩니다."],
    ],
    exampleTitle: "Spring Boot Gradle 의존성",
    language: "groovy",
    code: `plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.1.5'
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}`,
    watch: [
      "의존성 버전을 개별로 섞으면 Spring Boot BOM과 충돌할 수 있습니다.",
      "로컬 IDE 실행만 확인하고 Gradle build를 확인하지 않으면 CI에서 실패할 수 있습니다.",
      "testImplementation과 implementation 범위를 구분해야 불필요한 라이브러리가 운영 코드에 들어가지 않습니다.",
    ],
  }),
  topic({
    slug: "application-yml",
    part: "part-4",
    number: "23",
    title: "application.yml",
    summary: "서버 포트, DB 연결, 로그 레벨, 외부 API 키, 프로필별 값을 관리하는 Spring Boot 설정 파일입니다.",
    body: [
      "application.yml은 코드에 박아 넣기 어려운 실행 환경 값을 관리합니다. 같은 코드라도 local, test, prod 프로필에 따라 DB 주소, 로그 레벨, 외부 API endpoint가 달라질 수 있습니다.",
      "설정 값은 @Value로 바로 읽을 수도 있지만 관련 값이 많다면 @ConfigurationProperties로 묶는 편이 유지보수에 좋습니다. 타입 변환과 검증도 더 명확해집니다.",
      "민감한 값은 yml에 직접 커밋하지 말고 환경 변수나 secret 관리 도구로 주입해야 합니다.",
    ],
    annotations: [
      ["spring.profiles.active", "현재 활성화할 프로필을 지정합니다."],
      ["@Value", "단일 설정 값을 주입받습니다."],
      ["@ConfigurationProperties", "prefix 기준으로 설정 값을 객체에 바인딩합니다."],
    ],
    related: [
      ["환경 변수", "운영 secret과 배포 환경별 값을 주입합니다."],
      ["Logging", "패키지별 로그 레벨을 설정합니다."],
      ["DataSource", "DB 연결 URL, 사용자, 비밀번호를 설정합니다."],
    ],
    exampleTitle: "프로필별 설정 예제",
    language: "yaml",
    code: `spring:
  profiles:
    active: local
  datasource:
    url: jdbc:h2:mem:handbook
    username: sa
    password:

logging:
  level:
    org.hibernate.SQL: debug

handbook:
  upload:
    max-size: 10MB`,
    watch: [
      "들여쓰기가 틀리면 설정이 전혀 다른 위치에 들어갈 수 있습니다.",
      "운영 DB 비밀번호와 API key를 Git에 커밋하면 안 됩니다.",
      "프로필 우선순위를 모르면 로컬에서 본 값과 배포 환경의 값이 달라질 수 있습니다.",
    ],
  }),
  topic({
    slug: "lombok",
    part: "part-4",
    number: "24",
    title: "Lombok",
    summary: "Getter, 생성자, builder 같은 반복 코드를 어노테이션으로 줄여 주는 컴파일 타임 도구입니다.",
    body: [
      "Lombok은 자바에서 반복적으로 작성하는 getter, 생성자, toString, builder 코드를 줄여 줍니다. Spring 프로젝트에서는 @RequiredArgsConstructor를 사용해 final 의존성 생성자 코드를 줄이는 경우가 많습니다.",
      "편리하지만 무분별하게 쓰면 코드가 실제로 어떻게 생성되는지 보이지 않아 학습과 디버깅이 어려울 수 있습니다. 특히 Entity에 @Data를 붙이면 setter, equals, toString이 한꺼번에 생겨 예상하지 못한 문제가 생길 수 있습니다.",
      "DTO에는 record를 우선 고려하고, Entity에는 필요한 Lombok 어노테이션만 제한적으로 쓰는 편이 안전합니다.",
    ],
    annotations: [
      ["@Getter", "필드 getter를 생성합니다."],
      ["@RequiredArgsConstructor", "final 필드와 @NonNull 필드 생성자를 생성합니다."],
      ["@Builder", "객체 생성을 builder 패턴으로 작성하게 합니다."],
      ["@NoArgsConstructor", "기본 생성자를 생성합니다."],
    ],
    related: [
      ["IDE plugin", "IDE가 Lombok 생성 코드를 인식하려면 플러그인과 annotation processing 설정이 필요합니다."],
      ["Entity", "JPA Entity에는 Lombok 사용을 보수적으로 적용합니다."],
      ["DI", "생성자 주입 코드를 줄이는 데 자주 사용합니다."],
    ],
    exampleTitle: "Service 생성자 주입 줄이기",
    language: "java",
    code: `@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;
}`,
    watch: [
      "@Data는 getter, setter, equals, hashCode, toString을 모두 만들기 때문에 Entity에는 위험할 수 있습니다.",
      "toString이 양방향 연관관계를 따라가면 순환 호출 문제가 생길 수 있습니다.",
      "Lombok이 생성하는 코드를 이해하지 못하면 컴파일 오류 원인을 찾기 어렵습니다.",
    ],
  }),
  topic({
    slug: "sql",
    part: "part-4",
    number: "25",
    title: "SQL",
    summary: "관계형 DB에서 데이터를 조회하고 변경하는 언어이며 JPA를 쓰더라도 반드시 확인해야 하는 실행 결과입니다.",
    body: [
      "Spring Boot에서 JPA를 사용해도 실제 DB는 SQL로 동작합니다. JPQL, 메서드 이름 쿼리, Querydsl은 결국 SQL로 변환되어 실행됩니다.",
      "기본 SELECT, INSERT, UPDATE, DELETE뿐 아니라 JOIN, GROUP BY, INDEX, 실행 계획을 이해하면 성능 문제를 훨씬 빠르게 찾을 수 있습니다.",
      "API가 느릴 때는 자바 코드만 보지 말고 어떤 SQL이 몇 번 실행되는지 확인해야 합니다. N+1 문제, 불필요한 전체 조회, 인덱스 미사용이 흔한 원인입니다.",
    ],
    annotations: [
      ["SELECT", "데이터를 조회합니다."],
      ["JOIN", "여러 테이블의 관계를 묶어 조회합니다."],
      ["INDEX", "검색과 정렬 성능을 높이는 DB 구조입니다."],
      ["EXPLAIN", "쿼리 실행 계획을 확인합니다."],
    ],
    related: [
      ["JPA SQL 로그", "Hibernate가 만든 SQL을 확인합니다."],
      ["Repository", "쿼리 생성 위치를 찾습니다."],
      ["Migration", "스키마 변경을 코드와 함께 관리합니다."],
    ],
    exampleTitle: "목록 조회 SQL과 인덱스 관점",
    language: "sql",
    code: `select id, title, created_at
from post
where published = true
order by created_at desc
limit 20 offset 0;

create index idx_post_published_created_at
on post (published, created_at desc);`,
    watch: [
      "JPA를 쓴다고 SQL 이해가 필요 없어지는 것은 아닙니다.",
      "LIKE '%keyword%' 검색은 일반 인덱스를 활용하기 어려울 수 있습니다.",
      "페이징 offset이 커지면 성능이 떨어질 수 있어 keyset pagination을 고려합니다.",
    ],
  }),
  topic({
    slug: "pagination",
    part: "part-4",
    number: "26",
    title: "Pagination",
    summary: "많은 데이터를 한 번에 반환하지 않고 페이지 단위로 나눠 조회하는 API 설계 방식입니다.",
    body: [
      "Pagination은 목록 API에서 필수입니다. 전체 데이터를 한 번에 반환하면 응답 시간이 길어지고 메모리와 네트워크 비용이 커집니다.",
      "Spring Data는 Pageable과 Page를 제공해 page, size, sort 파라미터를 쉽게 처리합니다. 다만 Page는 전체 개수를 세는 count query를 실행할 수 있어 큰 테이블에서는 Slice나 커서 기반 페이지를 고려해야 합니다.",
      "정렬 기준은 반드시 안정적이어야 합니다. createdAt만으로 정렬하면 같은 시간 값이 있을 때 중복 또는 누락이 생길 수 있어 id를 보조 정렬로 함께 쓰는 것이 좋습니다.",
    ],
    annotations: [
      ["Pageable", "페이지 번호, 크기, 정렬 정보를 담습니다."],
      ["Page", "목록과 전체 개수 정보를 함께 제공합니다."],
      ["Slice", "다음 페이지 존재 여부 정도만 제공해 count 비용을 줄입니다."],
      ["@PageableDefault", "기본 페이지 크기와 정렬을 지정합니다."],
    ],
    related: [
      ["Repository", "Pageable 파라미터를 받는 조회 메서드를 작성합니다."],
      ["SQL", "limit, offset 또는 커서 조건으로 변환됩니다."],
      ["REST API", "목록 조회 응답 형식을 일관되게 설계합니다."],
    ],
    exampleTitle: "Spring Data 페이징 API",
    language: "java",
    code: `@GetMapping("/api/posts")
Page<PostSummary> posts(
    @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable
) {
    return postService.findPublishedPosts(pageable);
}`,
    watch: [
      "size 제한을 두지 않으면 클라이언트가 과도하게 큰 응답을 요청할 수 있습니다.",
      "Page의 count query가 큰 테이블에서 병목이 될 수 있습니다.",
      "정렬 기준이 불안정하면 페이지 이동 중 데이터 중복이나 누락이 생길 수 있습니다.",
    ],
  }),
  topic({
    slug: "logging",
    part: "part-4",
    number: "27",
    title: "Logging",
    summary: "애플리케이션 실행 중 발생한 이벤트와 오류를 기록해 디버깅과 운영 장애 분석을 가능하게 합니다.",
    body: [
      "로그는 println 대체물이 아니라 운영 중 시스템을 관찰하는 기본 수단입니다. 요청 id, 사용자 id, 핵심 파라미터, 처리 시간, 예외 원인을 적절히 남기면 장애 분석 시간이 크게 줄어듭니다.",
      "로그 레벨은 목적에 맞게 써야 합니다. debug는 개발 중 상세 정보, info는 정상 흐름의 주요 이벤트, warn은 복구 가능한 이상 징후, error는 즉시 확인해야 하는 실패에 사용합니다.",
      "민감 정보는 로그에 남기면 안 됩니다. 비밀번호, 토큰, 주민등록번호, 결제 정보는 마스킹하거나 기록하지 않는 정책이 필요합니다.",
    ],
    annotations: [
      ["LoggerFactory", "클래스별 logger를 생성합니다."],
      ["Slf4j", "로그 API 추상화로 다양한 구현체와 연결됩니다."],
      ["MDC", "요청 id 같은 컨텍스트 값을 로그 라인에 함께 남깁니다."],
    ],
    related: [
      ["application.yml", "패키지별 로그 레벨을 설정합니다."],
      ["Exception", "전역 예외 처리에서 오류 로그를 남깁니다."],
      ["Filter", "요청 시작과 종료 로그를 공통으로 기록할 수 있습니다."],
    ],
    exampleTitle: "Service 로그와 예외 로그",
    language: "java",
    code: `private static final Logger log = LoggerFactory.getLogger(CourseService.class);

public CourseResponse publish(Long courseId) {
    log.info("course publish requested. courseId={}", courseId);
    Course course = courseRepository.findById(courseId)
        .orElseThrow(() -> new CourseNotFoundException(courseId));
    course.publish();
    return CourseResponse.from(course);
}`,
    lambdaDescription: "예외 로그를 남기기 전에 조회 실패 예외를 준비하는 Supplier도 람다 표현식으로 표현할 수 있습니다.",
    lambdaExample: `import java.util.function.Supplier;

// 익명 클래스로 작성한 경우
Course course = courseRepository.findById(courseId)
    .orElseThrow(new Supplier<CourseNotFoundException>() {
        @Override
        public CourseNotFoundException get() {
            return new CourseNotFoundException(courseId);
        }
    });

// 람다 표현식으로 변경
Course course = courseRepository.findById(courseId)
    .orElseThrow(() -> new CourseNotFoundException(courseId));`,
    watch: [
      "문자열 결합으로 로그를 만들면 해당 로그 레벨이 꺼져 있어도 비용이 발생할 수 있습니다.",
      "토큰, 비밀번호, 개인정보를 로그에 남기면 보안 사고가 됩니다.",
      "error 로그를 너무 많이 남기면 실제 장애 신호가 묻힐 수 있습니다.",
    ],
  }),
  topic({
    slug: "swagger",
    part: "part-4",
    number: "28",
    title: "Swagger",
    summary: "API 명세를 웹 문서로 보여 주고 요청 예시와 응답 구조를 직접 확인할 수 있게 하는 문서화 도구입니다.",
    body: [
      "Swagger는 백엔드와 프론트엔드가 같은 API 계약을 보게 해 줍니다. URL, 메서드, 파라미터, 요청 JSON, 응답 JSON, 상태 코드를 한 화면에서 확인할 수 있습니다.",
      "Spring Boot에서는 springdoc-openapi를 많이 사용합니다. Controller와 DTO 어노테이션을 기반으로 문서가 자동 생성되지만, 설명과 예시를 직접 보강해야 실제 협업에 도움이 됩니다.",
      "문서는 코드와 함께 최신 상태를 유지해야 합니다. Swagger에 나온 응답과 실제 응답이 다르면 오히려 혼란이 커집니다.",
    ],
    annotations: [
      ["@Operation", "API 동작 설명을 추가합니다."],
      ["@Parameter", "파라미터 설명과 예시를 추가합니다."],
      ["@Schema", "DTO 필드 설명, 예시, 제약을 문서화합니다."],
      ["@ApiResponse", "상태 코드별 응답을 설명합니다."],
    ],
    related: [
      ["Controller", "API 문서의 주요 입력원이 됩니다."],
      ["DTO", "요청과 응답 스키마를 보여 줍니다."],
      ["Security", "인증 헤더를 Swagger UI에서 입력할 수 있게 설정합니다."],
    ],
    exampleTitle: "Swagger 설명을 붙인 API",
    language: "java",
    code: `@Operation(summary = "강좌 단건 조회", description = "공개된 강좌의 상세 정보를 조회합니다.")
@ApiResponse(responseCode = "200", description = "조회 성공")
@GetMapping("/api/courses/{courseId}")
CourseResponse findCourse(
    @Parameter(description = "강좌 ID", example = "10") @PathVariable Long courseId
) {
    return courseService.findCourse(courseId);
}`,
    watch: [
      "자동 생성만 믿으면 필드 의미와 오류 응답 설명이 부족한 문서가 됩니다.",
      "운영 환경에서 Swagger UI를 공개할지 여부는 보안 정책에 맞게 결정해야 합니다.",
      "인증이 필요한 API는 Swagger에서도 인증 헤더 설정 방법을 제공해야 테스트가 쉽습니다.",
    ],
  }),
  topic({
    slug: "git",
    part: "part-4",
    number: "29",
    title: "Git",
    summary: "코드 변경 이력을 관리하고 브랜치, 커밋, Pull Request로 협업 흐름을 만드는 버전 관리 도구입니다.",
    body: [
      "Git은 코드를 저장하는 도구를 넘어 변경 의도를 기록하는 협업 도구입니다. 어떤 파일이 왜 바뀌었는지 커밋 단위로 남기면 문제 발생 시 원인을 추적하기 쉽습니다.",
      "팀 프로젝트에서는 main 브랜치를 직접 수정하지 않고 기능 브랜치에서 작업한 뒤 Pull Request로 리뷰를 받는 흐름이 일반적입니다.",
      "좋은 커밋은 작고 의도가 분명합니다. 기능 추가, 버그 수정, 리팩터링, 스타일 변경을 한 커밋에 섞지 않는 것이 리뷰와 되돌리기에 유리합니다.",
    ],
    annotations: [
      ["branch", "작업 흐름을 분리합니다."],
      ["commit", "의미 있는 변경 단위를 기록합니다."],
      ["pull request", "변경 내용을 공유하고 리뷰받습니다."],
      ["merge", "검토된 변경을 기준 브랜치에 합칩니다."],
    ],
    related: [
      [".gitignore", "빌드 산출물과 비밀 파일을 이력에서 제외합니다."],
      ["CI/CD", "push와 pull request를 기준으로 자동 검증을 실행합니다."],
      ["README", "프로젝트 실행 방법과 협업 규칙을 문서화합니다."],
    ],
    exampleTitle: "기능 브랜치 작업 흐름",
    language: "bash",
    code: `git switch -c feature/course-api
git status
git add src/main/java
git commit -m "Add course create API"
git push origin feature/course-api`,
    watch: [
      "민감 정보가 들어간 파일을 커밋하면 삭제 커밋만으로는 완전히 해결되지 않을 수 있습니다.",
      "큰 변경을 한 커밋에 몰아넣으면 리뷰와 되돌리기가 어렵습니다.",
      "충돌 해결 시 상대 변경을 무심코 지우지 않도록 diff를 확인해야 합니다.",
    ],
  }),
  topic({
    slug: "cors",
    part: "part-4",
    number: "30",
    title: "CORS",
    summary: "브라우저가 다른 출처의 API를 호출할 때 서버가 허용 범위를 명시하도록 요구하는 보안 정책입니다.",
    body: [
      "CORS는 서버 간 통신 문제가 아니라 브라우저 보안 정책입니다. 프론트엔드 주소와 백엔드 주소의 scheme, host, port 중 하나라도 다르면 다른 출처로 판단됩니다.",
      "서버는 Access-Control-Allow-Origin, Allow-Methods, Allow-Headers 같은 응답 헤더로 어떤 출처와 메서드를 허용할지 알려 줍니다. 인증 쿠키를 쓴다면 credentials 설정도 함께 맞아야 합니다.",
      "Spring Security를 사용하면 MVC CORS 설정과 Security CORS 설정의 적용 위치를 함께 확인해야 합니다.",
    ],
    annotations: [
      ["@CrossOrigin", "Controller 또는 메서드 단위 CORS 허용을 설정합니다."],
      ["CorsConfiguration", "전역 CORS 정책을 코드로 구성합니다."],
      ["OPTIONS", "브라우저가 실제 요청 전 preflight 요청으로 보낼 수 있습니다."],
    ],
    related: [
      ["Spring Security", "보안 필터 체인에서 CORS 처리가 먼저 이뤄져야 할 수 있습니다."],
      ["Frontend URL", "개발과 운영 origin이 다르므로 프로필별 설정이 필요합니다."],
      ["Credentials", "쿠키 인증 사용 시 allowCredentials와 origin 설정을 엄격히 맞춥니다."],
    ],
    exampleTitle: "전역 CORS 설정",
    language: "java",
    code: `@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE", "OPTIONS"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}`,
    watch: [
      "CORS 오류는 브라우저에서만 보이는 경우가 많아 서버 로그에 남지 않을 수 있습니다.",
      "allowCredentials=true와 allowedOrigins=* 조합은 사용할 수 없습니다.",
      "개발 편의로 넓게 연 CORS 설정을 운영에 그대로 가져가면 보안 위험이 커집니다.",
    ],
  }),
  topic({
    slug: "testing",
    part: "part-4",
    number: "31",
    title: "Testing",
    summary: "단위 테스트, 슬라이스 테스트, 통합 테스트로 Spring Boot 코드의 동작을 자동으로 검증하는 방법입니다.",
    keywords: ["Testing", "테스팅", "JUnit", "Mockito", "@SpringBootTest", "@WebMvcTest", "@DataJpaTest", "MockMvc", "테스트 코드"],
    body: [
      "테스팅은 코드가 지금 의도대로 동작하는지 확인하는 안전망입니다. 수동으로 Postman을 눌러 보는 것만으로는 변경이 누적될 때 기존 기능이 깨졌는지 빠르게 알기 어렵습니다.",
      "Spring Boot 테스트는 목적에 따라 무게를 나눠야 합니다. 순수 자바 로직은 단위 테스트로 빠르게 확인하고, Controller는 @WebMvcTest와 MockMvc로 요청과 응답을 검증하며, Repository는 @DataJpaTest로 쿼리와 매핑을 확인합니다.",
      "@SpringBootTest는 실제 애플리케이션 컨텍스트를 넓게 로딩하므로 가장 강력하지만 느립니다. 모든 테스트를 통합 테스트로 만들기보다 실패 원인을 좁게 찾을 수 있는 테스트 피라미드를 유지하는 편이 좋습니다.",
    ],
    flow: [
      ["테스트 대상 선택", "Service 로직, Controller 계약, Repository 쿼리 중 무엇을 검증할지 먼저 정합니다."],
      ["격리 범위 결정", "mock, slice test, full context 중 가장 작은 범위로 시작합니다."],
      ["회귀 방지", "버그 수정이나 요구사항 변경마다 실패를 재현하는 테스트를 남깁니다."],
    ],
    annotations: [
      ["@SpringBootTest", "애플리케이션 컨텍스트를 넓게 로딩하는 통합 테스트에 사용합니다."],
      ["@WebMvcTest", "MVC 계층만 로딩해 Controller 요청과 응답을 검증합니다."],
      ["@DataJpaTest", "JPA Repository, Entity 매핑, 쿼리를 검증합니다."],
      ["@MockBean", "Spring 컨텍스트 안의 Bean을 테스트용 mock으로 교체합니다."],
      ["MockMvc", "HTTP 요청을 실제 서버 없이 Controller에 보내 검증합니다."],
    ],
    related: [
      ["JUnit 5", "테스트 실행, assertion, lifecycle을 담당합니다."],
      ["Mockito", "외부 의존성을 mock으로 대체하고 호출을 검증합니다."],
      ["Validation", "잘못된 요청이 400과 필드 오류를 반환하는지 테스트합니다."],
      ["CI/CD", "push와 pull request마다 테스트를 자동 실행합니다."],
    ],
    exampleTitle: "Controller Validation 테스트",
    language: "java",
    code: `@WebMvcTest(MemberController.class)
class MemberControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean MemberService memberService;

    @Test
    void signup_rejectsInvalidEmail() throws Exception {
        mockMvc.perform(post("/api/members")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {"email":"wrong","password":"12345678","nickname":"kim"}
                    """))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.code").value("INVALID_REQUEST"));
    }
}`,
    watch: [
      "테스트가 구현 세부 사항에 너무 묶이면 리팩터링할 때 실제 동작은 그대로인데 테스트만 대량으로 깨집니다.",
      "@SpringBootTest를 남발하면 테스트 시간이 길어져 CI에서 자주 실행하기 어려워집니다.",
      "mock이 지나치게 많으면 실제 Bean 조립, JPA 매핑, 트랜잭션 문제를 놓칠 수 있습니다.",
      "테스트 데이터는 각 테스트가 독립적으로 만들고 정리해야 실행 순서에 의존하지 않습니다.",
    ],
  }),
  topic({
    slug: "aop",
    part: "part-5",
    number: "32",
    title: "AOP",
    summary: "로깅, 트랜잭션, 권한 검사처럼 여러 곳에 반복되는 관심사를 핵심 로직과 분리하는 프로그래밍 방식입니다.",
    body: [
      "AOP는 Aspect Oriented Programming의 줄임말입니다. 서비스 메서드마다 반복되는 실행 시간 측정, 감사 로그, 권한 검사 같은 코드를 핵심 비즈니스 로직 밖으로 분리합니다.",
      "Spring AOP는 프록시 기반으로 동작합니다. Bean 메서드 호출 전후에 부가 동작을 끼워 넣기 때문에 public 메서드와 외부 Bean 호출 관계를 이해해야 합니다.",
      "AOP는 강력하지만 과하게 쓰면 코드 흐름이 보이지 않게 됩니다. 정말 여러 곳에 반복되고 정책으로 관리할 필요가 있는 관심사에 제한적으로 쓰는 것이 좋습니다.",
    ],
    annotations: [
      ["@Aspect", "부가 관심사를 담는 Aspect 클래스를 정의합니다."],
      ["@Around", "대상 메서드 실행 전후를 감싸 처리합니다."],
      ["@Pointcut", "AOP를 적용할 메서드 조건을 정의합니다."],
      ["ProceedingJoinPoint", "대상 메서드 실행을 제어합니다."],
    ],
    related: [
      ["Transaction", "@Transactional도 프록시 기반 AOP와 관련됩니다."],
      ["Logging", "공통 요청 로그나 실행 시간 측정에 사용할 수 있습니다."],
      ["Proxy", "같은 클래스 내부 호출에는 적용되지 않는 한계를 이해해야 합니다."],
    ],
    exampleTitle: "메서드 실행 시간 측정 Aspect",
    language: "java",
    code: `@Aspect
@Component
class PerformanceAspect {
    @Around("execution(* com.example.handbook..*Service.*(..))")
    Object measure(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            long elapsed = System.currentTimeMillis() - start;
            log.info("{} took {}ms", joinPoint.getSignature(), elapsed);
        }
    }
}`,
    watch: [
      "AOP가 적용되는 지점이 눈에 보이지 않으므로 디버깅 난도가 올라갈 수 있습니다.",
      "프록시 기반 AOP는 같은 클래스 내부 메서드 호출에 적용되지 않습니다.",
      "비즈니스 규칙 자체를 AOP로 숨기면 코드 이해가 어려워집니다.",
    ],
  }),
  topic({
    slug: "audit",
    part: "part-5",
    number: "33",
    title: "Audit",
    summary: "누가, 언제, 어떤 데이터를 변경했는지 추적해 운영 분석과 보안 대응에 활용하는 기록 체계입니다.",
    keywords: ["Audit", "감사 로그", "Auditing", "@CreatedDate", "@LastModifiedDate", "@CreatedBy", "@LastModifiedBy", "변경 이력"],
    body: [
      "Audit은 단순 로그보다 목적이 명확한 기록입니다. 사용자가 글을 수정했는지, 관리자가 권한을 바꿨는지, 결제 상태가 언제 변경됐는지처럼 나중에 설명해야 하는 변경 사실을 남깁니다.",
      "Spring Data JPA는 @CreatedDate, @LastModifiedDate, @CreatedBy, @LastModifiedBy 같은 auditing 어노테이션을 제공합니다. 공통 BaseEntity에 생성일과 수정일을 두면 대부분의 테이블에서 반복 코드를 줄일 수 있습니다.",
      "감사 로그에는 개인정보와 민감 정보가 섞이기 쉽습니다. 무엇을 남길지, 얼마나 보관할지, 누가 조회할 수 있는지 정책으로 정해야 운영과 보안 요구를 동시에 만족할 수 있습니다.",
    ],
    flow: [
      ["변경 지점 식별", "생성, 수정, 삭제, 권한 변경처럼 추적해야 할 업무 이벤트를 정합니다."],
      ["자동 필드 기록", "Entity 생성일, 수정일, 작성자, 수정자를 공통으로 채웁니다."],
      ["이벤트 로그 보관", "중요 업무 변경은 별도 audit table이나 event log로 상세 이력을 남깁니다."],
    ],
    annotations: [
      ["@EnableJpaAuditing", "Spring Data JPA auditing 기능을 활성화합니다."],
      ["@CreatedDate", "Entity 생성 시각을 자동으로 채웁니다."],
      ["@LastModifiedDate", "Entity 마지막 수정 시각을 자동으로 갱신합니다."],
      ["@CreatedBy", "생성한 사용자 식별자를 기록합니다."],
      ["AuditorAware", "현재 로그인한 사용자 정보를 auditing에 연결합니다."],
    ],
    related: [
      ["Entity", "BaseEntity로 공통 감사 필드를 상속할 수 있습니다."],
      ["Spring Security", "현재 인증 사용자 id를 AuditorAware에서 가져옵니다."],
      ["AOP", "중요 Service 메서드 실행 전후로 별도 감사 이벤트를 남길 수 있습니다."],
      ["Logging", "운영 로그와 감사 로그의 목적과 보관 정책을 구분합니다."],
    ],
    exampleTitle: "JPA Auditing 기본 구성",
    language: "java",
    code: `@EnableJpaAuditing
@SpringBootApplication
class HandbookApplication {
}

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
abstract class BaseEntity {
    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}

@Component
class LoginUserAuditorAware implements AuditorAware<Long> {
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }
        return Optional.of(((LoginUser) authentication.getPrincipal()).id());
    }
}`,
    watch: [
      "수정일만 있으면 어떤 필드가 어떻게 바뀌었는지는 알 수 없습니다. 중요한 변경은 별도 이력 테이블을 둡니다.",
      "비밀번호, 토큰, 주민번호 같은 민감 값은 감사 로그에도 원문으로 남기면 안 됩니다.",
      "물리 삭제를 하면 감사 추적이 끊길 수 있으므로 요구사항에 따라 논리 삭제와 보관 정책을 함께 검토합니다.",
      "서버 시간이 여러 대에서 다르면 기록 순서가 흔들릴 수 있어 DB 시간 또는 시간 동기화 정책을 확인합니다.",
    ],
  }),
  topic({
    slug: "filter-interceptor",
    part: "part-5",
    number: "34",
    title: "Filter와 Interceptor",
    summary: "요청이 Controller에 도달하기 전후에 공통 처리를 넣는 웹 계층 확장 지점입니다.",
    body: [
      "Filter는 Servlet 스펙 영역에서 동작하며 Spring MVC에 들어가기 전 요청을 처리합니다. 인증 토큰 파싱, CORS, 인코딩, 요청 로그 같은 작업에 쓰입니다.",
      "Interceptor는 Spring MVC의 HandlerMapping 이후, Controller 호출 전후에 동작합니다. 로그인 사용자 확인, 권한 검사, 요청 처리 시간 기록처럼 handler 정보를 활용하는 작업에 적합합니다.",
      "둘 다 공통 처리 지점이지만 실행 위치가 다릅니다. Security 필터 체인, DispatcherServlet, HandlerInterceptor의 순서를 머릿속에 그릴 수 있어야 디버깅이 쉬워집니다.",
    ],
    annotations: [
      ["Filter", "Servlet 요청과 응답을 감싸는 가장 앞단 공통 처리입니다."],
      ["OncePerRequestFilter", "요청당 한 번만 실행되는 Spring Filter 기반 클래스입니다."],
      ["HandlerInterceptor", "Controller 실행 전후를 가로채는 Spring MVC 인터페이스입니다."],
      ["WebMvcConfigurer", "Interceptor 등록에 사용합니다."],
    ],
    related: [
      ["Spring Security", "인증 필터는 보통 Security 필터 체인에 들어갑니다."],
      ["Logging", "요청 id와 처리 시간을 공통으로 기록할 수 있습니다."],
      ["CORS", "preflight 요청이 Controller까지 오기 전에 처리될 수 있습니다."],
    ],
    exampleTitle: "요청 로그 Filter",
    language: "java",
    code: `@Component
class RequestLogFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
        long start = System.currentTimeMillis();
        try {
            chain.doFilter(request, response);
        } finally {
            log.info("{} {} -> {} ({}ms)", request.getMethod(), request.getRequestURI(),
                response.getStatus(), System.currentTimeMillis() - start);
        }
    }
}`,
    watch: [
      "Filter에서 request body를 읽으면 Controller에서 다시 읽지 못하는 문제가 생길 수 있습니다.",
      "Interceptor는 Spring MVC 밖에서 처리되는 정적 리소스나 일부 오류 흐름에는 적용 방식이 다를 수 있습니다.",
      "Security 필터 순서를 잘못 잡으면 인증 정보가 필요한 시점에 아직 설정되지 않을 수 있습니다.",
    ],
  }),
  topic({
    slug: "redis",
    part: "part-5",
    number: "35",
    title: "Redis",
    summary: "메모리 기반 데이터 저장소로 캐시, 세션, refresh token, 분산 락 등에 자주 사용됩니다.",
    body: [
      "Redis는 빠른 읽기와 쓰기가 필요한 임시성 데이터에 강합니다. 반복 조회 결과를 캐싱하거나, refresh token을 저장하거나, 짧은 TTL이 있는 인증 코드를 저장하는 데 적합합니다.",
      "캐시는 DB 부하를 줄일 수 있지만 데이터 정합성 문제가 생길 수 있습니다. 어떤 키를 언제 만들고 언제 삭제할지 정책이 없으면 오래된 데이터를 반환할 수 있습니다.",
      "Redis를 단순 Map처럼 쓰기보다 TTL, eviction, 직렬화 방식, 장애 시 대체 동작을 함께 설계해야 운영에 안전합니다.",
    ],
    annotations: [
      ["RedisTemplate", "Redis 명령을 실행하는 Spring 추상화입니다."],
      ["@Cacheable", "메서드 결과를 캐시에 저장합니다."],
      ["@CacheEvict", "캐시를 제거합니다."],
      ["TTL", "키 만료 시간을 설정합니다."],
    ],
    related: [
      ["application.yml", "Redis host, port, timeout을 설정합니다."],
      ["Spring Security", "refresh token 또는 로그인 실패 횟수 관리에 사용할 수 있습니다."],
      ["Docker", "로컬 개발용 Redis 컨테이너를 띄울 수 있습니다."],
    ],
    exampleTitle: "인증 코드 저장",
    language: "java",
    code: `@Service
class VerificationCodeStore {
    private final StringRedisTemplate redisTemplate;

    public void save(String email, String code) {
        redisTemplate.opsForValue().set("verify:" + email, code, Duration.ofMinutes(5));
    }

    public boolean matches(String email, String code) {
        return code.equals(redisTemplate.opsForValue().get("verify:" + email));
    }
}`,
    watch: [
      "캐시 무효화 정책이 없으면 사용자는 오래된 데이터를 보게 됩니다.",
      "Redis 장애 시 API가 모두 실패할지, DB로 우회할지 정책을 정해야 합니다.",
      "객체 직렬화 포맷을 바꾸면 기존 캐시 값을 읽지 못할 수 있습니다.",
    ],
  }),
  topic({
    slug: "docker",
    part: "part-5",
    number: "36",
    title: "Docker",
    summary: "애플리케이션과 실행 환경을 이미지로 묶어 어디서나 비슷하게 실행할 수 있게 하는 컨테이너 도구입니다.",
    body: [
      "Docker는 로컬, 테스트, 운영 환경 차이를 줄이는 데 도움이 됩니다. Java 버전, OS 패키지, 실행 명령을 Dockerfile에 명시하면 같은 이미지를 여러 환경에서 실행할 수 있습니다.",
      "Spring Boot 앱은 보통 jar를 빌드한 뒤 JRE 이미지 위에서 실행합니다. 이미지 크기와 보안 업데이트를 고려해 빌드 단계와 실행 단계를 나누는 multi-stage build를 자주 사용합니다.",
      "DB, Redis 같은 의존 서비스는 docker compose로 함께 띄우면 팀원이 동일한 개발 환경을 빠르게 구성할 수 있습니다.",
    ],
    annotations: [
      ["Dockerfile", "이미지를 만드는 절차를 정의합니다."],
      ["docker compose", "여러 컨테이너를 하나의 개발 환경으로 실행합니다."],
      ["EXPOSE", "컨테이너가 사용하는 포트를 문서화합니다."],
      ["ENTRYPOINT", "컨테이너 시작 명령을 정의합니다."],
    ],
    related: [
      ["Gradle", "bootJar 산출물을 이미지에 포함합니다."],
      ["application.yml", "환경 변수로 프로필과 DB 주소를 주입합니다."],
      ["CI/CD", "이미지 빌드와 registry push를 자동화합니다."],
    ],
    exampleTitle: "Spring Boot multi-stage Dockerfile",
    language: "dockerfile",
    code: `FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY gradlew build.gradle settings.gradle ./
COPY gradle ./gradle
COPY src ./src
RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    watch: [
      "이미지에 application-prod.yml이나 secret 파일을 직접 넣으면 안 됩니다.",
      "컨테이너 내부 localhost는 호스트 머신의 localhost와 다릅니다.",
      "빌드 캐시를 고려하지 않은 Dockerfile은 CI 시간을 크게 늘릴 수 있습니다.",
    ],
  }),
  topic({
    slug: "ci-cd",
    part: "part-5",
    number: "37",
    title: "CI/CD",
    summary: "코드 변경 후 테스트, 빌드, 배포를 자동화해 변경 품질과 배포 속도를 높이는 개발 흐름입니다.",
    body: [
      "CI는 Continuous Integration으로, 코드가 push될 때 자동으로 테스트와 빌드를 실행해 문제를 빨리 찾는 과정입니다. CD는 검증된 산출물을 배포 가능한 상태로 만들거나 실제 배포까지 자동화합니다.",
      "학생 프로젝트에서도 GitHub Actions로 테스트를 자동 실행하면 main 브랜치 품질을 유지하기 쉬워집니다. 테스트 실패, 빌드 실패, 포맷 오류를 PR 단계에서 확인할 수 있습니다.",
      "배포 자동화에서는 secret 관리, 환경 변수, 롤백 전략이 중요합니다. 단순히 배포 명령을 자동으로 실행하는 것만으로는 안정적인 CD가 되지 않습니다.",
    ],
    annotations: [
      ["GitHub Actions", "GitHub 저장소 이벤트를 기준으로 workflow를 실행합니다."],
      ["workflow", ".github/workflows 아래 YAML 파일로 작성합니다."],
      ["secrets", "토큰, 비밀번호 같은 민감 값을 안전하게 저장합니다."],
      ["artifact", "빌드 결과물을 다음 단계에서 사용할 수 있게 보관합니다."],
    ],
    related: [
      ["Gradle", "CI에서 ./gradlew test 또는 ./gradlew build를 실행합니다."],
      ["Docker", "이미지 빌드와 push를 자동화할 수 있습니다."],
      ["Git", "pull request와 branch 보호 규칙으로 검증을 강제합니다."],
    ],
    exampleTitle: "Gradle 테스트 workflow",
    language: "yaml",
    code: `name: Java CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'
      - run: ./gradlew test`,
    watch: [
      "CI 실패를 무시하고 병합하면 main 브랜치가 불안정해집니다.",
      "secret 값을 로그에 출력하면 보안 사고로 이어질 수 있습니다.",
      "배포 자동화에는 실패 시 알림과 롤백 방법도 포함되어야 합니다.",
    ],
  }),
  topic({
    slug: "spring-boot-core-concepts",
    part: "part-1",
    number: "39",
    title: "Spring Boot 기본 개념 묶음",
    summary: "Spring Initializr, Starter, Auto Configuration, 내장 서버, 설정 파일, Profile처럼 Boot 프로젝트를 시작할 때 반복해서 만나는 기본 요소입니다.",
    keywords: ["Spring Initializr", "Starter", "Auto Configuration", "Convention over Configuration", "Embedded Server", "application.properties", "application.yml", "Profile"],
    body: [
      "Spring Boot 프로젝트를 처음 만들 때는 Spring Initializr로 기본 골격을 만들고, 필요한 starter를 선택해 의존성을 묶어서 가져옵니다. starter는 관련 라이브러리 조합을 미리 정리해 두었기 때문에 초반 설정량을 크게 줄입니다.",
      "Auto Configuration은 클래스패스, 설정 값, 사용자가 등록한 Bean을 조건으로 필요한 설정을 자동 적용합니다. 이것이 Convention over Configuration입니다. 관례에 맞게 두면 빠르게 동작하지만, 관례에서 벗어날 때는 어떤 조건이 자동 설정을 켜고 끄는지 확인해야 합니다.",
      "Boot는 내장 Tomcat 같은 Embedded Server를 포함해 JAR 실행만으로 웹 서버를 띄울 수 있습니다. 환경별 값은 application.properties 또는 application.yml에 두고, dev, prod 같은 Profile로 실행 환경을 나눕니다.",
    ],
    flow: [
      ["프로젝트 생성", "Spring Initializr에서 Java 버전, 빌드 도구, starter 의존성을 선택합니다."],
      ["자동 설정 적용", "Boot가 클래스패스와 설정 값을 보고 MVC, DataSource, JPA 같은 기본 Bean을 준비합니다."],
      ["환경별 실행", "Profile과 외부 설정으로 개발, 테스트, 운영 값을 분리해 같은 JAR를 다르게 실행합니다."],
    ],
    annotations: [
      ["@SpringBootApplication", "Boot 애플리케이션 시작점이며 자동 설정과 컴포넌트 스캔을 포함합니다."],
      ["@ConfigurationProperties", "application.yml 값을 타입이 있는 설정 객체로 묶습니다."],
      ["@Profile", "특정 Profile에서만 Bean이나 설정이 활성화되게 합니다."],
      ["SpringApplication.run", "ApplicationContext를 만들고 내장 서버까지 시작하는 진입점입니다."],
    ],
    related: [
      ["build.gradle", "starter 의존성과 Spring Boot plugin 버전을 확인합니다."],
      ["application.yml", "서버 포트, DB 연결, 로그 레벨, 외부 API 값을 둡니다."],
      ["application-dev.yml", "개발 환경 전용 값을 분리합니다."],
      ["application-prod.yml", "운영 환경 전용 값을 분리하되 secret 원문은 저장소에 올리지 않습니다."],
    ],
    exampleTitle: "Profile별 설정 분리",
    language: "yaml",
    code: `# application.yml
spring:
  profiles:
    active: local
server:
  port: 8080

---
spring:
  config:
    activate:
      on-profile: local
  datasource:
    url: jdbc:h2:mem:handbook

---
spring:
  config:
    activate:
      on-profile: prod
  datasource:
    url: \${DB_URL}`,
    watch: [
      "starter는 편의를 주지만 실제로 어떤 라이브러리가 들어오는지 의존성 트리를 확인해야 합니다.",
      "자동 설정이 예상과 다르면 조건에 맞는 Bean이 이미 있는지, 의존성이 빠졌는지, Profile이 맞는지 봐야 합니다.",
      "application-prod.yml에 비밀번호, 토큰, 개인 키 같은 secret을 직접 쓰면 안 됩니다.",
      "properties와 yml은 표현 방식만 다를 뿐 같은 설정 모델로 바인딩됩니다. 팀에서 한 방식을 정해 일관되게 쓰는 편이 좋습니다.",
    ],
  }),
  topic({
    slug: "spring-annotations",
    part: "part-1",
    number: "40",
    title: "주요 Spring 애너테이션",
    summary: "Spring Boot에서 객체 등록, 계층 구분, 의존성 선택, 설정 값 바인딩에 자주 쓰는 애너테이션을 용도별로 정리합니다.",
    keywords: ["@SpringBootApplication", "@Component", "@Controller", "@RestController", "@Service", "@Repository", "@Configuration", "@Bean", "@Autowired", "@Qualifier", "@Primary", "@Value", "@ConfigurationProperties"],
    body: [
      "Spring 애너테이션은 단순 표시가 아니라 컨테이너가 Bean을 찾고, 역할을 구분하고, 의존성을 연결하는 힌트입니다. @Component 계열은 스캔 대상으로 등록되고, @Configuration과 @Bean은 직접 생성해야 하는 객체를 등록합니다.",
      "Controller, Service, Repository는 모두 Bean 등록 기능을 갖지만 계층의 의미가 다릅니다. 코드를 읽는 사람이 책임을 빠르게 파악할 수 있도록 역할에 맞는 애너테이션을 붙이는 것이 중요합니다.",
      "의존성 후보가 여러 개일 때는 @Qualifier나 @Primary로 선택 기준을 줍니다. 설정 값은 간단한 값이면 @Value, 묶음 설정이면 @ConfigurationProperties를 사용하면 유지보수가 쉽습니다.",
    ],
    flow: [
      ["스캔", "@Component 계열 클래스가 컴포넌트 스캔으로 Bean 후보가 됩니다."],
      ["등록", "@Bean 메서드나 자동 설정이 외부 객체와 인프라 Bean을 컨테이너에 넣습니다."],
      ["주입", "생성자 파라미터 타입과 선택 규칙을 기준으로 필요한 Bean이 연결됩니다."],
    ],
    annotations: [
      ["@Component", "특정 계층 의미가 없는 일반 Bean을 등록합니다."],
      ["@Controller", "View 기반 MVC Controller를 나타냅니다."],
      ["@RestController", "JSON 응답을 반환하는 API Controller입니다."],
      ["@Service", "비즈니스 로직을 담당하는 서비스 계층 Bean입니다."],
      ["@Repository", "데이터 접근 계층이며 일부 예외 변환과 의미 구분에 도움을 줍니다."],
      ["@Configuration", "설정 클래스이며 @Bean 메서드를 담습니다."],
      ["@Autowired", "의존성을 자동 주입합니다. 생성자가 하나면 생략할 수 있습니다."],
      ["@Qualifier", "같은 타입 후보 중 특정 이름이나 qualifier를 선택합니다."],
      ["@Primary", "같은 타입 후보 중 기본 선택 Bean으로 지정합니다."],
    ],
    related: [
      ["IoC Container", "애너테이션을 해석해 BeanDefinition을 만들고 객체를 생성합니다."],
      ["ApplicationContext", "등록된 Bean을 보관하고 조회하는 중심 컨테이너입니다."],
      ["application.yml", "@Value와 @ConfigurationProperties의 원천 설정 파일입니다."],
      ["패키지 구조", "@SpringBootApplication 위치 아래가 기본 컴포넌트 스캔 범위입니다."],
    ],
    exampleTitle: "같은 타입 Bean 선택",
    language: "java",
    code: `public interface MessageSender {
    void send(String message);
}

@Component
@Primary
class EmailSender implements MessageSender {
    public void send(String message) {}
}

@Component
class SmsSender implements MessageSender {
    public void send(String message) {}
}

@Service
class NoticeService {
    private final MessageSender sender;

    NoticeService(@Qualifier("smsSender") MessageSender sender) {
        this.sender = sender;
    }
}`,
    watch: [
      "@Autowired 필드 주입은 테스트와 불변성 측면에서 불리하므로 생성자 주입을 권장합니다.",
      "@Service와 @Repository를 아무 곳에나 붙이면 계층 책임이 흐려집니다.",
      "@Value가 많아지면 설정 키가 흩어지므로 관련 값은 @ConfigurationProperties로 묶는 편이 좋습니다.",
      "같은 타입 Bean 충돌은 애플리케이션 시작 실패로 드러나는 경우가 많습니다.",
    ],
  }),
  topic({
    slug: "layered-architecture",
    part: "part-2",
    number: "41",
    title: "계층형 아키텍처",
    summary: "Controller, Service, Repository, Domain 계층을 나눠 HTTP 처리, 비즈니스 규칙, 데이터 접근 책임을 분리하는 구조입니다.",
    keywords: ["Controller Layer", "Service Layer", "Repository Layer", "Domain Layer", "Entity", "DTO", "VO", "DAO", "관심사의 분리", "책임 분리"],
    body: [
      "계층형 아키텍처는 요청 처리 코드를 한 곳에 몰아넣지 않고 관심사별로 나누는 방식입니다. Controller는 HTTP를 해석하고, Service는 유스케이스와 트랜잭션을 다루며, Repository는 저장소 접근을 담당합니다.",
      "Domain Layer는 Entity, VO, 도메인 규칙을 담습니다. DTO는 외부 요청과 응답 모양을 담당하므로 DB 구조와 API 구조가 강하게 묶이지 않게 합니다. DAO는 저장소 접근 객체라는 넓은 개념이고, Spring Data JPA에서는 Repository가 그 역할을 많이 대체합니다.",
      "책임 분리가 잘 되면 테스트 범위가 명확해지고 변경 영향이 줄어듭니다. 반대로 Controller가 검증, 비즈니스 규칙, DB 저장까지 모두 처리하면 작은 변경도 여러 문제로 번집니다.",
    ],
    flow: [
      ["Controller Layer", "URL, Method, Header, Body를 받아 요청 DTO로 변환하고 응답 상태를 결정합니다."],
      ["Service Layer", "비즈니스 규칙, 트랜잭션 경계, 여러 Repository 호출 순서를 조정합니다."],
      ["Repository와 Domain", "Entity 상태를 조회하고 변경하며 DB와 도메인 규칙의 경계를 유지합니다."],
    ],
    annotations: [
      ["@RestController", "API 진입점 계층을 나타냅니다."],
      ["@Service", "유스케이스와 비즈니스 규칙을 담는 Bean입니다."],
      ["@Repository", "저장소 접근 계층을 나타냅니다."],
      ["@Entity", "DB 테이블과 매핑되는 도메인 객체입니다."],
      ["@Transactional", "서비스 계층의 작업 단위를 트랜잭션으로 묶습니다."],
    ],
    related: [
      ["DTO", "Request DTO와 Response DTO를 분리해 API 스펙을 안정화합니다."],
      ["VO", "값 자체가 의미를 갖고 불변으로 다루는 객체입니다."],
      ["DAO", "저장소 접근 객체의 일반 용어입니다. JPA Repository와 역할이 겹칠 수 있습니다."],
      ["Separation of Concerns", "코드 변경 이유가 서로 다른 책임을 다른 계층에 둡니다."],
    ],
    exampleTitle: "요청이 계층을 통과하는 구조",
    language: "java",
    code: `@RestController
@RequestMapping("/api/orders")
class OrderController {
    @PostMapping
    ResponseEntity<OrderResponse> create(@Valid @RequestBody OrderCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.create(request));
    }
}

@Service
class OrderService {
    @Transactional
    OrderResponse create(OrderCreateRequest request) {
        Member member = memberRepository.getReferenceById(request.memberId());
        Order order = Order.create(member, request.items());
        return OrderResponse.from(orderRepository.save(order));
    }
}`,
    watch: [
      "Controller에서 Entity를 바로 반환하면 API 응답이 DB 구조에 묶입니다.",
      "Repository에 비즈니스 판단 로직이 들어가면 저장소 교체와 테스트가 어려워집니다.",
      "Service가 너무 커지면 유스케이스 단위로 나누거나 도메인 객체에 규칙을 옮길 필요가 있습니다.",
      "DTO, VO, Entity 이름이 비슷해도 변경 이유와 생명주기가 다릅니다.",
    ],
  }),
  topic({
    slug: "jpa-relationships",
    part: "part-2",
    number: "42",
    title: "JPA 연관관계와 매핑",
    summary: "1:1, 1:N, N:1, N:M 관계와 연관관계의 주인, Fetch Type, Cascade, Orphan Removal, N+1 문제를 정리합니다.",
    keywords: ["@OneToOne", "@OneToMany", "@ManyToOne", "@ManyToMany", "@JoinColumn", "연관관계의 주인", "Lazy Loading", "Eager Loading", "Cascade", "Orphan Removal", "N+1 Problem", "Fetch Join"],
    body: [
      "JPA 연관관계는 객체 참조와 DB 외래 키를 연결하는 규칙입니다. N:1 관계는 보통 다수 쪽 Entity가 외래 키를 가지므로 @ManyToOne과 @JoinColumn을 많이 사용합니다. 1:N 단방향은 외래 키 관리가 어색해질 수 있어 신중해야 합니다.",
      "양방향 관계에서는 외래 키를 실제로 변경하는 쪽이 연관관계의 주인입니다. 주인이 아닌 쪽 mappedBy는 조회 편의를 위한 반대편 참조입니다. 객체 양쪽을 모두 맞춰 주는 편의 메서드를 두면 메모리 상태와 DB 상태의 불일치를 줄일 수 있습니다.",
      "Fetch Type은 성능에 큰 영향을 줍니다. Lazy Loading은 필요한 시점에 조회하지만 N+1 문제가 생길 수 있고, Eager Loading은 불필요한 조인을 만들 수 있습니다. 목록 조회에서는 fetch join, EntityGraph, DTO 조회를 상황에 맞게 선택합니다.",
    ],
    flow: [
      ["관계 선택", "업무 규칙을 보고 1:1, 1:N, N:1, N:M 중 실제 DB 외래 키 구조를 정합니다."],
      ["주인 결정", "외래 키를 가진 Entity를 연관관계의 주인으로 두고 @JoinColumn을 명시합니다."],
      ["조회 전략 조정", "Lazy Loading을 기본으로 두고 필요한 화면에서 fetch join이나 DTO 조회로 N+1을 제어합니다."],
    ],
    annotations: [
      ["@Entity", "영속성 컨텍스트가 관리하는 JPA 객체입니다."],
      ["@Table", "매핑할 테이블 이름과 제약 조건을 지정합니다."],
      ["@Id", "Entity 식별자 필드입니다."],
      ["@GeneratedValue", "식별자 생성 전략을 지정합니다."],
      ["@Column", "컬럼 이름, 길이, nullable 같은 속성을 지정합니다."],
      ["@Enumerated", "enum 저장 방식을 지정합니다. 보통 EnumType.STRING을 권장합니다."],
      ["@Transient", "DB 컬럼으로 저장하지 않는 필드입니다."],
      ["@ManyToOne", "다수 Entity가 하나의 Entity를 참조하는 관계입니다."],
      ["@OneToMany", "하나의 Entity가 여러 Entity를 참조하는 관계입니다."],
      ["@JoinColumn", "외래 키 컬럼을 지정합니다."],
    ],
    related: [
      ["Persistence Context", "조회한 Entity를 같은 트랜잭션 안에서 1차 캐시와 변경 감지 대상으로 관리합니다."],
      ["EntityManager", "Entity 저장, 조회, 삭제, flush를 수행하는 JPA 핵심 API입니다."],
      ["Dirty Checking", "영속 상태 Entity 변경을 감지해 UPDATE SQL을 만듭니다."],
      ["영속 상태", "비영속, 영속, 준영속, 삭제 상태에 따라 변경 감지와 SQL 실행 여부가 달라집니다."],
    ],
    exampleTitle: "N:1과 1:N 양방향 매핑",
    language: "java",
    code: `@Entity
class Order {
    @Id @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    public void changeMember(Member member) {
        this.member = member;
        member.getOrders().add(this);
    }
}

@Entity
class Member {
    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();
}`,
    watch: [
      "@ManyToMany는 중간 테이블에 속성이 생기는 순간 다루기 어려워지므로 연결 Entity로 풀어내는 편이 좋습니다.",
      "CascadeType.REMOVE와 orphanRemoval은 삭제 전파 범위가 넓어 데이터 손실 위험이 있습니다.",
      "Lazy Loading은 트랜잭션 밖에서 접근하면 LazyInitializationException이 발생할 수 있습니다.",
      "N+1 문제는 코드 한 줄보다 실제 SQL 로그를 보고 확인해야 합니다.",
    ],
  }),
  topic({
    slug: "repository-query",
    part: "part-2",
    number: "43",
    title: "Repository와 Query",
    summary: "Spring Data JPA의 CRUD, Query Method, JPQL, Native Query, @Query, Pageable, Sort, Specification, QueryDSL 사용 기준입니다.",
    keywords: ["CRUD", "Query Method", "JPQL", "Native Query", "@Query", "Pagination", "Pageable", "Sort", "Specification", "QueryDSL", "JpaRepository"],
    body: [
      "Repository는 데이터 접근을 추상화합니다. JpaRepository를 상속하면 save, findById, findAll, delete 같은 기본 CRUD를 바로 사용할 수 있고, 메서드 이름만으로 간단한 조건 쿼리를 만들 수 있습니다.",
      "조건이 조금 복잡해지면 @Query로 JPQL을 명시하고, DB 전용 기능이 필요하면 Native Query를 사용할 수 있습니다. 다만 Native Query는 DB 종류에 묶이므로 이식성과 테스트 비용을 고려해야 합니다.",
      "동적 검색 조건이 많으면 Specification이나 QueryDSL을 검토합니다. 페이지 조회는 Pageable과 Sort를 받아 응답 데이터와 전체 개수를 함께 설계해야 프론트엔드에서 목록 화면을 안정적으로 만들 수 있습니다.",
    ],
    flow: [
      ["기본 CRUD", "JpaRepository의 기본 메서드로 단순 저장, 조회, 삭제를 처리합니다."],
      ["정적 조건", "Query Method나 @Query JPQL로 명확한 조회 조건을 표현합니다."],
      ["동적 조건과 목록", "Pageable, Sort, Specification, QueryDSL로 검색과 페이징 요구사항을 처리합니다."],
    ],
    annotations: [
      ["JpaRepository", "JPA 기반 Repository 기본 기능을 제공하는 인터페이스입니다."],
      ["@Query", "메서드에 JPQL 또는 Native SQL을 직접 지정합니다."],
      ["@Param", "@Query 안의 이름 있는 파라미터와 메서드 파라미터를 연결합니다."],
      ["Pageable", "page, size, sort 정보를 담는 페이징 요청 객체입니다."],
      ["Sort", "정렬 조건을 표현합니다."],
    ],
    related: [
      ["JPQL", "테이블이 아니라 Entity와 필드 이름을 기준으로 작성하는 객체 지향 쿼리입니다."],
      ["Native Query", "DB SQL을 그대로 작성합니다. DB 함수나 특수 쿼리에 유용합니다."],
      ["Pagination", "Page, Slice, List 중 필요한 응답 형태를 선택합니다."],
      ["QueryDSL", "타입 안전한 동적 쿼리를 코드로 조립할 때 자주 사용합니다."],
    ],
    exampleTitle: "Query Method와 JPQL",
    language: "java",
    code: `public interface CourseRepository extends JpaRepository<Course, Long> {
    Page<Course> findByTitleContaining(String keyword, Pageable pageable);

    @Query("""
        select c
        from Course c
        join fetch c.teacher
        where c.opened = true
        order by c.createdAt desc
        """)
    List<Course> findOpenedCoursesWithTeacher();
}`,
    watch: [
      "Query Method 이름이 너무 길어지면 읽기 어려우므로 @Query나 QueryDSL로 옮기는 편이 좋습니다.",
      "Page는 count query가 추가로 실행됩니다. 전체 개수가 필요 없는 화면은 Slice를 고려합니다.",
      "fetch join과 pagination을 함께 쓸 때 컬렉션 조인은 결과가 부풀 수 있어 주의해야 합니다.",
      "Native Query는 DB별 문법 차이 때문에 테스트 환경과 운영 DB가 다르면 깨질 수 있습니다.",
    ],
  }),
  topic({
    slug: "security-authentication-structure",
    part: "part-3",
    number: "44",
    title: "Spring Security 인증 구조",
    summary: "Login 요청이 Security Filter Chain, AuthenticationManager, UserDetailsService, JWT Filter를 거쳐 인증 객체가 되는 과정을 설명합니다.",
    keywords: ["Login", "UserDetails", "UserDetailsService", "Authentication", "AuthenticationManager", "AuthenticationProvider", "UsernamePasswordAuthenticationToken", "JWT Filter", "SecurityContextHolder"],
    body: [
      "Spring Security에서 인증은 사용자가 누구인지 확인하는 과정이고, 인가는 그 사용자가 무엇을 할 수 있는지 결정하는 과정입니다. 로그인 요청은 필터 체인을 통과하면서 Authentication 객체로 변환되고, AuthenticationManager가 실제 검증을 위임합니다.",
      "일반 폼 로그인이나 아이디/비밀번호 로그인에서는 UsernamePasswordAuthenticationToken이 인증 전후 상태를 표현합니다. AuthenticationProvider는 UserDetailsService로 사용자를 조회하고 PasswordEncoder로 비밀번호를 비교합니다.",
      "JWT 기반 API에서는 매 요청마다 Authorization Header의 Bearer Token을 JWT Filter가 읽고 검증한 뒤 SecurityContextHolder에 Authentication을 저장합니다. 이후 Controller나 Service는 Principal, Authentication, @AuthenticationPrincipal 등을 통해 로그인 사용자를 알 수 있습니다.",
    ],
    flow: [
      ["요청 진입", "Security Filter Chain이 Login 요청 또는 JWT가 포함된 API 요청을 먼저 가로챕니다."],
      ["인증 검증", "AuthenticationManager와 Provider가 사용자 조회, 비밀번호 비교, 토큰 검증을 수행합니다."],
      ["Context 저장", "검증된 Authentication이 SecurityContextHolder에 저장되어 인가 판단에 사용됩니다."],
    ],
    annotations: [
      ["SecurityFilterChain", "HTTP 보안 규칙과 필터 구성을 Bean으로 등록합니다."],
      ["UserDetailsService", "사용자 식별자로 UserDetails를 조회하는 서비스입니다."],
      ["PasswordEncoder", "비밀번호 해시와 비교를 담당합니다."],
      ["BCryptPasswordEncoder", "BCrypt 알고리즘으로 비밀번호를 안전하게 해시합니다."],
      ["AuthenticationProvider", "특정 인증 방식의 검증 로직을 담당합니다."],
    ],
    related: [
      ["Principal", "현재 인증된 사용자의 대표 정보입니다."],
      ["Role", "ROLE_ADMIN처럼 큰 권한 묶음을 표현합니다."],
      ["Authority", "개별 권한 문자열입니다. 인가 판단의 실제 단위로 쓰입니다."],
      ["Access Token", "짧게 살아 있는 API 접근 토큰입니다."],
      ["Refresh Token", "Access Token 재발급에 사용하는 긴 수명의 토큰입니다."],
    ],
    exampleTitle: "JWT 필터에서 인증 저장",
    language: "java",
    code: `class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
        String token = resolveBearerToken(request.getHeader(HttpHeaders.AUTHORIZATION));
        if (token != null && jwtTokenProvider.valid(token)) {
            Authentication authentication = jwtTokenProvider.toAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}`,
    watch: [
      "Authentication과 Authorization을 같은 개념으로 섞으면 401과 403 응답 설계가 흔들립니다.",
      "JWT를 localStorage에 저장하면 XSS에 노출될 수 있고, Cookie에 저장하면 CSRF 전략을 함께 봐야 합니다.",
      "SecurityContextHolder는 요청 처리 후 정리되어야 합니다. 필터 체인 밖에서 직접 다룰 때는 특히 주의해야 합니다.",
      "비밀번호는 BCrypt 같은 단방향 해시로 저장하고 원문 비교를 하면 안 됩니다.",
    ],
  }),
  topic({
    slug: "oop-solid",
    part: "part-1",
    number: "45",
    title: "OOP와 SOLID",
    summary: "객체, 클래스, 인터페이스, 캡슐화, 다형성, 결합도, 응집도와 SOLID 원칙을 Spring의 IoC, DI, DIP와 연결합니다.",
    keywords: ["OOP", "객체", "클래스", "인터페이스", "상속", "다형성", "추상화", "캡슐화", "의존성", "결합도", "응집도", "SOLID", "SRP", "OCP", "LSP", "ISP", "DIP"],
    body: [
      "객체지향 프로그래밍은 상태와 행동을 가진 객체들이 메시지를 주고받으며 문제를 해결하는 방식입니다. 클래스는 객체를 만들기 위한 설계도이고, 인터페이스는 구현체가 지켜야 하는 사용 계약입니다.",
      "좋은 객체지향 설계는 결합도를 낮추고 응집도를 높입니다. 캡슐화는 내부 변경을 숨기고, 추상화와 다형성은 구현체 교체를 가능하게 합니다. 이 기반 위에서 Spring의 DI가 실용적인 효과를 냅니다.",
      "SOLID 중 Spring과 가장 자주 연결되는 원칙은 DIP입니다. 상위 정책인 Service가 구체 Repository 구현이 아니라 인터페이스에 의존하고, 실제 구현체 연결은 IoC Container가 DI로 처리합니다. 즉 DIP는 설계 원칙, DI는 구현 기법, IoC는 제어 흐름의 구조라고 볼 수 있습니다.",
    ],
    flow: [
      ["DIP 설계", "상위 모듈이 구체 클래스가 아니라 인터페이스와 같은 추상화에 의존합니다."],
      ["DI 구현", "필요한 구현체를 생성자 파라미터로 외부에서 주입받습니다."],
      ["IoC 실행", "Spring 컨테이너가 객체 생성과 연결 제어권을 가져와 런타임에 조립합니다."],
    ],
    annotations: [
      ["SRP", "클래스는 변경 이유가 하나에 가깝도록 책임을 좁힙니다."],
      ["OCP", "기존 코드를 많이 고치지 않고 확장할 수 있게 설계합니다."],
      ["LSP", "하위 타입은 상위 타입을 기대하는 곳에서 문제없이 대체되어야 합니다."],
      ["ISP", "클라이언트가 쓰지 않는 메서드에 의존하지 않도록 인터페이스를 나눕니다."],
      ["DIP", "고수준 정책과 저수준 구현이 모두 추상화에 의존하게 합니다."],
    ],
    related: [
      ["Interface", "Service가 구현체를 직접 알지 않게 하는 추상화 경계입니다."],
      ["Constructor Injection", "필수 의존성을 명확히 하고 테스트 대역을 넣기 쉽게 합니다."],
      ["IoC Container", "DIP와 DI가 실제 애플리케이션에서 동작하도록 객체를 조립합니다."],
      ["Mock", "인터페이스에 의존하면 테스트에서 대체 객체를 쉽게 넣을 수 있습니다."],
    ],
    exampleTitle: "DIP, DI, IoC가 만나는 코드",
    language: "java",
    code: `public interface PaymentGateway {
    void pay(Money amount);
}

@Service
class OrderPaymentService {
    private final PaymentGateway paymentGateway;

    OrderPaymentService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    void pay(Order order) {
        paymentGateway.pay(order.totalPrice());
    }
}

@Component
class TossPaymentGateway implements PaymentGateway {
    public void pay(Money amount) {}
}`,
    watch: [
      "인터페이스를 무조건 만드는 것이 좋은 설계는 아닙니다. 교체 가능성이나 테스트 경계가 있을 때 효과가 큽니다.",
      "상속은 강한 결합을 만들 수 있으므로 재사용 목적이면 조합을 먼저 고려합니다.",
      "SRP는 파일을 작게 쪼개라는 뜻이 아니라 변경 이유를 분리하라는 뜻입니다.",
      "DIP를 지켜도 구현체 선택 기준이 불명확하면 Bean 충돌이나 설정 복잡도가 생깁니다.",
    ],
  }),
  topic({
    slug: "bean-lifecycle",
    part: "part-1",
    number: "46",
    title: "Spring Bean 생명주기",
    summary: "Bean 생성, 의존성 주입, 초기화, 사용, 소멸 흐름과 Singleton, Prototype scope, @PostConstruct, @PreDestroy를 정리합니다.",
    keywords: ["Bean Lifecycle", "Singleton", "Prototype", "@PostConstruct", "@PreDestroy", "Bean 생성", "Bean 초기화", "Bean 소멸", "Bean Scope"],
    body: [
      "Spring Bean은 컨테이너가 만들고 관리하는 객체입니다. 애플리케이션 시작 시 BeanDefinition을 기준으로 객체가 생성되고, 생성자 주입으로 의존성이 연결된 뒤 초기화 콜백이 실행됩니다.",
      "기본 scope는 Singleton입니다. 컨테이너 안에서 하나의 Bean 인스턴스를 공유하므로 상태를 필드에 저장할 때 동시성 문제를 조심해야 합니다. Prototype은 요청할 때마다 새 객체를 만들지만 소멸 콜백 관리 방식이 다릅니다.",
      "@PostConstruct는 의존성 주입이 끝난 뒤 초기화 작업에 사용하고, @PreDestroy는 컨테이너 종료 시 자원 정리에 사용합니다. DB 연결, 스레드 풀, 외부 클라이언트처럼 자원 생명주기가 있는 Bean은 종료 흐름까지 고려해야 합니다.",
    ],
    flow: [
      ["생성", "컨테이너가 생성자와 BeanDefinition을 보고 객체 인스턴스를 만듭니다."],
      ["초기화", "의존성 주입 후 @PostConstruct나 InitializingBean 같은 초기화 콜백을 실행합니다."],
      ["소멸", "컨테이너 종료 시 Singleton Bean의 @PreDestroy나 destroy callback을 실행합니다."],
    ],
    annotations: [
      ["@Scope", "singleton, prototype 같은 Bean scope를 지정합니다."],
      ["@PostConstruct", "Bean 초기화 시점에 실행할 메서드를 표시합니다."],
      ["@PreDestroy", "Bean 소멸 시점에 실행할 메서드를 표시합니다."],
      ["@Bean(initMethod)", "Bean 등록 메서드에서 초기화 메서드 이름을 지정할 수 있습니다."],
      ["@Bean(destroyMethod)", "Bean 종료 메서드 이름을 지정할 수 있습니다."],
    ],
    related: [
      ["Singleton", "Spring 기본 scope이며 하나의 Bean 인스턴스를 공유합니다."],
      ["Prototype", "조회할 때마다 새 Bean을 생성합니다."],
      ["ApplicationContext", "Bean 생명주기를 관리하는 컨테이너입니다."],
      ["Stateful Bean", "공유 Bean에 사용자별 상태를 두면 동시성 문제가 생길 수 있습니다."],
    ],
    exampleTitle: "초기화와 소멸 콜백",
    language: "java",
    code: `@Component
class ExternalApiClient {
    @PostConstruct
    void connect() {
        log.info("external api client ready");
    }

    @PreDestroy
    void close() {
        log.info("external api client closed");
    }
}

@Bean(destroyMethod = "shutdown")
ExecutorService taskExecutor() {
    return Executors.newFixedThreadPool(4);
}`,
    watch: [
      "Singleton Bean에 요청별 데이터를 필드로 저장하면 사용자 데이터가 섞일 수 있습니다.",
      "@PostConstruct에서 외부 API를 과도하게 호출하면 애플리케이션 시작이 느려지거나 실패할 수 있습니다.",
      "Prototype Bean은 컨테이너가 생성 이후 전체 소멸 과정을 끝까지 관리하지 않는다는 점을 알아야 합니다.",
      "초기화 로직이 복잡하면 설정 검증과 실제 연결 작업을 분리하는 편이 좋습니다.",
    ],
  }),
  topic({
    slug: "servlet-internals",
    part: "part-5",
    number: "47",
    title: "Servlet과 Spring MVC 내부 구조",
    summary: "Servlet, Servlet Container, Tomcat, DispatcherServlet, Filter, Interceptor, Listener, ArgumentResolver가 요청 처리에서 어디에 놓이는지 설명합니다.",
    keywords: ["Servlet", "Servlet Container", "Tomcat", "DispatcherServlet", "Filter", "Interceptor", "Listener", "Filter vs Interceptor", "ArgumentResolver"],
    body: [
      "Spring Boot 웹 애플리케이션은 내장 Tomcat 같은 Servlet Container 위에서 실행됩니다. 클라이언트 요청은 먼저 컨테이너에 도착하고, Filter Chain을 통과한 뒤 DispatcherServlet으로 들어갑니다.",
      "DispatcherServlet은 Front Controller Pattern의 구현입니다. 모든 Spring MVC 요청을 먼저 받아 HandlerMapping으로 Controller를 찾고, HandlerAdapter와 ArgumentResolver를 통해 메서드 파라미터를 준비한 뒤 호출합니다.",
      "Filter는 Servlet 영역이라 Spring MVC 앞단에서 동작하고, Interceptor는 HandlerMapping 이후 Controller 전후에 동작합니다. Listener는 컨테이너 이벤트나 세션 이벤트를 감지하는 데 쓰입니다. 위치 차이를 알아야 인증, CORS, 로그, 예외 처리 흐름을 디버깅할 수 있습니다.",
    ],
    flow: [
      ["Servlet Container", "Tomcat이 HTTP 연결을 받고 request와 response 객체를 만듭니다."],
      ["Filter Chain", "CORS, 인증 토큰, 인코딩, 요청 로그 같은 앞단 공통 처리를 수행합니다."],
      ["DispatcherServlet", "HandlerMapping, Interceptor, ArgumentResolver를 거쳐 Controller를 호출합니다."],
    ],
    annotations: [
      ["DispatcherServlet", "Spring MVC의 Front Controller입니다."],
      ["Filter", "Servlet 요청과 응답을 감싸는 표준 확장 지점입니다."],
      ["HandlerInterceptor", "Controller 호출 전후에 Spring MVC 맥락을 활용합니다."],
      ["HandlerMethodArgumentResolver", "Controller 메서드 파라미터를 커스텀 방식으로 해석합니다."],
      ["ServletContextListener", "ServletContext 시작과 종료 이벤트를 감지합니다."],
    ],
    related: [
      ["Tomcat", "Spring Boot 기본 웹 starter에서 자주 쓰는 내장 Servlet Container입니다."],
      ["Front Controller Pattern", "하나의 진입점이 공통 웹 처리를 중앙에서 담당하는 패턴입니다."],
      ["Filter vs Interceptor", "Filter는 MVC 이전, Interceptor는 Controller 매핑 이후에 가깝습니다."],
      ["ArgumentResolver", "@RequestParam, @PathVariable, @RequestBody, Pageable 같은 파라미터 해석과 연결됩니다."],
    ],
    exampleTitle: "커스텀 ArgumentResolver 등록",
    language: "java",
    code: `class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginUser.class);
    }

    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        return webRequest.getAttribute("loginUser", RequestAttributes.SCOPE_REQUEST);
    }
}

@Configuration
class WebConfig implements WebMvcConfigurer {
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginUserArgumentResolver());
    }
}`,
    watch: [
      "Filter에서 예외가 발생하면 @ControllerAdvice가 처리하지 못하는 흐름이 있을 수 있습니다.",
      "Interceptor는 Controller가 선택된 뒤 동작하므로 정적 리소스나 preflight 요청과의 관계를 확인해야 합니다.",
      "ArgumentResolver를 과하게 쓰면 Controller 파라미터가 어디서 만들어지는지 추적하기 어려워집니다.",
      "Tomcat 스레드가 블로킹 작업에 오래 묶이면 전체 요청 처리량이 떨어질 수 있습니다.",
    ],
  }),
  topic({
    slug: "frontend-integration",
    part: "part-4",
    number: "48",
    title: "프론트엔드 연동 개념",
    summary: "React 같은 SPA와 Spring Boot API를 연결할 때 필요한 AJAX, Axios, Fetch API, JSON, CORS, Cookie, Session, JWT, Authorization Header를 정리합니다.",
    keywords: ["SPA", "AJAX", "Axios", "Fetch API", "JSON", "CORS", "Same Origin Policy", "Cookie", "Session", "JWT", "LocalStorage", "Authorization Header"],
    body: [
      "React 같은 SPA는 화면 전환 대부분을 브라우저에서 처리하고, 필요한 데이터만 Spring Boot API에 AJAX 요청으로 가져옵니다. Fetch API나 Axios는 HTTP Method, Header, Body를 구성해 JSON으로 통신하는 클라이언트 도구입니다.",
      "프론트엔드와 백엔드의 도메인, 포트, 프로토콜이 다르면 Same Origin Policy 때문에 브라우저가 요청을 제한합니다. 이때 서버에서 CORS 정책을 정확히 열어야 합니다. 개발 중에는 localhost 포트 차이만으로도 다른 origin이 됩니다.",
      "인증 연동 방식은 Cookie 기반 Session과 Authorization Header의 Bearer JWT 방식으로 나눠 볼 수 있습니다. Cookie는 브라우저가 자동 전송하지만 CSRF와 SameSite 설정을 봐야 하고, JWT는 저장 위치와 만료, 재발급 흐름을 신중히 설계해야 합니다.",
    ],
    flow: [
      ["브라우저 요청", "SPA가 Fetch API나 Axios로 JSON 요청을 보냅니다."],
      ["브라우저 보안 정책", "Origin이 다르면 preflight와 CORS 응답 헤더를 확인합니다."],
      ["인증 정보 전달", "Cookie 또는 Authorization Header로 로그인 상태를 API에 전달합니다."],
    ],
    annotations: [
      ["@CrossOrigin", "간단한 CORS 허용을 Controller 단위로 지정합니다."],
      ["CorsConfigurationSource", "전역 CORS 정책을 세밀하게 구성합니다."],
      ["Authorization Header", "Bearer Token 같은 인증 정보를 전달하는 HTTP Header입니다."],
      ["Content-Type", "요청 본문 형식을 application/json처럼 명시합니다."],
      ["Set-Cookie", "서버가 브라우저에 Cookie 저장을 지시하는 응답 Header입니다."],
    ],
    related: [
      ["JSON", "프론트엔드와 백엔드가 주고받는 데이터 표현 형식입니다."],
      ["LocalStorage", "브라우저 저장소입니다. XSS 위험을 고려해야 합니다."],
      ["Session", "서버가 로그인 상태를 보관하고 브라우저는 세션 Cookie를 보냅니다."],
      ["JWT", "토큰 자체에 사용자 식별과 만료 정보를 담는 방식입니다."],
      ["CORS", "허용 origin, method, header, credentials를 명확히 맞춰야 합니다."],
    ],
    exampleTitle: "Axios 요청과 Spring CORS 설정",
    language: "java",
    code: `// React
axios.get("https://api.example.com/api/me", {
  headers: { Authorization: \`Bearer \${accessToken}\` }
});

// Spring Boot
@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("https://app.example.com"));
    config.setAllowedMethods(List.of("GET", "POST", "PATCH", "DELETE"));
    config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    config.setAllowCredentials(true);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", config);
    return source;
}`,
    watch: [
      "CORS 오류는 서버 로그에 Controller 호출 기록이 없을 수 있습니다. 브라우저 개발자 도구의 네트워크 탭을 봐야 합니다.",
      "allowedOrigins에 *를 쓰면서 credentials를 true로 둘 수 없습니다.",
      "JWT를 localStorage에 저장하면 XSS 공격에 노출될 수 있습니다.",
      "프론트엔드 요청 DTO와 백엔드 Request DTO 필드명이 다르면 400 또는 null 바인딩 문제가 생깁니다.",
    ],
  }),
  topic({
    slug: "deployment-runtime",
    part: "part-5",
    number: "49",
    title: "배포와 런타임",
    summary: "Spring Boot JAR 실행부터 JVM, Java Runtime, 환경 변수, Reverse Proxy, Nginx, HTTPS, Domain, Port, Process, systemd, Docker, CI/CD까지 배포 단계의 기본 개념입니다.",
    keywords: ["JAR 실행", "JVM", "Java Runtime", "Environment Variable", "Reverse Proxy", "Nginx", "HTTPS", "SSL/TLS", "Domain", "Port", "Process", "Service", "Linux", "systemd", "Docker", "CI/CD"],
    body: [
      "Spring Boot 애플리케이션은 보통 bootJar로 실행 가능한 JAR를 만들고, 서버의 Java Runtime 위에서 java -jar 명령으로 실행합니다. JVM 옵션, Profile, 환경 변수는 실행 시점에 주입해 같은 산출물을 여러 환경에서 사용할 수 있게 합니다.",
      "운영 서버에서는 애플리케이션이 직접 80 또는 443 포트를 열기보다 Nginx 같은 Reverse Proxy가 앞에서 HTTPS를 처리하고 내부 8080 포트의 Spring Boot로 요청을 넘기는 구성이 흔합니다. Domain은 DNS로 서버를 가리키고, SSL/TLS 인증서는 HTTPS 연결을 보호합니다.",
      "Linux에서는 프로세스를 수동으로 띄우기보다 systemd service로 등록해 재시작, 로그, 부팅 시 자동 실행을 관리합니다. Docker와 CI/CD를 사용하면 이미지 빌드, 배포, 롤백 절차를 더 일관되게 만들 수 있습니다.",
    ],
    flow: [
      ["빌드", "Gradle이나 Maven이 실행 가능한 JAR 또는 Docker 이미지를 만듭니다."],
      ["실행", "JVM이 환경 변수와 Profile을 읽고 Spring Boot 프로세스를 시작합니다."],
      ["외부 노출", "Nginx, Domain, HTTPS가 사용자 요청을 안전하게 애플리케이션 포트로 전달합니다."],
    ],
    annotations: [
      ["bootJar", "Spring Boot 실행 JAR를 만드는 Gradle 작업입니다."],
      ["java -jar", "JVM 위에서 Boot 애플리케이션 JAR를 실행하는 명령입니다."],
      ["SPRING_PROFILES_ACTIVE", "실행 Profile을 환경 변수로 지정할 때 자주 사용합니다."],
      ["Nginx", "정적 파일 제공, HTTPS 종료, reverse proxy 역할을 수행할 수 있습니다."],
      ["systemd", "Linux에서 프로세스를 service로 관리하는 표준 도구입니다."],
    ],
    related: [
      ["Environment Variable", "DB URL, secret, profile처럼 환경마다 달라지는 값을 외부에서 주입합니다."],
      ["Port", "프로세스가 요청을 받는 네트워크 번호입니다. 8080, 80, 443을 자주 만납니다."],
      ["SSL/TLS", "HTTPS 암호화와 서버 신뢰를 담당합니다."],
      ["Docker", "애플리케이션과 런타임을 이미지로 묶어 배포합니다."],
      ["CI/CD", "테스트, 빌드, 배포 절차를 자동화합니다."],
    ],
    exampleTitle: "JAR 실행과 systemd 서비스",
    language: "ini",
    code: `[Unit]
Description=Spring Boot Handbook API
After=network.target

[Service]
User=spring
Environment=SPRING_PROFILES_ACTIVE=prod
Environment=DB_URL=jdbc:postgresql://db.internal:5432/handbook
ExecStart=/usr/bin/java -jar /opt/handbook/app.jar
Restart=always

[Install]
WantedBy=multi-user.target`,
    watch: [
      "운영 secret을 Git 저장소나 JAR 내부에 포함하면 안 됩니다.",
      "서버 방화벽, 클라우드 보안 그룹, 애플리케이션 포트 설정이 서로 맞지 않으면 외부 접속이 실패합니다.",
      "HTTPS 인증서 만료와 갱신 자동화는 배포 후에도 계속 관리해야 합니다.",
      "프로세스가 죽었을 때 누가 재시작하는지, 로그는 어디에 남는지 배포 전에 정해야 합니다.",
    ],
  }),
  topic({
    slug: "spring-ai",
    part: "part-5",
    number: "38",
    title: "Spring AI",
    summary: "Spring 애플리케이션 안에서 LLM 호출, 프롬프트 구성, 임베딩, 벡터 검색 같은 AI 기능을 다루기 위한 프로젝트입니다.",
    body: [
      "Spring AI는 AI 모델 호출을 Spring 방식으로 애플리케이션에 통합하도록 돕습니다. Controller와 Service 구조 안에서 ChatClient를 호출하고, 필요한 설정을 application.yml과 Bean으로 관리할 수 있습니다.",
      "단순 채팅 API에서 시작해 문서 기반 질의응답으로 확장하려면 임베딩과 벡터 저장소 개념이 필요합니다. 문서를 작은 조각으로 나누고, 벡터로 변환한 뒤, 질문과 가까운 조각을 찾아 모델 프롬프트에 넣는 흐름입니다.",
      "AI 기능은 항상 정확한 답을 보장하지 않습니다. 중요한 업무 로직을 모델 판단에 전부 맡기기보다, 입력 검증, 근거 문서 표시, 실패 처리, 비용 제한을 함께 설계해야 합니다.",
    ],
    annotations: [
      ["ChatClient", "대화형 AI 모델 호출을 간결하게 작성하는 클라이언트입니다."],
      ["EmbeddingModel", "문장을 벡터로 변환하는 모델 추상화입니다."],
      ["VectorStore", "벡터 검색을 위한 저장소 추상화입니다."],
      ["Prompt", "모델에 전달할 시스템 지시, 사용자 질문, 컨텍스트를 구성합니다."],
    ],
    related: [
      ["build.gradle", "Spring AI starter와 BOM 버전을 확인합니다."],
      ["application.yml", "모델 이름, API key, timeout, temperature 같은 값을 관리합니다."],
      ["Logging", "프롬프트와 응답 로그에는 개인정보가 남지 않도록 주의합니다."],
    ],
    exampleTitle: "간단한 Chat API",
    language: "java",
    code: `@RestController
class ChatController {
    private final ChatClient chatClient;

    @PostMapping("/api/ai/chat")
    ChatResponse chat(@RequestBody ChatRequest request) {
        String answer = chatClient.prompt()
            .system("Spring Boot를 공부하는 학생에게 기술적으로 설명한다.")
            .user(request.message())
            .call()
            .content();
        return new ChatResponse(answer);
    }
}`,
    watch: [
      "AI 응답은 항상 검증 가능한 사실이라고 볼 수 없으므로 중요한 결정에는 근거와 검증 단계를 둡니다.",
      "API key를 코드나 GitHub에 직접 올리면 안 됩니다.",
      "긴 문서를 그대로 프롬프트에 넣으면 비용과 지연 시간이 커지므로 검색 기반 컨텍스트 구성이 필요합니다.",
    ],
  }),
];

SPRING_TOPICS.forEach((item, index) => {
  item.number = String(index + 1).padStart(2, "0");
});

if (typeof window !== "undefined") {
  window.TOPIC_PARTS = TOPIC_PARTS;
  window.SPRING_TOPICS = SPRING_TOPICS;
}

if (typeof module !== "undefined") {
  module.exports = { TOPIC_PARTS, SPRING_TOPICS };
}
