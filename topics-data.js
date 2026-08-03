const TOPIC_PARTS = [
  { id: "part-1", title: "Part 1. Spring 기초", description: "Spring Boot를 배우기 전에 잡아야 할 웹, 객체 관리, 기본 구조" },
  { id: "part-2", title: "Part 2. 핵심 구조", description: "Controller부터 Transaction까지 실제 API 프로젝트의 기본 뼈대" },
  { id: "part-3", title: "Part 3. 보안", description: "인증, 인가, 토큰 기반 로그인 흐름" },
  { id: "part-4", title: "Part 4. 실무 개발", description: "설정, 빌드, 문서화, 협업, 운영에 필요한 기본기" },
  { id: "part-5", title: "Part 5. 심화", description: "프로젝트를 더 견고하게 만드는 확장 주제" },
];

const SPRING_TOPICS = [
  {
    slug: "spring-framework",
    part: "part-1",
    number: "01",
    title: "Spring Framework",
    summary: "자바 애플리케이션에서 객체 생성, 의존성 연결, 웹 요청 처리, 데이터 접근을 체계적으로 도와주는 기반 프레임워크입니다.",
    body: [
      "Spring Framework는 큰 프로젝트에서 자바 객체를 직접 만들고 연결하는 코드를 줄이기 위해 등장했습니다. 학생들이 처음 헷갈리는 지점은 Spring이 단순한 라이브러리가 아니라 애플리케이션의 객체 흐름을 관리하는 컨테이너 역할을 한다는 점입니다.",
      "Spring Boot를 배우더라도 Spring Framework의 핵심인 IoC, DI, Bean, AOP, MVC를 이해해야 합니다. Boot는 Spring을 쉽게 시작하게 해 주지만, 내부 동작은 Spring Framework 위에서 이루어집니다.",
    ],
    annotations: [
      ["@Component", "Spring이 관리할 일반 컴포넌트를 등록합니다."],
      ["@Configuration", "Bean 등록 메서드를 가진 설정 클래스를 나타냅니다."],
      ["@Bean", "외부 라이브러리 객체처럼 직접 생성해야 하는 객체를 Spring Bean으로 등록합니다."],
    ],
    related: [
      ["build.gradle", "spring-boot-starter-web, spring-boot-starter-data-jpa 같은 starter 의존성을 확인합니다."],
      ["패키지 구조", "메인 클래스 하위 패키지에 컴포넌트가 있어야 기본 컴포넌트 스캔 대상이 됩니다."],
    ],
    exampleTitle: "Spring이 관리하는 서비스 객체",
    language: "java",
    code: `@Component
public class GreetingService {
    public String greet(String name) {
        return "Hello, " + name;
    }
}`,
    watch: ["Spring이 객체를 관리하려면 Bean으로 등록되어야 합니다.", "무조건 @Component만 쓰기보다 역할에 맞게 @Service, @Repository, @Controller를 사용합니다."],
  },
  {
    slug: "spring-boot",
    part: "part-1",
    number: "02",
    title: "Spring Boot",
    summary: "Spring 프로젝트를 빠르게 시작하고 실행할 수 있도록 자동 설정, 내장 서버, starter 의존성을 제공하는 도구입니다.",
    body: [
      "Spring Boot는 복잡한 설정을 줄여 학생들이 웹 API를 빠르게 실행해 볼 수 있게 합니다. 내장 Tomcat을 사용하기 때문에 별도 WAS 설치 없이 main 메서드 실행만으로 서버가 시작됩니다.",
      "중요한 것은 Boot가 모든 것을 마법처럼 처리하는 것이 아니라, 클래스패스의 의존성과 설정 파일을 보고 적절한 Spring 설정을 자동으로 구성한다는 점입니다.",
    ],
    annotations: [
      ["@SpringBootApplication", "@SpringBootConfiguration, @EnableAutoConfiguration, @ComponentScan을 합친 시작 어노테이션입니다."],
      ["@SpringBootTest", "테스트에서 Spring Boot 애플리케이션 컨텍스트를 로딩합니다."],
    ],
    related: [
      ["DemoApplication.java", "애플리케이션 시작 위치이며, 이 클래스의 패키지가 컴포넌트 스캔 기준이 됩니다."],
      ["application.yml", "포트, DB, 로그, 프로필 설정을 관리합니다."],
      ["build.gradle", "starter 의존성과 Java 버전을 확인합니다."],
    ],
    exampleTitle: "가장 작은 Spring Boot 애플리케이션",
    language: "java",
    code: `@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}`,
    watch: ["메인 클래스가 너무 깊은 패키지에 있으면 일부 Bean이 스캔되지 않을 수 있습니다.", "자동 설정이 예상과 다르면 의존성과 application.yml 값을 먼저 확인합니다."],
  },
  {
    slug: "http",
    part: "part-1",
    number: "03",
    title: "HTTP",
    summary: "브라우저, 앱, 서버가 요청과 응답을 주고받기 위해 사용하는 웹 통신 약속입니다.",
    body: [
      "HTTP는 Spring Boot API의 입구입니다. URL은 어떤 자원을 다루는지, 메서드는 어떤 행동을 할지, 상태 코드는 결과가 어땠는지 알려줍니다.",
      "처음에는 GET은 조회, POST는 생성, PUT/PATCH는 수정, DELETE는 삭제라는 식으로 익히면 됩니다. 요청 본문은 JSON으로 주고받는 경우가 많습니다.",
    ],
    annotations: [
      ["@GetMapping", "GET 요청을 메서드에 연결합니다."],
      ["@PostMapping", "POST 요청을 메서드에 연결합니다."],
      ["@RequestBody", "요청 본문의 JSON을 자바 객체로 변환합니다."],
      ["@PathVariable", "URL 경로의 값을 메서드 파라미터로 받습니다."],
    ],
    related: [
      ["Controller", "HTTP 요청을 가장 먼저 받는 계층입니다."],
      ["CORS", "프론트엔드 주소와 백엔드 주소가 다르면 브라우저 정책을 확인해야 합니다."],
      ["Postman 또는 Swagger", "요청 메서드, URL, 헤더, 본문을 직접 확인합니다."],
    ],
    exampleTitle: "HTTP 요청과 Controller 매핑",
    language: "java",
    code: `@RestController
@RequestMapping("/api/students")
class StudentController {
    @GetMapping("/{id}")
    StudentResponse find(@PathVariable Long id) {
        return studentService.find(id);
    }
}`,
    watch: ["404는 URL 매핑 문제, 400은 요청 값 문제, 500은 서버 내부 오류인 경우가 많습니다.", "GET 요청에 중요한 변경 작업을 넣지 않습니다."],
  },
  {
    slug: "rest-api",
    part: "part-1",
    number: "04",
    title: "REST API",
    summary: "자원을 URL로 표현하고 HTTP 메서드로 행동을 나타내는 API 설계 스타일입니다.",
    body: [
      "REST API는 함수 이름을 URL에 쓰는 방식이 아니라, 학생, 게시글, 댓글 같은 자원을 중심으로 URL을 설계합니다. 예를 들어 학생 목록은 GET /students, 학생 생성은 POST /students처럼 표현합니다.",
      "처음부터 완벽한 REST를 만들 필요는 없지만, URL 이름과 HTTP 메서드가 일관되면 프론트엔드와 협업하기 쉬워집니다.",
    ],
    annotations: [
      ["@RestController", "응답을 View가 아니라 JSON 같은 데이터로 반환하는 Controller입니다."],
      ["@RequestMapping", "공통 URL prefix를 지정합니다."],
      ["@ResponseStatus", "성공 응답 상태 코드를 명시할 때 사용합니다."],
    ],
    related: [
      ["DTO", "요청 DTO와 응답 DTO를 분리해 API 모양을 안정적으로 유지합니다."],
      ["Swagger", "API 명세를 문서로 보여주고 직접 호출해 볼 수 있게 합니다."],
      ["Exception", "실패 응답도 일관된 JSON 구조로 설계합니다."],
    ],
    exampleTitle: "학생 CRUD API URL 설계",
    language: "java",
    code: `@RestController
@RequestMapping("/api/students")
class StudentController {
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    StudentResponse create(@RequestBody StudentCreateRequest request) {
        return studentService.create(request);
    }
}`,
    watch: ["URL에 동사를 과하게 넣지 않습니다. /createStudent보다 POST /students가 읽기 좋습니다.", "응답 상태 코드를 무조건 200으로만 보내지 않습니다."],
  },
  {
    slug: "mvc",
    part: "part-1",
    number: "05",
    title: "MVC",
    summary: "Model, View, Controller로 책임을 나누는 구조이며 Spring MVC는 웹 요청 처리의 핵심 기반입니다.",
    body: [
      "MVC는 요청 처리 코드를 한 클래스에 몰아넣지 않기 위한 기본 구조입니다. Controller는 요청을 해석하고, Model은 데이터를 담고, View는 화면을 담당합니다.",
      "REST API 프로젝트에서는 View 템플릿 대신 JSON 응답을 반환하는 경우가 많습니다. 그래도 Spring MVC의 요청 매핑, 파라미터 바인딩, 검증, 예외 처리 흐름은 그대로 사용됩니다.",
    ],
    annotations: [
      ["@Controller", "View 이름을 반환하는 전통적인 MVC Controller입니다."],
      ["@RestController", "@Controller와 @ResponseBody를 합친 API용 Controller입니다."],
      ["@ModelAttribute", "쿼리 파라미터나 form 데이터를 객체로 바인딩합니다."],
    ],
    related: [
      ["templates 디렉터리", "Thymeleaf 같은 서버 렌더링 화면을 사용할 때 확인합니다."],
      ["static 디렉터리", "정적 CSS, JS, 이미지 파일을 둘 때 사용합니다."],
      ["Controller 테스트", "@WebMvcTest로 MVC 계층만 가볍게 테스트할 수 있습니다."],
    ],
    exampleTitle: "API에서의 Spring MVC",
    language: "java",
    code: `@RestController
class CourseController {
    @GetMapping("/api/courses")
    List<CourseResponse> courses() {
        return courseService.findAll();
    }
}`,
    watch: ["Controller가 비즈니스 규칙을 직접 처리하기 시작하면 Service 분리를 검토합니다.", "View 기반 MVC와 REST API MVC의 응답 방식 차이를 구분합니다."],
  },
  {
    slug: "ioc",
    part: "part-1",
    number: "06",
    title: "IoC",
    summary: "객체 생성과 연결의 제어권을 개발자 코드가 아니라 Spring 컨테이너가 갖는 구조입니다.",
    body: [
      "IoC는 Inversion of Control의 줄임말입니다. 일반 자바 코드에서는 필요한 객체를 직접 new로 만들지만, Spring에서는 컨테이너가 객체를 만들고 필요한 곳에 넣어줍니다.",
      "이 구조 덕분에 객체 교체, 테스트, 설정 변경이 쉬워집니다. 학생들은 IoC를 이해해야 DI, Bean, 테스트 코드가 왜 그렇게 작성되는지 연결해서 볼 수 있습니다.",
    ],
    annotations: [
      ["@ComponentScan", "특정 패키지 아래의 컴포넌트를 찾아 Bean으로 등록합니다."],
      ["@SpringBootApplication", "기본 컴포넌트 스캔을 포함합니다."],
    ],
    related: [
      ["패키지 위치", "메인 클래스 하위 패키지에 컴포넌트가 있는지 확인합니다."],
      ["Bean 충돌", "같은 타입 Bean이 여러 개라면 @Qualifier 또는 @Primary를 고려합니다."],
    ],
    exampleTitle: "직접 생성과 IoC 방식 비교",
    language: "java",
    code: `// 직접 생성 방식
StudentRepository repository = new MemoryStudentRepository();
StudentService service = new StudentService(repository);

// Spring 방식
@Service
class StudentService {
    StudentService(StudentRepository repository) { }
}`,
    watch: ["IoC는 객체를 없애는 개념이 아니라 객체 관리 위치를 바꾸는 개념입니다.", "Bean 등록이 안 되면 의존성 주입도 실패합니다."],
  },
  {
    slug: "di",
    part: "part-1",
    number: "07",
    title: "DI",
    summary: "필요한 의존 객체를 클래스 내부에서 직접 만들지 않고 외부에서 주입받는 방식입니다.",
    body: [
      "DI는 Dependency Injection의 줄임말입니다. Service가 Repository를 직접 생성하지 않고 생성자를 통해 받으면, 실제 DB Repository와 테스트용 Fake Repository를 쉽게 바꿀 수 있습니다.",
      "Spring Boot에서는 생성자 주입을 기본으로 권장합니다. 필수 의존성이 명확해지고, final 필드를 사용할 수 있으며, 테스트 코드 작성도 쉬워집니다.",
    ],
    annotations: [
      ["@Autowired", "의존성을 자동 주입합니다. 생성자가 하나라면 생략할 수 있습니다."],
      ["@Qualifier", "같은 타입 Bean이 여러 개일 때 이름으로 선택합니다."],
      ["@Primary", "같은 타입 Bean 중 기본으로 사용할 Bean을 지정합니다."],
    ],
    related: [
      ["Lombok", "@RequiredArgsConstructor로 final 필드 생성자를 줄일 수 있습니다."],
      ["테스트", "@MockBean 또는 생성자 직접 주입으로 의존성을 바꿔 테스트합니다."],
    ],
    exampleTitle: "생성자 주입",
    language: "java",
    code: `@Service
class StudentService {
    private final StudentRepository repository;

    StudentService(StudentRepository repository) {
        this.repository = repository;
    }
}`,
    watch: ["필드 주입은 테스트와 불변성 측면에서 불리합니다.", "순환 참조가 생기면 설계 책임이 섞였는지 먼저 확인합니다."],
  },
  {
    slug: "bean",
    part: "part-1",
    number: "08",
    title: "Bean",
    summary: "Spring 컨테이너가 생성, 보관, 주입, 생명주기 관리를 담당하는 객체입니다.",
    body: [
      "Bean은 Spring이 관리하는 객체입니다. Controller, Service, Repository처럼 애플리케이션의 주요 구성 요소는 Bean으로 등록되어 서로 주입됩니다.",
      "직접 만든 클래스는 stereotype 어노테이션으로 등록하고, 외부 라이브러리 객체는 @Configuration 클래스 안에서 @Bean 메서드로 등록하는 방식이 흔합니다.",
    ],
    annotations: [
      ["@Component", "일반 Bean 등록에 사용합니다."],
      ["@Service", "비즈니스 서비스 역할을 표현합니다."],
      ["@Repository", "데이터 접근 계층이며 예외 변환 기능과도 관련됩니다."],
      ["@Bean", "메서드 반환 객체를 Bean으로 등록합니다."],
    ],
    related: [
      ["ApplicationContext", "Bean을 보관하고 찾아주는 Spring 컨테이너입니다."],
      ["Bean 이름", "기본 이름은 클래스명의 첫 글자를 소문자로 바꾼 형태입니다."],
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
    watch: ["new로 직접 만든 객체는 Spring이 주입과 생명주기를 관리하지 않습니다.", "같은 타입 Bean이 여러 개면 주입 대상이 모호해질 수 있습니다."],
  },
  {
    slug: "controller",
    part: "part-2",
    number: "09",
    title: "Controller",
    summary: "HTTP 요청을 받아 입력을 해석하고 Service에 처리를 위임한 뒤 응답을 반환하는 계층입니다.",
    body: [
      "Controller는 외부 세계와 애플리케이션 내부를 연결하는 입구입니다. URL, HTTP 메서드, 요청 헤더, 경로 변수, 요청 본문을 받아 자바 객체로 바꿉니다.",
      "좋은 Controller는 얇습니다. 입력 검증과 응답 변환은 할 수 있지만, 중복 이메일 검사나 수강 신청 가능 여부 같은 핵심 규칙은 Service에 두는 것이 좋습니다.",
    ],
    annotations: [
      ["@RestController", "JSON 응답을 반환하는 API Controller입니다."],
      ["@RequestMapping", "공통 URL 경로를 지정합니다."],
      ["@PathVariable", "URL 경로 값을 받습니다."],
      ["@RequestParam", "쿼리 문자열 값을 받습니다."],
      ["@RequestBody", "JSON 본문을 DTO로 변환합니다."],
      ["@Valid", "요청 DTO의 검증 어노테이션을 실행합니다."],
    ],
    related: [
      ["DTO", "요청 DTO와 응답 DTO를 Controller 경계에 둡니다."],
      ["Validation", "Controller 파라미터에 @Valid를 붙여 검증을 활성화합니다."],
      ["Exception", "Controller에서 try-catch를 반복하지 말고 공통 예외 처리로 분리합니다."],
    ],
    exampleTitle: "학생 생성 API",
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
    watch: ["Controller에서 Entity를 그대로 반환하면 API가 DB 구조에 끌려갈 수 있습니다.", "요청 본문이 필요한데 @RequestBody를 빼면 값이 비어 들어올 수 있습니다."],
  },
  {
    slug: "service",
    part: "part-2",
    number: "10",
    title: "Service",
    summary: "애플리케이션의 비즈니스 규칙과 작업 흐름을 처리하는 계층입니다.",
    body: [
      "Service는 프로젝트의 핵심 규칙이 모이는 곳입니다. Controller가 받은 요청을 바탕으로 필요한 Entity를 조회하고, 조건을 검사하고, 상태를 변경하고, Repository를 통해 저장합니다.",
      "학생 프로젝트에서는 Service를 단순히 Repository 호출을 감싸는 곳으로만 쓰기 쉽습니다. 하지만 실제로는 트랜잭션 경계와 비즈니스 예외가 Service에 모이는 경우가 많습니다.",
    ],
    annotations: [
      ["@Service", "비즈니스 계층 Bean임을 표현합니다."],
      ["@Transactional", "DB 작업을 하나의 트랜잭션으로 묶습니다."],
      ["@Transactional(readOnly = true)", "조회 전용 메서드에 사용해 의도를 드러냅니다."],
    ],
    related: [
      ["Repository", "데이터 조회와 저장은 Repository에 위임합니다."],
      ["Exception", "비즈니스 규칙 위반은 의미 있는 예외로 표현합니다."],
      ["Transaction", "여러 저장 작업이 하나의 성공/실패 단위인지 확인합니다."],
    ],
    exampleTitle: "중복 이메일 검사 후 저장",
    language: "java",
    code: `@Service
class StudentService {
    private final StudentRepository repository;

    @Transactional
    StudentResponse create(StudentCreateRequest request) {
        if (repository.existsByEmail(request.email())) {
            throw new DuplicateEmailException(request.email());
        }
        Student saved = repository.save(request.toEntity());
        return StudentResponse.from(saved);
    }
}`,
    watch: ["Service가 너무 커지면 도메인 객체나 별도 컴포넌트로 규칙을 나눌 수 있습니다.", "조회 메서드와 변경 메서드의 트랜잭션 설정을 구분합니다."],
  },
  {
    slug: "repository",
    part: "part-2",
    number: "11",
    title: "Repository",
    summary: "데이터베이스와의 조회, 저장, 삭제 작업을 담당하는 데이터 접근 계층입니다.",
    body: [
      "Repository는 애플리케이션이 DB와 직접 대화하는 통로입니다. Spring Data JPA를 사용하면 인터페이스만 작성해도 기본 CRUD 메서드가 제공됩니다.",
      "메서드 이름으로 쿼리를 만들 수 있지만, 복잡한 조건이 늘어나면 @Query, QueryDSL, 명세 패턴 같은 방법을 검토합니다.",
    ],
    annotations: [
      ["@Repository", "데이터 접근 계층 Bean을 나타냅니다."],
      ["@Query", "직접 JPQL 또는 native SQL을 작성합니다."],
      ["@Param", "@Query의 파라미터 이름을 연결합니다."],
    ],
    related: [
      ["Entity", "Repository는 보통 Entity 타입과 ID 타입을 기준으로 작성합니다."],
      ["JPA", "JpaRepository를 상속하면 save, findById, delete 등이 제공됩니다."],
      ["SQL 로그", "실행 SQL을 확인하려면 logging.level.org.hibernate.SQL 설정을 사용합니다."],
    ],
    exampleTitle: "Spring Data JPA Repository",
    language: "java",
    code: `public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByEmail(String email);

    @Query("select s from Student s where s.name like concat(:name, '%')")
    List<Student> findByNamePrefix(@Param("name") String name);
}`,
    watch: ["Repository에서 비즈니스 규칙을 처리하지 않습니다.", "N+1 문제가 생기면 fetch join이나 EntityGraph를 검토합니다."],
  },
  {
    slug: "dto",
    part: "part-2",
    number: "12",
    title: "DTO",
    summary: "API 요청과 응답에 사용하는 데이터 전달 객체입니다.",
    body: [
      "DTO는 외부와 주고받는 데이터 모양을 안정적으로 관리하기 위해 사용합니다. Entity를 그대로 요청/응답에 쓰면 DB 구조 변경이 API 변경으로 이어질 수 있습니다.",
      "요청 DTO는 검증 규칙을 담고, 응답 DTO는 화면이나 클라이언트에 필요한 값만 담는 식으로 역할을 나눕니다.",
    ],
    annotations: [
      ["@NotBlank", "문자열이 null, 빈 문자열, 공백만 있는 값을 허용하지 않습니다."],
      ["@Email", "이메일 형식인지 검사합니다."],
      ["@JsonProperty", "JSON 필드 이름과 자바 필드 이름을 다르게 매핑할 때 사용합니다."],
    ],
    related: [
      ["Validation", "요청 DTO에 검증 어노테이션을 선언합니다."],
      ["Controller", "@RequestBody와 함께 요청 DTO를 받습니다."],
      ["Entity 변환", "DTO와 Entity 변환 책임을 어디에 둘지 팀 규칙을 정합니다."],
    ],
    exampleTitle: "요청 DTO와 응답 DTO",
    language: "java",
    code: `public record StudentCreateRequest(
    @NotBlank String name,
    @Email String email
) {
    Student toEntity() {
        return new Student(name, email);
    }
}

public record StudentResponse(Long id, String name, String email) {
    static StudentResponse from(Student student) {
        return new StudentResponse(student.getId(), student.getName(), student.getEmail());
    }
}`,
    watch: ["Entity를 요청 DTO로 직접 받지 않습니다.", "응답 DTO에 비밀번호, 토큰 원문 같은 민감 정보를 넣지 않습니다."],
  },
  {
    slug: "entity",
    part: "part-2",
    number: "13",
    title: "Entity",
    summary: "JPA가 데이터베이스 테이블과 매핑하는 도메인 객체입니다.",
    body: [
      "Entity는 DB 테이블과 가까운 객체입니다. 식별자, 컬럼, 연관관계, 상태 변경 메서드를 가질 수 있습니다.",
      "처음에는 Getter/Setter를 모두 열어두기 쉽지만, 실무에서는 상태 변경 메서드를 만들어 의미 있는 변경만 허용하는 방식이 좋습니다.",
    ],
    annotations: [
      ["@Entity", "JPA 관리 대상 클래스입니다."],
      ["@Id", "기본 키 필드입니다."],
      ["@GeneratedValue", "기본 키 생성 전략을 지정합니다."],
      ["@Column", "컬럼 제약과 이름을 설정합니다."],
      ["@ManyToOne", "다대일 연관관계를 표현합니다."],
    ],
    related: [
      ["기본 생성자", "JPA는 protected 이상의 기본 생성자를 필요로 합니다."],
      ["DDL 설정", "spring.jpa.hibernate.ddl-auto 설정이 Entity와 DB 스키마 처리 방식에 영향을 줍니다."],
      ["Lombok", "@NoArgsConstructor(access = PROTECTED), @Getter 정도를 신중히 사용합니다."],
    ],
    exampleTitle: "학생 Entity",
    language: "java",
    code: `@Entity
class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    protected Student() { }

    Student(String name, String email) {
        this.name = name;
        this.email = email;
    }
}`,
    watch: ["@Data는 equals, hashCode, toString까지 만들어 연관관계에서 문제를 만들 수 있어 Entity에는 조심합니다.", "Entity 필드를 public으로 열지 않습니다."],
  },
  {
    slug: "jpa",
    part: "part-2",
    number: "14",
    title: "JPA",
    summary: "자바 객체와 관계형 데이터베이스를 매핑하는 표준 ORM 기술입니다.",
    body: [
      "JPA는 SQL 중심이 아니라 객체 중심으로 데이터를 다루게 해 줍니다. 개발자는 Entity를 저장하고 조회하지만, 내부적으로는 SQL이 실행됩니다.",
      "JPA를 잘 쓰려면 영속성 컨텍스트, 변경 감지, 지연 로딩, 트랜잭션을 함께 이해해야 합니다. 단순 CRUD는 쉽지만 연관관계와 성능 문제에서 차이가 크게 납니다.",
    ],
    annotations: [
      ["@Entity", "JPA가 관리할 객체입니다."],
      ["@OneToMany", "일대다 연관관계입니다."],
      ["@ManyToOne(fetch = LAZY)", "다대일 연관관계를 지연 로딩으로 설정합니다."],
      ["@Transactional", "영속성 컨텍스트와 변경 감지가 동작하는 경계입니다."],
    ],
    related: [
      ["application.yml", "datasource, jpa.hibernate.ddl-auto, show-sql 설정을 확인합니다."],
      ["Repository", "Spring Data JPA 인터페이스를 통해 JPA를 쉽게 사용합니다."],
      ["SQL", "JPA가 만든 SQL을 읽을 수 있어야 성능 문제를 찾을 수 있습니다."],
    ],
    exampleTitle: "트랜잭션 안에서 변경 감지",
    language: "java",
    code: `@Transactional
public void changeEmail(Long studentId, String email) {
    Student student = repository.findById(studentId)
        .orElseThrow(StudentNotFoundException::new);
    student.changeEmail(email);
}`,
    watch: ["JPA를 사용해도 SQL 기본기는 반드시 필요합니다.", "연관관계 기본 FetchType을 그대로 믿지 말고 쿼리 수를 확인합니다."],
  },
  {
    slug: "crud",
    part: "part-2",
    number: "15",
    title: "CRUD",
    summary: "Create, Read, Update, Delete로 대부분의 데이터 중심 API가 출발하는 기본 작업입니다.",
    body: [
      "CRUD는 웹 애플리케이션의 가장 기본 기능입니다. 하지만 단순히 메서드 네 개를 만드는 것이 아니라 요청 DTO, 응답 DTO, 검증, 예외, 트랜잭션까지 함께 설계해야 합니다.",
      "처음 프로젝트에서는 하나의 자원, 예를 들어 Student에 대해 CRUD를 완성해 보면 Spring Boot API 전체 흐름을 익히기 좋습니다.",
    ],
    annotations: [
      ["@PostMapping", "생성 API에 사용합니다."],
      ["@GetMapping", "조회 API에 사용합니다."],
      ["@PatchMapping", "일부 수정 API에 사용합니다."],
      ["@DeleteMapping", "삭제 API에 사용합니다."],
    ],
    related: [
      ["Validation", "생성과 수정 요청에 필요한 값 검증을 적용합니다."],
      ["Exception", "없는 ID 조회, 중복 데이터, 권한 없음 같은 상황을 처리합니다."],
      ["Transaction", "생성, 수정, 삭제는 트랜잭션 경계를 확인합니다."],
    ],
    exampleTitle: "수정 API 예제",
    language: "java",
    code: `@PatchMapping("/api/students/{id}")
StudentResponse update(@PathVariable Long id,
                       @Valid @RequestBody StudentUpdateRequest request) {
    return studentService.update(id, request);
}`,
    watch: ["삭제 API는 실제 삭제인지 상태값 변경인지 먼저 정합니다.", "수정 요청에서 null 값이 들어왔을 때 덮어쓸지 무시할지 규칙을 정합니다."],
  },
  {
    slug: "validation",
    part: "part-2",
    number: "16",
    title: "Validation",
    summary: "잘못된 입력을 서비스 로직에 들어가기 전에 걸러내는 검증 처리입니다.",
    body: [
      "Validation은 사용자가 보낸 값이 애플리케이션 규칙에 맞는지 확인하는 과정입니다. 이름이 비었는지, 이메일 형식인지, 숫자 범위가 맞는지 같은 기본 검증은 DTO에서 선언적으로 처리할 수 있습니다.",
      "검증은 Controller에서 @Valid를 붙여야 실행됩니다. 검증 실패 응답은 GlobalExceptionHandler에서 공통 형식으로 정리하는 것이 좋습니다.",
    ],
    annotations: [
      ["@Valid", "DTO 검증을 실행합니다."],
      ["@NotNull", "null을 허용하지 않습니다."],
      ["@NotBlank", "빈 문자열과 공백 문자열을 허용하지 않습니다."],
      ["@Size", "문자열, 컬렉션 길이를 제한합니다."],
      ["@Min, @Max", "숫자 범위를 제한합니다."],
    ],
    related: [
      ["build.gradle", "spring-boot-starter-validation 의존성이 필요할 수 있습니다."],
      ["Exception", "MethodArgumentNotValidException을 공통 처리합니다."],
      ["DTO", "검증 어노테이션은 보통 요청 DTO에 둡니다."],
    ],
    exampleTitle: "검증 DTO와 Controller",
    language: "java",
    code: `public record CourseCreateRequest(
    @NotBlank String title,
    @Min(1) int credit
) { }

@PostMapping("/api/courses")
CourseResponse create(@Valid @RequestBody CourseCreateRequest request) {
    return courseService.create(request);
}`,
    watch: ["@Valid를 빼면 DTO의 검증 어노테이션이 실행되지 않습니다.", "비즈니스 규칙 검증과 단순 입력 형식 검증을 구분합니다."],
  },
  {
    slug: "exception",
    part: "part-2",
    number: "17",
    title: "Exception",
    summary: "실패 상황을 의미 있는 예외와 일관된 API 응답으로 바꾸는 처리입니다.",
    body: [
      "예외 처리는 서버 오류를 감추는 작업이 아니라 실패 이유를 클라이언트가 이해할 수 있게 정리하는 작업입니다. 없는 학생 ID, 중복 이메일, 권한 없음 같은 상황은 각각 다른 상태 코드와 메시지를 갖는 것이 좋습니다.",
      "Controller마다 try-catch를 반복하면 코드가 지저분해집니다. @RestControllerAdvice를 사용하면 공통 예외 응답을 한 곳에서 관리할 수 있습니다.",
    ],
    annotations: [
      ["@RestControllerAdvice", "모든 REST Controller에 적용되는 공통 예외 처리 클래스입니다."],
      ["@ExceptionHandler", "특정 예외 타입을 처리하는 메서드를 지정합니다."],
      ["@ResponseStatus", "예외나 핸들러의 HTTP 상태 코드를 지정합니다."],
    ],
    related: [
      ["ErrorResponse DTO", "code, message, fieldErrors 같은 공통 응답 구조를 만듭니다."],
      ["Validation", "검증 실패 예외를 보기 좋은 응답으로 변환합니다."],
      ["Logging", "500 오류는 로그에 충분한 추적 정보를 남깁니다."],
    ],
    exampleTitle: "공통 예외 처리",
    language: "java",
    code: `@RestControllerAdvice
class GlobalExceptionHandler {
    @ExceptionHandler(StudentNotFoundException.class)
    ResponseEntity<ErrorResponse> handleNotFound(StudentNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse("STUDENT_NOT_FOUND", ex.getMessage()));
    }
}`,
    watch: ["모든 예외를 500으로 보내면 클라이언트가 원인을 알기 어렵습니다.", "사용자에게 보여줄 메시지와 서버 로그에 남길 상세 정보를 구분합니다."],
  },
  {
    slug: "transaction",
    part: "part-2",
    number: "18",
    title: "Transaction",
    summary: "여러 데이터 변경 작업을 하나의 성공 또는 실패 단위로 묶는 처리입니다.",
    body: [
      "Transaction은 중간 실패로 데이터가 어중간하게 저장되는 것을 막습니다. 수강 신청에서 수강 인원 증가와 신청 내역 저장이 함께 일어난다면 둘 다 성공하거나 둘 다 실패해야 합니다.",
      "Spring에서는 보통 Service 메서드에 @Transactional을 붙입니다. JPA의 변경 감지도 트랜잭션 안에서 자연스럽게 동작합니다.",
    ],
    annotations: [
      ["@Transactional", "메서드 실행을 트랜잭션으로 감쌉니다."],
      ["readOnly = true", "조회 전용 트랜잭션임을 나타냅니다."],
      ["rollbackFor", "특정 예외에 대해 롤백하도록 지정합니다."],
    ],
    related: [
      ["Service", "트랜잭션 경계는 보통 Service 계층에 둡니다."],
      ["JPA", "변경 감지와 지연 로딩은 트랜잭션과 관련이 깊습니다."],
      ["DB 제약 조건", "트랜잭션만 믿지 말고 unique, foreign key 같은 제약도 함께 둡니다."],
    ],
    exampleTitle: "수강 신청 트랜잭션",
    language: "java",
    code: `@Transactional
public void enroll(Long studentId, Long courseId) {
    Student student = studentRepository.findById(studentId).orElseThrow();
    Course course = courseRepository.findById(courseId).orElseThrow();
    course.enroll(student);
    enrollmentRepository.save(new Enrollment(student, course));
}`,
    watch: ["private 메서드에 @Transactional을 붙여도 프록시 기반 AOP가 적용되지 않습니다.", "외부 API 호출과 DB 트랜잭션을 한 덩어리로 묶을 때는 실패 보상 전략을 고민합니다."],
  },
  {
    slug: "spring-security",
    part: "part-3",
    number: "19",
    title: "Spring Security",
    badge: "★★★",
    summary: "Spring 애플리케이션의 인증과 인가를 담당하는 강력한 보안 프레임워크입니다.",
    body: [
      "Spring Security는 누가 로그인했는지 확인하는 인증과, 그 사용자가 어떤 기능을 사용할 수 있는지 판단하는 인가를 처리합니다. API 서버에서는 세션 방식 또는 JWT 방식과 함께 사용합니다.",
      "처음에는 SecurityFilterChain, PasswordEncoder, UserDetailsService 또는 커스텀 인증 필터의 역할을 나누어 이해하면 좋습니다.",
    ],
    annotations: [
      ["@EnableWebSecurity", "직접 보안 설정을 구성할 때 사용합니다. Boot에서는 자동 설정과 함께 동작합니다."],
      ["@PreAuthorize", "메서드 실행 전 권한 표현식을 검사합니다."],
      ["@AuthenticationPrincipal", "현재 인증된 사용자 정보를 Controller에서 받습니다."],
      ["@Bean SecurityFilterChain", "HTTP 보안 정책을 Bean으로 등록합니다."],
    ],
    related: [
      ["build.gradle", "spring-boot-starter-security 의존성을 추가합니다."],
      ["SecurityConfig", "CSRF, CORS, URL별 권한, 세션 정책을 설정합니다."],
      ["PasswordEncoder", "비밀번호는 반드시 해시로 저장합니다."],
      ["Exception 처리", "401과 403 응답을 구분합니다."],
    ],
    exampleTitle: "기본 API 보안 설정",
    language: "java",
    code: `@Configuration
class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .build();
    }
}`,
    watch: ["Security를 추가하면 기본적으로 많은 요청이 막힐 수 있으므로 공개 API와 보호 API를 구분합니다.", "비밀번호 평문 저장은 절대 하지 않습니다."],
  },
  {
    slug: "jwt",
    part: "part-3",
    number: "20",
    title: "JWT",
    badge: "★★★",
    summary: "로그인 결과를 서명된 토큰으로 표현해 클라이언트가 요청마다 인증 정보를 전달하는 방식입니다.",
    body: [
      "JWT는 JSON Web Token의 줄임말입니다. 서버가 로그인 성공 시 토큰을 발급하고, 클라이언트는 Authorization 헤더에 Bearer 토큰을 담아 API를 호출합니다.",
      "JWT는 서버 확장에 유리하지만 토큰 탈취, 만료, 재발급, 로그아웃 처리가 중요합니다. Access Token과 Refresh Token을 분리해 설계하는 경우가 많습니다.",
    ],
    annotations: [
      ["OncePerRequestFilter", "요청마다 한 번 실행되는 JWT 인증 필터를 만들 때 자주 상속합니다."],
      ["@AuthenticationPrincipal", "JWT 검증 후 만들어진 인증 사용자 정보를 받습니다."],
    ],
    related: [
      ["SecurityConfig", "세션을 STATELESS로 두고 JWT 필터를 Security 필터 체인에 추가합니다."],
      ["application.yml", "JWT secret, access-token-expiration 같은 값을 환경 변수 기반으로 관리합니다."],
      ["CORS", "Authorization 헤더를 프론트엔드에서 보낼 수 있게 허용합니다."],
    ],
    exampleTitle: "Authorization 헤더에서 토큰 읽기",
    language: "java",
    code: `String header = request.getHeader(HttpHeaders.AUTHORIZATION);
if (header != null && header.startsWith("Bearer ")) {
    String token = header.substring(7);
    Authentication authentication = jwtProvider.getAuthentication(token);
    SecurityContextHolder.getContext().setAuthentication(authentication);
}`,
    watch: ["JWT payload는 암호화가 아니라 인코딩에 가깝기 때문에 민감 정보를 넣지 않습니다.", "토큰 만료 시간을 너무 길게 잡으면 탈취 시 피해가 커집니다."],
  },
  {
    slug: "session-vs-jwt",
    part: "part-3",
    number: "21",
    title: "Session vs JWT",
    badge: "★★",
    summary: "로그인 상태를 서버가 저장할지, 클라이언트가 토큰으로 들고 다닐지의 차이를 비교하는 주제입니다.",
    body: [
      "Session 방식은 서버가 로그인 상태를 저장하고 클라이언트는 세션 ID만 쿠키로 들고 다닙니다. 로그아웃과 강제 만료 처리가 쉽지만 서버가 상태를 저장해야 합니다.",
      "JWT 방식은 토큰 자체에 사용자 식별 정보와 만료 시간을 담습니다. 서버 확장에는 유리하지만 이미 발급한 토큰을 즉시 무효화하려면 별도 저장소나 블랙리스트 전략이 필요합니다.",
    ],
    annotations: [
      ["SessionCreationPolicy.STATELESS", "JWT API에서 서버 세션을 만들지 않도록 설정합니다."],
      ["HttpSession", "서버 세션에 값을 저장하거나 읽을 때 사용합니다."],
      ["@CookieValue", "쿠키 값을 Controller에서 읽을 때 사용합니다."],
    ],
    related: [
      ["Redis", "분산 서버 환경에서 세션 저장소나 토큰 블랙리스트로 사용할 수 있습니다."],
      ["Spring Security", "두 방식 모두 Security 필터 체인과 연결됩니다."],
      ["HTTPS", "세션 쿠키와 JWT 모두 전송 구간 보호가 필요합니다."],
    ],
    exampleTitle: "JWT 방식의 세션 정책",
    language: "java",
    code: `http.sessionManagement(session -> session
    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
);`,
    watch: ["모바일 앱, SPA, 서버 렌더링 웹의 특성에 따라 선택이 달라집니다.", "JWT를 쓰더라도 Refresh Token 저장 전략은 별도로 설계해야 합니다."],
  },
  {
    slug: "gradle",
    part: "part-4",
    number: "22",
    title: "Gradle",
    summary: "프로젝트 빌드, 테스트 실행, 라이브러리 의존성 관리를 담당하는 빌드 도구입니다.",
    body: [
      "Gradle은 Spring Boot 프로젝트에서 필요한 라이브러리를 내려받고, 테스트를 실행하고, 실행 가능한 jar 파일을 만드는 역할을 합니다.",
      "학생들은 build.gradle을 단순 설정 파일로만 보지 말고 프로젝트가 어떤 기술을 사용하고 있는지 보여주는 의존성 목록으로 읽는 습관을 들이면 좋습니다.",
    ],
    annotations: [
      ["plugins", "java, org.springframework.boot 같은 빌드 플러그인을 선언합니다."],
      ["dependencies", "프로젝트가 사용하는 라이브러리를 선언합니다."],
      ["implementation", "컴파일과 실행에 필요한 의존성입니다."],
      ["testImplementation", "테스트에만 필요한 의존성입니다."],
    ],
    related: [
      ["Java 버전", "sourceCompatibility 또는 toolchain 설정을 확인합니다."],
      ["starter", "spring-boot-starter-web처럼 관련 의존성을 묶은 패키지입니다."],
      ["빌드 결과", "build/libs 아래 jar 파일이 생성됩니다."],
    ],
    exampleTitle: "웹 API와 JPA 의존성",
    language: "gradle",
    code: `dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    runtimeOnly 'com.h2database:h2'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}`,
    watch: ["의존성을 추가한 뒤 IDE Gradle sync를 해야 인식됩니다.", "버전 충돌이 생기면 Spring Boot BOM이 관리하는 버전을 우선 확인합니다."],
  },
  {
    slug: "application-yml",
    part: "part-4",
    number: "23",
    title: "application.yml",
    summary: "Spring Boot 애플리케이션의 포트, DB, 로그, 보안, 프로필 설정을 관리하는 파일입니다.",
    body: [
      "application.yml은 코드 밖에서 실행 환경을 조정하는 파일입니다. 같은 코드라도 로컬, 테스트, 운영 환경에서 DB 주소나 로그 레벨이 달라질 수 있습니다.",
      "민감한 값은 파일에 직접 쓰지 않고 환경 변수로 주입하는 방식이 좋습니다. 특히 JWT secret, DB 비밀번호, API key는 GitHub에 올리면 안 됩니다.",
    ],
    annotations: [
      ["@Value", "설정 값을 필드나 생성자 파라미터로 주입합니다."],
      ["@ConfigurationProperties", "prefix 아래 설정을 타입 안전한 객체로 바인딩합니다."],
      ["@Profile", "특정 프로필에서만 Bean을 활성화합니다."],
    ],
    related: [
      ["application-local.yml", "로컬 전용 설정을 분리할 수 있습니다."],
      ["환경 변수", "${DB_PASSWORD} 같은 형태로 외부 값을 참조합니다."],
      ["Logging", "logging.level 패키지명으로 로그 레벨을 조정합니다."],
    ],
    exampleTitle: "DB와 JPA 기본 설정",
    language: "yaml",
    code: `spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
  jpa:
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        format_sql: true
logging:
  level:
    org.hibernate.SQL: debug`,
    watch: ["운영 환경에서 ddl-auto: create를 사용하면 데이터가 사라질 수 있습니다.", "들여쓰기가 틀리면 설정이 적용되지 않습니다."],
  },
  {
    slug: "lombok",
    part: "part-4",
    number: "24",
    title: "Lombok",
    summary: "Getter, 생성자, Builder 같은 반복 코드를 어노테이션으로 줄여주는 도구입니다.",
    body: [
      "Lombok은 자바 코드의 반복을 줄여주지만, 생성되는 코드를 눈으로 직접 보지 않기 때문에 처음 배우는 학생에게는 오히려 흐름을 숨길 수 있습니다.",
      "DTO에는 @Builder나 @Getter가 편리할 수 있고, Entity에는 @Data 사용을 피하고 필요한 어노테이션만 제한적으로 사용하는 것이 좋습니다.",
    ],
    annotations: [
      ["@Getter", "필드 getter를 생성합니다."],
      ["@RequiredArgsConstructor", "final 필드를 받는 생성자를 생성합니다."],
      ["@NoArgsConstructor", "기본 생성자를 생성합니다."],
      ["@Builder", "Builder 패턴 코드를 생성합니다."],
      ["@Data", "Getter, Setter, equals, hashCode, toString을 모두 생성합니다."],
    ],
    related: [
      ["IDE 플러그인", "Lombok 어노테이션 처리가 IDE에서 활성화되어야 합니다."],
      ["Entity", "@Data와 무분별한 @Setter는 Entity에서 조심합니다."],
      ["DI", "@RequiredArgsConstructor로 생성자 주입 코드를 줄일 수 있습니다."],
    ],
    exampleTitle: "생성자 주입 코드 줄이기",
    language: "java",
    code: `@Service
@RequiredArgsConstructor
class StudentService {
    private final StudentRepository repository;
}`,
    watch: ["Lombok이 만든 코드를 이해하지 못하면 디버깅이 어려워집니다.", "Entity의 toString이 연관 객체를 계속 호출하면 순환 참조 문제가 생길 수 있습니다."],
  },
  {
    slug: "sql",
    part: "part-4",
    number: "25",
    title: "SQL",
    summary: "관계형 데이터베이스에서 데이터를 조회, 추가, 수정, 삭제하는 언어입니다.",
    body: [
      "JPA를 사용하더라도 SQL은 반드시 알아야 합니다. 성능 문제, 조건 검색, 정렬, 조인, 인덱스 문제는 결국 실행되는 SQL을 읽어야 해결할 수 있습니다.",
      "처음에는 SELECT, INSERT, UPDATE, DELETE와 WHERE, JOIN, ORDER BY, LIMIT/OFFSET을 익히는 것이 중요합니다.",
    ],
    annotations: [
      ["@Query", "Repository 메서드에 JPQL 또는 SQL을 직접 작성합니다."],
      ["nativeQuery = true", "JPQL이 아니라 실제 DB SQL을 사용합니다."],
    ],
    related: [
      ["JPA SQL 로그", "실제 실행 SQL을 확인하도록 logging.level을 설정합니다."],
      ["schema.sql", "초기 스키마를 직접 작성할 때 사용합니다."],
      ["data.sql", "초기 데이터를 넣을 때 사용합니다."],
    ],
    exampleTitle: "학생 이름 검색 SQL",
    language: "sql",
    code: `SELECT id, name, email
FROM students
WHERE name LIKE 'Kim%'
ORDER BY id DESC
LIMIT 20 OFFSET 0;`,
    watch: ["LIKE '%keyword%'는 데이터가 많아지면 느려질 수 있습니다.", "JPA가 만들어 준 SQL도 반드시 로그로 확인하는 습관을 들입니다."],
  },
  {
    slug: "pagination",
    part: "part-4",
    number: "26",
    title: "Pagination",
    summary: "많은 데이터를 한 번에 보내지 않고 페이지 단위로 나누어 조회하는 방식입니다.",
    body: [
      "Pagination은 목록 API에서 매우 중요합니다. 데이터가 10개일 때는 전체 조회가 쉬워 보이지만, 10만 개가 되면 서버와 브라우저 모두 부담이 커집니다.",
      "Spring Data JPA는 Pageable과 Page 타입을 제공해 page, size, sort 파라미터를 쉽게 처리합니다. 응답 DTO에서는 전체 페이지 수와 현재 페이지 정보를 함께 내려주는 것이 좋습니다.",
    ],
    annotations: [
      ["Pageable", "페이지 번호, 크기, 정렬 정보를 담는 인터페이스입니다."],
      ["Page<T>", "목록 데이터와 전체 개수, 페이지 정보를 함께 담습니다."],
      ["@PageableDefault", "기본 페이지 크기와 정렬을 지정합니다."],
    ],
    related: [
      ["Repository", "findAll(Pageable pageable)을 사용할 수 있습니다."],
      ["SQL", "LIMIT/OFFSET 또는 keyset pagination 개념과 연결됩니다."],
      ["Swagger", "page, size, sort 파라미터를 문서화합니다."],
    ],
    exampleTitle: "페이지 목록 API",
    language: "java",
    code: `@GetMapping("/api/students")
Page<StudentResponse> findAll(
    @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable
) {
    return studentService.findAll(pageable);
}`,
    watch: ["page는 보통 0부터 시작합니다.", "대량 데이터에서는 OFFSET 방식이 느려질 수 있어 keyset pagination을 검토합니다."],
  },
  {
    slug: "logging",
    part: "part-4",
    number: "27",
    title: "Logging",
    summary: "애플리케이션의 실행 상태, 오류, 주요 이벤트를 기록하는 작업입니다.",
    body: [
      "Logging은 문제를 찾기 위한 기록입니다. System.out.println은 간단하지만 레벨, 출력 형식, 파일 저장, 운영 환경 제어가 어렵습니다.",
      "Spring Boot는 기본적으로 SLF4J와 Logback 조합을 사용합니다. info, warn, error 레벨을 구분하고, 민감 정보가 로그에 남지 않도록 주의해야 합니다.",
    ],
    annotations: [
      ["@Slf4j", "Lombok이 Logger 필드를 만들어 줍니다."],
      ["@ControllerAdvice", "예외 로그를 공통으로 남길 때 함께 사용됩니다."],
    ],
    related: [
      ["application.yml", "logging.level 패키지명으로 로그 레벨을 조정합니다."],
      ["Exception", "예외 응답과 서버 로그를 함께 설계합니다."],
      ["AOP", "실행 시간 측정 같은 반복 로그를 분리할 수 있습니다."],
    ],
    exampleTitle: "의미 있는 로그 남기기",
    language: "java",
    code: `@Slf4j
@Service
class StudentService {
    void delete(Long id) {
        log.info("delete student request. id={}", id);
        repository.deleteById(id);
    }
}`,
    watch: ["비밀번호, access token, 주민번호 같은 민감 정보를 로그에 남기지 않습니다.", "error 로그만 남기면 정상 흐름 분석이 어렵고, info를 과하게 남기면 운영 로그가 시끄러워집니다."],
  },
  {
    slug: "swagger",
    part: "part-4",
    number: "28",
    title: "Swagger",
    summary: "API 명세를 자동으로 문서화하고 브라우저에서 직접 테스트할 수 있게 해주는 도구입니다.",
    body: [
      "Swagger UI를 사용하면 API URL, 요청 파라미터, 요청/응답 DTO를 한눈에 확인할 수 있습니다. 프론트엔드와 협업할 때 특히 유용합니다.",
      "Spring Boot에서는 springdoc-openapi를 많이 사용합니다. 단, 문서가 실제 동작과 다르면 혼란이 커지므로 DTO와 응답 상태를 정확히 관리해야 합니다.",
    ],
    annotations: [
      ["@Operation", "API 설명과 요약을 작성합니다."],
      ["@Parameter", "파라미터 설명을 작성합니다."],
      ["@Schema", "DTO 필드 설명과 예시를 작성합니다."],
      ["@Tag", "Controller API 그룹을 지정합니다."],
    ],
    related: [
      ["build.gradle", "springdoc-openapi 의존성을 추가합니다."],
      ["Security", "JWT 인증이 필요한 API는 Swagger 보안 스키마를 설정합니다."],
      ["DTO", "요청/응답 필드 설명이 문서 품질을 좌우합니다."],
    ],
    exampleTitle: "Swagger 설명 추가",
    language: "java",
    code: `@Tag(name = "Students")
@RestController
class StudentController {
    @Operation(summary = "학생 단건 조회")
    @GetMapping("/api/students/{id}")
    StudentResponse find(@Parameter(description = "학생 ID") @PathVariable Long id) {
        return studentService.find(id);
    }
}`,
    watch: ["운영 환경에서 Swagger UI를 공개할지 여부를 보안 관점에서 결정합니다.", "문서용 설명과 실제 검증 규칙이 어긋나지 않게 관리합니다."],
  },
  {
    slug: "git",
    part: "part-4",
    number: "29",
    title: "Git",
    summary: "코드 변경 이력을 관리하고 팀원과 협업하기 위한 버전 관리 도구입니다.",
    body: [
      "Git은 단순히 파일을 백업하는 도구가 아니라 변경 이유와 흐름을 남기는 도구입니다. 작은 단위로 커밋하면 문제가 생겼을 때 되돌리기 쉽고 리뷰도 쉬워집니다.",
      "Spring Boot 프로젝트에서는 build 결과물, IDE 설정, 로컬 환경 파일이 Git에 들어가지 않도록 .gitignore를 확인해야 합니다.",
    ],
    annotations: [
      [".gitignore", "커밋하지 않을 파일 패턴을 관리합니다."],
      ["commit", "의미 있는 변경 단위를 기록합니다."],
      ["branch", "기능 개발을 독립적으로 진행할 때 사용합니다."],
    ],
    related: [
      ["README.md", "실행 방법, 환경 변수, 주요 API를 문서화합니다."],
      ["CI/CD", "push나 pull request 시 자동 테스트가 실행되도록 연결합니다."],
      ["application.yml", "민감한 로컬 설정이 커밋되지 않도록 분리합니다."],
    ],
    exampleTitle: "기능 단위 커밋",
    language: "bash",
    code: `git checkout -b feature/student-crud
git add src/main/java src/test/java
git commit -m "Add student CRUD API"
git push origin feature/student-crud`,
    watch: ["application-secret.yml, .env 같은 민감 파일을 올리지 않습니다.", "한 커밋에 여러 기능을 섞으면 리뷰와 되돌리기가 어려워집니다."],
  },
  {
    slug: "cors",
    part: "part-4",
    number: "30",
    title: "CORS",
    summary: "브라우저가 서로 다른 출처의 요청을 제한하는 보안 정책입니다.",
    body: [
      "CORS는 서버끼리의 문제가 아니라 브라우저 보안 정책입니다. 프론트엔드가 localhost:3000이고 백엔드가 localhost:8080이면 출처가 다르기 때문에 브라우저가 요청을 막을 수 있습니다.",
      "Spring Boot에서는 Controller 단위 @CrossOrigin 또는 전역 WebMvcConfigurer, SecurityConfig의 cors 설정으로 처리합니다. Security를 사용 중이면 MVC CORS만 설정하고 끝나지 않을 수 있습니다.",
    ],
    annotations: [
      ["@CrossOrigin", "특정 Controller나 메서드에 CORS 허용을 지정합니다."],
      ["CorsRegistry", "전역 CORS 정책을 등록합니다."],
      ["CorsConfigurationSource", "Spring Security와 함께 사용할 CORS 설정 Bean입니다."],
    ],
    related: [
      ["SecurityConfig", "Spring Security 사용 시 http.cors 설정을 확인합니다."],
      ["프론트엔드 요청", "credentials 포함 여부와 Authorization 헤더 사용 여부를 확인합니다."],
      ["배포 도메인", "운영 프론트엔드 도메인을 정확히 허용합니다."],
    ],
    exampleTitle: "전역 CORS 설정",
    language: "java",
    code: `@Configuration
class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PATCH", "DELETE")
            .allowedHeaders("*");
    }
}`,
    watch: ["allowedOrigins(\"*\")와 credentials 허용을 함께 쓰는 것은 제한됩니다.", "운영 배포 시 localhost만 허용하면 실제 프론트엔드에서 호출이 실패합니다."],
  },
  {
    slug: "aop",
    part: "part-5",
    number: "31",
    title: "AOP",
    summary: "로깅, 실행 시간 측정, 권한 검사처럼 여러 곳에 반복되는 부가 기능을 분리하는 방식입니다.",
    body: [
      "AOP는 Aspect Oriented Programming의 줄임말입니다. 핵심 비즈니스 로직에 반복적인 부가 코드를 섞지 않고, 특정 지점에 공통 기능을 끼워 넣습니다.",
      "Spring AOP는 프록시 기반으로 동작합니다. 그래서 내부 private 메서드 호출에는 적용되지 않는 등 몇 가지 제약을 이해해야 합니다.",
    ],
    annotations: [
      ["@Aspect", "AOP 클래스임을 나타냅니다."],
      ["@Around", "대상 메서드 실행 전후를 감싸서 처리합니다."],
      ["@Before", "대상 메서드 실행 전에 처리합니다."],
      ["@AfterThrowing", "예외 발생 후 처리합니다."],
    ],
    related: [
      ["build.gradle", "spring-boot-starter-aop 의존성이 필요합니다."],
      ["Logging", "실행 시간 측정과 요청 추적 로그에 활용할 수 있습니다."],
      ["Transaction", "@Transactional도 AOP 기반으로 이해할 수 있습니다."],
    ],
    exampleTitle: "실행 시간 측정 AOP",
    language: "java",
    code: `@Aspect
@Component
class TimeTraceAspect {
    @Around("execution(* com.example..*Service.*(..))")
    Object trace(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        try {
            return joinPoint.proceed();
        } finally {
            log.info("{} took {}ms", joinPoint.getSignature(), System.currentTimeMillis() - start);
        }
    }
}`,
    watch: ["AOP를 남용하면 실제 실행 흐름을 추적하기 어려워집니다.", "프록시 기반 동작이라 자기 자신 내부 메서드 호출에는 적용되지 않을 수 있습니다."],
  },
  {
    slug: "filter-interceptor",
    part: "part-5",
    number: "32",
    title: "Filter와 Interceptor",
    summary: "HTTP 요청 전후에 공통 처리를 넣는 구조로, 동작 위치와 책임이 다릅니다.",
    body: [
      "Filter는 Servlet 컨테이너 레벨에서 동작하고, Interceptor는 Spring MVC의 HandlerMapping 이후에 동작합니다. 둘 다 요청 전후 공통 처리에 쓰지만 적용 위치가 다릅니다.",
      "인코딩, 보안 필터, 요청 로그처럼 더 앞단에서 처리할 것은 Filter가 어울리고, Controller 실행 전 권한 확인이나 공통 모델 처리처럼 MVC와 가까운 일은 Interceptor가 어울립니다.",
    ],
    annotations: [
      ["@WebFilter", "Servlet Filter를 등록할 때 사용할 수 있습니다."],
      ["@Component", "Filter를 Spring Bean으로 등록할 수 있습니다."],
      ["HandlerInterceptor", "preHandle, postHandle, afterCompletion을 구현합니다."],
    ],
    related: [
      ["SecurityFilterChain", "Spring Security는 여러 Filter의 체인으로 동작합니다."],
      ["WebMvcConfigurer", "Interceptor를 등록할 때 사용합니다."],
      ["Logging", "요청 ID와 실행 시간을 남기는 데 자주 사용합니다."],
    ],
    exampleTitle: "Interceptor 등록",
    language: "java",
    code: `@Configuration
class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoginCheckInterceptor())
            .addPathPatterns("/api/**");
    }
}`,
    watch: ["Filter와 Interceptor의 실행 순서를 혼동하지 않습니다.", "Security를 사용한다면 인증 처리는 Security 필터 체인과 충돌하지 않게 설계합니다."],
  },
  {
    slug: "redis",
    part: "part-5",
    number: "33",
    title: "Redis",
    summary: "메모리 기반 저장소로 캐시, 세션, 토큰, 랭킹 같은 빠른 데이터 처리에 사용됩니다.",
    body: [
      "Redis는 데이터를 메모리에 저장해 빠르게 읽고 쓸 수 있는 저장소입니다. DB 부하를 줄이는 캐시, 로그인 세션 저장, Refresh Token 저장, 랭킹 처리 등에 자주 사용됩니다.",
      "캐시는 빠르지만 원본 DB와 값이 달라질 수 있습니다. 어떤 데이터를 얼마나 오래 저장할지 TTL과 무효화 전략을 함께 설계해야 합니다.",
    ],
    annotations: [
      ["@EnableCaching", "Spring Cache 기능을 활성화합니다."],
      ["@Cacheable", "메서드 결과를 캐시에 저장하고 재사용합니다."],
      ["@CacheEvict", "캐시를 제거합니다."],
    ],
    related: [
      ["build.gradle", "spring-boot-starter-data-redis 의존성을 추가합니다."],
      ["application.yml", "spring.data.redis.host, port 설정을 확인합니다."],
      ["Docker", "로컬 Redis를 컨테이너로 띄우면 실습이 편합니다."],
    ],
    exampleTitle: "조회 결과 캐싱",
    language: "java",
    code: `@EnableCaching
@SpringBootApplication
class DemoApplication { }

@Cacheable(value = "students", key = "#id")
public StudentResponse findById(Long id) {
    return repository.findById(id).map(StudentResponse::from).orElseThrow();
}`,
    watch: ["수정이나 삭제 후 캐시를 지우지 않으면 오래된 값이 보일 수 있습니다.", "Redis 장애 시 서비스가 어떻게 동작할지 fallback을 고민합니다."],
  },
  {
    slug: "docker",
    part: "part-5",
    number: "34",
    title: "Docker",
    summary: "애플리케이션과 실행 환경을 컨테이너 이미지로 묶어 어디서나 비슷하게 실행하게 해주는 도구입니다.",
    body: [
      "Docker는 로컬에서는 잘 되는데 서버에서는 안 되는 문제를 줄여줍니다. Java 버전, 실행 명령, 포트, 환경 변수를 이미지와 컨테이너 설정으로 관리할 수 있습니다.",
      "Spring Boot 프로젝트에서는 jar 파일을 빌드한 뒤 JRE 이미지 위에서 실행하는 Dockerfile을 많이 사용합니다. DB, Redis 같은 외부 서비스는 docker-compose로 함께 띄울 수 있습니다.",
    ],
    annotations: [
      ["Dockerfile", "이미지를 만드는 절차를 적는 파일입니다."],
      ["docker-compose.yml", "여러 컨테이너를 함께 실행하는 설정 파일입니다."],
      ["ENV", "컨테이너 환경 변수를 설정합니다."],
    ],
    related: [
      ["Gradle", "bootJar로 실행 가능한 jar를 만듭니다."],
      ["application.yml", "DB 주소를 localhost가 아니라 서비스 이름으로 바꿔야 할 수 있습니다."],
      ["CI/CD", "자동 빌드에서 Docker 이미지를 만들고 배포합니다."],
    ],
    exampleTitle: "Spring Boot Dockerfile",
    language: "dockerfile",
    code: `FROM eclipse-temurin:21-jre
WORKDIR /app
COPY build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]`,
    watch: ["컨테이너 안에서 localhost는 호스트 PC가 아니라 컨테이너 자신입니다.", "이미지에 비밀번호나 API key를 넣지 않습니다."],
  },
  {
    slug: "ci-cd",
    part: "part-5",
    number: "35",
    title: "CI/CD",
    summary: "코드 변경 후 테스트, 빌드, 배포를 자동화하는 개발 흐름입니다.",
    body: [
      "CI는 Continuous Integration으로, 코드가 올라올 때 자동으로 테스트와 빌드를 실행해 문제를 빨리 찾는 과정입니다. CD는 Continuous Delivery 또는 Deployment로, 검증된 코드를 배포 가능한 상태로 만들거나 실제 배포까지 자동화합니다.",
      "학생 프로젝트에서도 GitHub Actions로 테스트를 자동 실행하면 협업 품질이 크게 좋아집니다. 배포 단계에서는 환경 변수와 secret 관리가 특히 중요합니다.",
    ],
    annotations: [
      ["GitHub Actions", "GitHub 저장소 이벤트를 기준으로 자동 작업을 실행합니다."],
      ["workflow", ".github/workflows 아래 YAML 파일로 작성합니다."],
      ["secrets", "토큰, 비밀번호 같은 민감 값을 안전하게 저장합니다."],
    ],
    related: [
      ["Gradle", "CI에서 ./gradlew test 또는 ./gradlew build를 실행합니다."],
      ["Docker", "이미지 빌드와 push를 자동화할 수 있습니다."],
      ["Vercel 또는 서버 배포", "프론트엔드/문서 사이트는 push 기반 자동 배포와 잘 맞습니다."],
    ],
    exampleTitle: "Gradle 테스트 워크플로",
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
    watch: ["CI가 실패했는데 무시하고 merge하면 main 브랜치 품질이 떨어집니다.", "secret 값을 로그에 출력하지 않습니다."],
  },
  {
    slug: "spring-ai",
    part: "part-5",
    number: "36",
    title: "Spring AI",
    summary: "Spring 애플리케이션에서 LLM, 임베딩, 벡터 저장소 같은 AI 기능을 다루기 위한 프로젝트입니다.",
    body: [
      "Spring AI는 Spring 방식으로 AI 모델 호출, 프롬프트 작성, 임베딩, 벡터 검색을 다룰 수 있게 해줍니다. 기존 Controller, Service 구조 안에 AI 기능을 넣을 수 있다는 장점이 있습니다.",
      "처음에는 ChatClient로 간단한 질문 응답 API를 만들고, 이후 문서 검색이 필요하면 EmbeddingModel과 VectorStore를 함께 학습하면 좋습니다.",
    ],
    annotations: [
      ["ChatClient", "대화형 AI 모델 호출을 단순화한 클라이언트입니다."],
      ["EmbeddingModel", "문장을 벡터로 바꾸는 모델입니다."],
      ["VectorStore", "벡터 검색을 위한 저장소 추상화입니다."],
      ["@ConfigurationProperties", "API key와 모델 설정을 안전하게 바인딩할 때 사용합니다."],
    ],
    related: [
      ["build.gradle", "spring-ai starter와 BOM 버전을 확인합니다."],
      ["application.yml", "모델 이름, API key, timeout 같은 설정을 관리합니다."],
      ["Logging", "프롬프트와 응답 로그에는 개인정보가 남지 않도록 주의합니다."],
    ],
    exampleTitle: "간단한 Chat API",
    language: "java",
    code: `@RestController
class ChatController {
    private final ChatClient chatClient;

    @GetMapping("/api/ai/chat")
    String chat(@RequestParam String message) {
        return chatClient.prompt()
            .user(message)
            .call()
            .content();
    }
}`,
    watch: ["AI 응답은 항상 정답이 아닐 수 있으므로 중요한 로직을 전부 맡기지 않습니다.", "API key는 코드나 GitHub에 직접 올리지 않습니다."],
  },
];

if (typeof window !== "undefined") {
  window.TOPIC_PARTS = TOPIC_PARTS;
  window.SPRING_TOPICS = SPRING_TOPICS;
}

if (typeof module !== "undefined") {
  module.exports = { TOPIC_PARTS, SPRING_TOPICS };
}
