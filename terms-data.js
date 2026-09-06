function term(data) {
  return {
    category: "Spring 핵심 용어",
    level: "핵심",
    readingTime: "약 5분",
    aliases: [],
    mechanics: [],
    distinctions: [],
    checks: [],
    ...data,
  };
}

const SPRING_TERMS = [
  term({
    slug: "response-body",
    name: "@ResponseBody",
    summary: "Controller 메서드의 반환값을 View 이름으로 해석하지 않고 HTTP 응답 본문에 직접 쓰도록 지시하는 Spring MVC 애너테이션입니다.",
    aliases: ["ResponseBody", "응답 본문", "HTTP Response Body"],
    definition: [
      "@ResponseBody는 메서드가 반환한 Java 객체나 문자열을 HTTP 응답의 body로 직렬화하라는 뜻입니다. @Controller 클래스의 메서드나 클래스 자체에 붙일 수 있으며, @RestController에는 @Controller와 @ResponseBody의 기능이 함께 들어 있습니다.",
      "반환값이 객체라면 Spring MVC의 HttpMessageConverter가 요청의 Accept 헤더와 서버 설정을 보고 표현 형식을 결정합니다. 일반적인 Spring Boot 웹 프로젝트에서는 Jackson이 객체를 JSON으로 변환하고 Content-Type을 application/json으로 설정합니다.",
    ],
    mechanics: [
      ["Controller 반환", "메서드가 DTO, 문자열 또는 컬렉션 같은 값을 반환합니다."],
      ["응답 처리 선택", "RequestResponseBodyMethodProcessor가 @ResponseBody를 확인해 ViewResolver 대신 메시지 변환 흐름을 선택합니다."],
      ["직렬화와 전송", "HttpMessageConverter가 반환값을 JSON 등의 형식으로 바꾸고 HTTP 응답 본문에 기록합니다."],
    ],
    distinctions: [
      ["@Controller", "기본적으로 문자열 반환값을 View 이름으로 해석합니다. JSON 응답이 필요한 메서드에는 @ResponseBody를 붙입니다."],
      ["@RestController", "클래스의 모든 요청 처리 메서드에 @ResponseBody가 적용된 것과 같습니다. REST API Controller에 주로 사용합니다."],
      ["@RequestBody", "요청 본문을 Java 객체로 역직렬화합니다. @ResponseBody와 데이터 이동 방향이 반대입니다."],
      ["ResponseEntity", "응답 본문뿐 아니라 상태 코드와 헤더도 함께 명시합니다. @ResponseBody 처리 흐름을 사용합니다."],
    ],
    exampleTitle: "@Controller에서 JSON 응답 반환하기",
    language: "java",
    code: `@Controller
@RequestMapping("/api/courses")
class CourseController {

    @GetMapping("/{id}")
    @ResponseBody
    CourseResponse find(@PathVariable Long id) {
        return new CourseResponse(id, "Spring 입문");
    }
}

record CourseResponse(Long id, String title) {}`,
    checks: [
      "@ResponseBody가 없으면 @Controller의 문자열 반환값은 보통 View 이름으로 해석됩니다.",
      "Entity를 그대로 반환하면 지연 로딩, 순환 참조, 민감 필드 노출 문제가 생길 수 있으므로 응답 DTO를 사용하는 편이 안전합니다.",
      "직렬화할 수 없는 타입이나 getter 구조가 있으면 응답 생성 단계에서 HttpMessageNotWritableException이 발생할 수 있습니다.",
      "HTTP 상태와 헤더를 제어해야 한다면 ResponseEntity 또는 @ResponseStatus를 함께 검토합니다.",
    ],
    relatedTopics: ["controller", "rest-api", "dto"],
  }),
  term({
    slug: "spring-boot-application",
    name: "@SpringBootApplication",
    summary: "Spring Boot 애플리케이션의 시작 설정을 선언하며 구성 등록, 자동 설정, 컴포넌트 스캔을 한 번에 활성화하는 합성 애너테이션입니다.",
    aliases: ["SpringBootApplication", "Boot 시작 클래스", "메인 애너테이션"],
    definition: [
      "@SpringBootApplication은 보통 main 메서드가 있는 최상위 클래스에 한 번 붙입니다. 이 클래스는 SpringApplication.run에 전달되어 ApplicationContext를 만들기 위한 주 설정 소스가 됩니다.",
      "내부적으로 @SpringBootConfiguration, @EnableAutoConfiguration, @ComponentScan을 결합합니다. 즉 설정 클래스로 동작하고, 클래스패스와 기존 Bean을 조건으로 자동 설정을 적용하며, 선언된 패키지부터 하위 패키지의 컴포넌트를 탐색합니다.",
    ],
    mechanics: [
      ["진입점 실행", "main 메서드가 SpringApplication.run(애플리케이션클래스, args)을 호출합니다."],
      ["설정 분석", "Boot가 주 설정 클래스, 클래스패스, application.yml, Profile과 사용자가 등록한 Bean을 분석합니다."],
      ["Bean 구성", "컴포넌트 스캔과 조건부 자동 설정으로 BeanDefinition을 수집하고 ApplicationContext를 초기화합니다."],
      ["애플리케이션 시작", "웹 프로젝트라면 내장 서버와 DispatcherServlet 등이 준비된 뒤 요청을 받을 수 있는 상태가 됩니다."],
    ],
    distinctions: [
      ["@SpringBootConfiguration", "Boot용 주 설정 클래스임을 나타내며 @Configuration을 포함합니다."],
      ["@EnableAutoConfiguration", "classpath, 설정 속성, 기존 Bean 조건에 따라 Boot 자동 설정 후보를 적용합니다."],
      ["@ComponentScan", "현재 패키지와 하위 패키지에서 @Component 계열 클래스를 찾아 Bean 후보로 등록합니다."],
      ["SpringApplication.run", "애너테이션 자체가 실행하는 것이 아니라, 이 메서드가 설정 클래스를 사용해 실제 부트스트랩을 시작합니다."],
    ],
    exampleTitle: "권장 패키지 위치의 실행 클래스",
    language: "java",
    code: `package com.example.handbook;

@SpringBootApplication
public class HandbookApplication {
    public static void main(String[] args) {
        SpringApplication.run(HandbookApplication.class, args);
    }
}

// com.example.handbook.controller
// com.example.handbook.service
// com.example.handbook.repository
// 위 하위 패키지는 기본 컴포넌트 스캔 범위에 포함됩니다.`,
    checks: [
      "실행 클래스를 루트 패키지보다 아래에 두면 바깥 패키지의 Controller, Service, Repository가 스캔되지 않을 수 있습니다.",
      "자동 설정은 항상 같은 Bean을 만드는 것이 아닙니다. 의존성, 설정 값, 기존 Bean 유무를 나타내는 조건에 따라 적용 결과가 달라집니다.",
      "exclude 또는 scanBasePackages로 범위를 바꿀 수 있지만 기본 패키지 구조로 해결할 수 있는지 먼저 확인하는 편이 좋습니다.",
      "여러 테스트 설정에서 @SpringBootApplication 클래스를 추가로 만들면 주 설정 탐색이 모호해질 수 있습니다.",
    ],
    relatedTopics: ["spring-boot", "ioc", "spring-annotations"],
  }),
  term({
    slug: "jpa",
    name: "JPA",
    summary: "Java Persistence API의 약자로, Java 객체와 관계형 데이터베이스 사이의 영속성 관리 방식을 정의한 표준 명세입니다.",
    aliases: ["Java Persistence API", "Jakarta Persistence", "ORM 표준"],
    definition: [
      "JPA는 라이브러리 제품명이 아니라 ORM 동작과 API를 정의한 표준 명세입니다. 실제 동작은 Hibernate 같은 구현체가 담당하며, Spring Data JPA는 그 위에서 Repository 작성과 조회 기능을 편리하게 제공하는 Spring 프로젝트입니다.",
      "핵심은 단순한 테이블 매핑보다 영속성 컨텍스트에 있습니다. EntityManager가 Entity의 생명주기를 관리하고, 같은 식별자 조회에 대한 1차 캐시, 변경 감지, 쓰기 지연 같은 기능을 트랜잭션 경계 안에서 제공합니다.",
    ],
    mechanics: [
      ["매핑", "@Entity, @Id, 연관관계 애너테이션으로 객체와 테이블의 대응 규칙을 선언합니다."],
      ["조회와 관리", "조회한 Entity가 영속성 컨텍스트의 관리 상태가 되며 동일성, 1차 캐시, 지연 로딩의 영향을 받습니다."],
      ["상태 변경", "트랜잭션 안에서 영속 Entity의 값을 바꾸면 변경 감지가 수정 내용을 추적합니다."],
      ["flush와 SQL", "flush 시점에 변경 내용을 SQL로 만들어 DB에 전달하고, 트랜잭션 commit이 최종 반영 여부를 결정합니다."],
    ],
    distinctions: [
      ["JPA", "ORM과 영속성 관리의 표준 인터페이스 및 규칙입니다. 현재 표준 명칭은 Jakarta Persistence입니다."],
      ["Hibernate", "JPA 명세를 구현하는 대표적인 ORM 프레임워크입니다. SQL 생성과 실제 영속성 동작을 담당합니다."],
      ["Spring Data JPA", "JPA를 기반으로 JpaRepository, 쿼리 메서드, 페이징 같은 상위 편의 기능을 제공합니다."],
      ["JDBC", "SQL과 ResultSet을 직접 다루는 저수준 API입니다. JPA 구현체도 최종적으로 JDBC를 통해 DB와 통신합니다."],
    ],
    exampleTitle: "트랜잭션 안에서 동작하는 변경 감지",
    language: "java",
    code: `@Service
@RequiredArgsConstructor
class CourseService {
    private final CourseRepository courseRepository;

    @Transactional
    public void rename(Long courseId, String newTitle) {
        Course course = courseRepository.findById(courseId)
            .orElseThrow();

        course.changeTitle(newTitle);
        // 영속 상태 Entity이므로 보통 save()를 다시 호출하지 않아도
        // commit 전 flush에서 UPDATE SQL이 생성됩니다.
    }
}`,
    checks: [
      "JPA를 사용해도 생성되는 SQL, 인덱스, 실행 계획을 이해하고 확인해야 합니다.",
      "지연 로딩 프록시를 트랜잭션 밖에서 접근하면 LazyInitializationException이 발생할 수 있습니다.",
      "N+1 문제는 연관관계가 있다는 이유만으로 해결되지 않습니다. fetch join, EntityGraph, DTO 조회 등을 조회 목적에 맞게 선택합니다.",
      "벌크 update/delete는 영속성 컨텍스트를 거치지 않으므로 실행 뒤 clear 여부와 관리 중인 Entity의 불일치를 점검해야 합니다.",
    ],
    relatedTopics: ["jpa", "entity", "transaction", "repository-query"],
  }),
  term({
    slug: "id",
    name: "@Id",
    category: "JPA 기본 매핑",
    summary: "Entity에서 각 행을 유일하게 식별하는 기본 키 필드를 지정하는 JPA 애너테이션입니다.",
    aliases: ["Primary Key", "식별자", "기본 키"],
    definition: [
      "@Id는 JPA가 Entity의 동일성을 판단할 식별자 필드를 지정합니다. 모든 Entity에는 반드시 식별자가 있어야 하며 일반적으로 DB의 PRIMARY KEY 열과 매핑됩니다.",
      "필드 접근 방식에서는 필드에, 프로퍼티 접근 방식에서는 getter에 붙입니다. 한 Entity 안에서 접근 방식을 섞지 않는 것이 좋으며 복합 키는 @EmbeddedId 또는 @IdClass로 별도 구성합니다.",
    ],
    mechanics: [["Entity 등록", "JPA가 @Id가 붙은 속성을 식별자 매핑으로 해석합니다."], ["영속화", "식별자 값을 기준으로 새 Entity인지 기존 Entity인지 판단합니다."], ["조회와 동일성", "영속성 컨텍스트는 Entity 타입과 식별자 조합으로 관리 객체를 구분합니다."]],
    distinctions: [["@Id", "Entity 식별자와 DB 기본 키를 매핑합니다."], ["@EmbeddedId", "여러 값을 하나의 임베디드 객체로 묶어 복합 키로 사용합니다."], ["자연 키", "업무 의미가 있는 값이며 변경 가능성을 고려해야 합니다."], ["대리 키", "업무 의미 없이 식별만 담당하는 Long 등의 생성 키로 흔히 사용합니다."]],
    exampleTitle: "대리 키를 사용하는 Entity",
    language: "java",
    code: `@Entity
class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}`,
    checks: ["식별자 타입은 null을 표현할 수 있는 Long 같은 래퍼 타입을 많이 사용합니다.", "영속화된 Entity의 식별자를 임의로 변경하면 안 됩니다.", "equals와 hashCode에 생성 전 null 식별자를 사용할 때 컬렉션 동작을 주의해야 합니다."],
    relatedTopics: ["entity", "jpa", "jpa-relationships"],
  }),
  term({
    slug: "generated-value",
    name: "@GeneratedValue",
    category: "JPA 기본 매핑",
    summary: "Entity 식별자 값을 애플리케이션이 직접 넣지 않고 JPA 또는 데이터베이스가 생성하도록 설정합니다.",
    aliases: ["키 생성 전략", "IDENTITY", "SEQUENCE"],
    definition: [
      "@GeneratedValue는 @Id와 함께 사용해 식별자 생성 방식을 지정합니다. strategy에는 AUTO, IDENTITY, SEQUENCE, TABLE이 있으며 DB 종류와 쓰기 성능에 영향을 줍니다.",
      "IDENTITY는 INSERT 후 DB가 만든 값을 받아야 하므로 영속화 시점에 INSERT가 실행될 수 있습니다. SEQUENCE는 INSERT 전에 키를 확보할 수 있고 allocationSize로 여러 키를 미리 할당할 수 있습니다.",
    ],
    mechanics: [["전략 선택", "JPA 구현체가 strategy와 DB 방언을 기준으로 키 생성기를 결정합니다."], ["키 확보", "DB 자동 증가 열 또는 sequence에서 새 식별자를 얻습니다."], ["Entity 반영", "생성된 값을 @Id 필드에 넣고 영속성 컨텍스트에서 관리합니다."]],
    distinctions: [["IDENTITY", "DB의 자동 증가 열을 사용합니다. MySQL에서 흔히 사용합니다."], ["SEQUENCE", "DB sequence 객체를 사용하며 allocationSize 최적화가 가능합니다."], ["AUTO", "구현체와 DB가 적절한 전략을 선택합니다."], ["TABLE", "별도 키 관리 테이블을 사용하므로 경합과 추가 SQL 비용을 고려합니다."]],
    exampleTitle: "Sequence 생성 전략",
    language: "java",
    code: `@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "course_seq")
@SequenceGenerator(name = "course_seq", sequenceName = "course_seq", allocationSize = 50)
private Long id;`,
    checks: ["운영 DB가 선택한 생성 전략을 지원하는지 확인합니다.", "SEQUENCE의 allocationSize와 DB sequence 증가값을 일치시킵니다.", "IDENTITY는 JDBC batch insert와 쓰기 지연 방식에 제약을 줄 수 있습니다."],
    relatedTopics: ["entity", "jpa", "sql"],
  }),
  term({
    slug: "column",
    name: "@Column",
    category: "JPA 기본 매핑",
    summary: "Entity 필드와 테이블 열의 이름, 길이, null 허용 여부 등 열 매핑 정보를 지정합니다.",
    aliases: ["열 매핑", "nullable", "columnDefinition"],
    definition: [
      "@Column은 기본 규칙과 다른 열 이름이나 길이, 정밀도, 쓰기 가능 여부를 선언할 때 사용합니다. 생략하면 JPA의 기본 명명 규칙에 따라 필드가 열에 매핑됩니다.",
      "nullable, unique, length는 주로 스키마 생성용 메타데이터이며 애플리케이션 입력 검증을 대신하지 않습니다. 실제 운영 스키마 제약, Bean Validation, 도메인 규칙을 함께 맞춰야 합니다.",
    ],
    mechanics: [["매핑 분석", "JPA가 필드 타입과 @Column 속성으로 열 매핑을 구성합니다."], ["SQL 생성", "조회와 저장 SQL에서 매핑된 열 이름을 사용합니다."], ["스키마 검증", "설정에 따라 Entity 매핑과 실제 DB 스키마의 호환성을 검사합니다."]],
    distinctions: [["nullable=false", "DDL 생성 시 NOT NULL 힌트이며 Java 값의 사전 검증은 아닙니다."], ["unique=true", "단일 열 unique 제약 힌트입니다. 복합 unique는 @Table을 사용합니다."], ["length", "주로 String 기반 VARCHAR 길이에 사용합니다."], ["columnDefinition", "DB 종속 DDL을 직접 지정하므로 이식성이 낮아질 수 있습니다."]],
    exampleTitle: "명시적인 열 제약 매핑",
    language: "java",
    code: `@Column(name = "course_title", nullable = false, length = 100)
private String title;

@Column(precision = 12, scale = 2)
private BigDecimal price;`,
    checks: ["@Column(nullable=false)과 @NotNull의 적용 시점과 목적은 다릅니다.", "운영 스키마는 Flyway나 Liquibase 같은 migration으로 별도 관리하는 편이 안전합니다.", "insertable=false 또는 updatable=false를 사용하면 해당 SQL에서 필드가 제외됩니다."],
    relatedTopics: ["entity", "jpa", "validation", "sql"],
  }),
  term({
    slug: "one-to-one",
    name: "@OneToOne",
    category: "JPA 연관관계",
    summary: "한 Entity가 상대 Entity 하나와 일대일로 연결되는 연관관계를 매핑합니다.",
    aliases: ["1:1", "일대일 관계", "공유 기본 키"],
    definition: ["@OneToOne은 회원과 프로필처럼 양쪽 레코드가 최대 하나씩 대응하는 관계를 표현합니다. 외래 키를 가진 쪽이 보통 연관관계의 주인이며 @JoinColumn으로 외래 키 열을 지정합니다.", "일대일 관계는 외래 키에 UNIQUE 제약이 있어야 DB에서도 관계 수가 보장됩니다. 항상 함께 조회하는지, 선택 관계인지에 따라 테이블 통합이 더 단순할 수도 있습니다."],
    mechanics: [["외래 키 배치", "접근과 생명주기를 고려해 어느 테이블이 외래 키를 가질지 결정합니다."], ["주인 매핑", "외래 키 보유 쪽에 @OneToOne과 @JoinColumn을 선언합니다."], ["반대편 연결", "양방향이면 반대편에 mappedBy를 선언해 주인을 가리킵니다."]],
    distinctions: [["단방향", "한쪽 객체에서만 상대를 참조해 모델이 단순합니다."], ["양방향", "양쪽 탐색이 가능하지만 객체 관계를 함께 동기화해야 합니다."], ["공유 기본 키", "@MapsId로 상대 식별자를 외래 키이자 자신의 기본 키로 사용할 수 있습니다."], ["@ManyToOne", "여러 행이 같은 상대를 참조할 수 있으므로 UNIQUE 제약이 없습니다."]],
    exampleTitle: "회원과 프로필 일대일 매핑",
    language: "java",
    code: `@OneToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "profile_id", unique = true)
private Profile profile;`,
    checks: ["DB UNIQUE 제약 없이 애너테이션만으로 일대일을 보장한다고 가정하면 안 됩니다.", "일대일 지연 로딩은 연관 방향과 프록시 조건에 따라 기대대로 동작하지 않을 수 있습니다.", "양방향 편의 메서드는 양쪽 참조를 함께 설정해야 합니다."],
    relatedTopics: ["jpa-relationships", "entity", "jpa"],
  }),
  term({
    slug: "one-to-many",
    name: "@OneToMany",
    category: "JPA 연관관계",
    summary: "한 Entity가 여러 상대 Entity를 컬렉션으로 참조하는 일대다 연관관계를 매핑합니다.",
    aliases: ["1:N", "일대다 관계", "mappedBy"],
    definition: ["@OneToMany는 강좌가 여러 수강 신청을 갖는 관계처럼 컬렉션 연관관계를 표현합니다. 외래 키는 보통 다수 쪽 테이블에 있으므로 양방향 매핑에서는 mappedBy로 @ManyToOne 필드를 지정합니다.", "컬렉션 변경을 자식 행의 생명주기 변경으로 연결하려면 cascade와 orphanRemoval을 요구사항에 맞게 설정합니다. 이 옵션은 서로 의미가 다르며 무조건 함께 켜는 설정이 아닙니다."],
    mechanics: [["자식이 외래 키 보유", "다수 쪽 테이블이 부모 식별자를 외래 키로 저장합니다."], ["부모 컬렉션 매핑", "부모는 mappedBy로 자식의 주인 필드를 가리킵니다."], ["조회 전략 결정", "기본 LAZY 컬렉션을 필요한 조회에서 fetch join 등으로 명시적으로 로딩합니다."]],
    distinctions: [["mappedBy", "외래 키를 관리하는 상대 Entity의 필드 이름입니다."], ["cascade", "부모에 수행한 persist/remove 등을 자식에게 전파합니다."], ["orphanRemoval", "부모 컬렉션에서 제거되어 고아가 된 자식을 삭제합니다."], ["단방향 @OneToMany", "조인 테이블이나 추가 UPDATE가 생길 수 있어 SQL 구조를 확인해야 합니다."]],
    exampleTitle: "양방향 일대다 매핑",
    language: "java",
    code: `@OneToMany(mappedBy = "course", cascade = CascadeType.PERSIST)
private final List<Enrollment> enrollments = new ArrayList<>();

public void addEnrollment(Enrollment enrollment) {
    enrollments.add(enrollment);
    enrollment.assignCourse(this);
}`,
    checks: ["@OneToMany의 기본 fetch는 LAZY입니다.", "목록 조회에서 컬렉션을 반복 접근하면 N+1 쿼리가 발생할 수 있습니다.", "CascadeType.REMOVE와 orphanRemoval은 삭제 범위를 충분히 검토한 뒤 사용합니다."],
    relatedTopics: ["jpa-relationships", "entity", "jpa", "repository-query"],
  }),
  term({
    slug: "many-to-one",
    name: "@ManyToOne",
    category: "JPA 연관관계",
    summary: "여러 Entity가 하나의 상대 Entity를 참조하는 다대일 연관관계를 매핑합니다.",
    aliases: ["N:1", "다대일 관계", "외래 키 주인"],
    definition: ["@ManyToOne은 주문 여러 개가 회원 한 명을 참조하는 것처럼 관계형 DB에서 가장 흔한 외래 키 구조를 객체 참조로 표현합니다. 외래 키를 가진 다수 쪽이 연관관계의 주인입니다.", "기본 fetch가 EAGER이므로 실무에서는 필요한 시점에 조회하도록 LAZY를 명시하는 경우가 많습니다. 다만 LAZY만 선언한다고 N+1 문제가 자동 해결되는 것은 아닙니다."],
    mechanics: [["외래 키 매핑", "@JoinColumn으로 다수 쪽 테이블의 외래 키 열을 지정합니다."], ["참조 설정", "Entity 필드에 상대 Entity 참조를 대입하면 flush 때 외래 키 값으로 반영됩니다."], ["지연 조회", "LAZY이면 실제 참조 접근 시 프록시 초기화를 위한 SELECT가 실행될 수 있습니다."]],
    distinctions: [["@ManyToOne", "다수 쪽의 단일 객체 참조이며 외래 키를 직접 관리합니다."], ["@OneToMany", "하나 쪽의 컬렉션 탐색이며 보통 mappedBy를 사용합니다."], ["LAZY", "참조가 필요할 때 조회하지만 트랜잭션 범위와 N+1을 고려해야 합니다."], ["EAGER", "즉시 로딩 계약이 불필요한 조인이나 추가 SELECT를 만들 수 있습니다."]],
    exampleTitle: "수강 신청에서 강좌 참조하기",
    language: "java",
    code: `@ManyToOne(fetch = FetchType.LAZY, optional = false)
@JoinColumn(name = "course_id", nullable = false)
private Course course;`,
    checks: ["@ManyToOne의 기본 EAGER 대신 LAZY 사용 여부를 의식적으로 결정합니다.", "Entity를 응답 JSON으로 직접 반환하면 프록시 초기화와 순환 참조 문제가 생길 수 있습니다.", "연관관계 변경은 주인인 @ManyToOne 필드의 값을 바꿔야 DB 외래 키에 반영됩니다."],
    relatedTopics: ["jpa-relationships", "entity", "jpa", "transaction"],
  }),
  term({
    slug: "many-to-many",
    name: "@ManyToMany",
    category: "JPA 연관관계",
    summary: "양쪽 Entity가 서로 여러 개와 연결되는 다대다 관계를 조인 테이블로 매핑합니다.",
    aliases: ["N:M", "다대다 관계", "Join Table"],
    definition: ["@ManyToMany는 학생과 강좌처럼 양쪽이 여러 상대와 연결되는 관계를 중간 조인 테이블로 표현합니다. @JoinTable로 조인 테이블과 양쪽 외래 키를 지정할 수 있습니다.", "실무에서는 연결 자체에 신청일, 상태, 순서 같은 속성이 생기는 경우가 많아 조인 테이블을 Enrollment 같은 독립 Entity로 승격하고 두 개의 @ManyToOne으로 풀어내는 방식을 권장합니다."],
    mechanics: [["조인 테이블 생성", "중간 테이블이 양쪽 Entity의 외래 키 조합을 저장합니다."], ["주인 선택", "한쪽에서 @JoinTable을 정의하고 반대편은 mappedBy로 연결합니다."], ["컬렉션 변경", "주인 컬렉션의 추가와 제거가 조인 테이블 INSERT/DELETE로 반영됩니다."]],
    distinctions: [["직접 @ManyToMany", "연결에 별도 속성이 없고 단순할 때만 제한적으로 적합합니다."], ["연결 Entity", "조인 테이블을 Entity로 만들면 속성, 식별자, 변경 이력을 자연스럽게 다룰 수 있습니다."], ["Set", "중복 관계를 막는 데 유리하지만 equals/hashCode 설계가 중요합니다."], ["List", "순서와 중복 의미를 검토해야 하며 삭제 SQL 동작도 확인해야 합니다."]],
    exampleTitle: "연결 Entity로 풀어낸 다대다",
    language: "java",
    code: `@Entity
class Enrollment {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;
}`,
    checks: ["요구사항이 커질 가능성이 있다면 직접 @ManyToMany보다 연결 Entity를 우선 검토합니다.", "CascadeType.REMOVE가 상대 Entity 자체를 삭제하지 않는지 특히 주의합니다.", "조인 테이블에는 두 외래 키의 복합 UNIQUE 제약과 조회 인덱스를 검토합니다."],
    relatedTopics: ["jpa-relationships", "entity", "jpa", "sql"],
  }),
  term({
    slug: "jpa-query-methods",
    name: "JPA 쿼리 메소드",
    category: "Spring Data JPA",
    summary: "Repository 메소드 이름, @Query, Pageable 등을 이용해 조회 조건과 반환 형태를 선언하는 Spring Data JPA 기능입니다.",
    aliases: ["Query Methods", "Derived Query", "쿼리 메서드"],
    definition: ["쿼리 메소드는 정확히는 JPA 표준 자체가 아니라 Spring Data JPA가 제공하는 Repository 기능입니다. findByTitleContaining처럼 정해진 이름 규칙을 분석해 JPQL과 SQL을 생성합니다.", "간단한 고정 조건은 메소드 이름으로 표현하고, 이름이 지나치게 길거나 조인·집계가 필요하면 @Query, Specification, QueryDSL 또는 별도 Repository 구현을 선택합니다."],
    mechanics: [["메소드 분석", "Subject(find, exists, count, delete)와 By 뒤의 조건 속성을 파싱합니다."], ["속성 경로 확인", "Entity 메타데이터에서 필드와 연관관계 경로가 유효한지 시작 시점에 검사합니다."], ["쿼리 실행", "파라미터를 바인딩하고 반환 타입에 맞게 단건, 목록, Slice 또는 Page 결과를 만듭니다."], ["SQL 확인", "Hibernate가 생성한 실제 SQL과 실행 계획을 확인해 성능을 검증합니다."]],
    distinctions: [["Derived Query", "findByStatusAndTitleContaining처럼 이름으로 조건을 만듭니다."], ["@Query", "JPQL 또는 native SQL을 직접 선언해 복잡한 조회를 명확히 표현합니다."], ["Page", "전체 개수를 위한 count 쿼리를 추가 실행합니다."], ["Slice", "다음 페이지 존재 여부만 확인해 count 쿼리를 피할 수 있습니다."], ["Optional<T>", "0개 또는 1개가 예상되는 단건 결과에 사용합니다."], ["List<T>", "0개 이상 결과를 반환하며 결과가 없으면 빈 목록입니다."]],
    exampleTitle: "이름 기반 조회와 페이징",
    language: "java",
    code: `public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findBySlug(String slug);

    List<Course> findTop10ByPublishedTrueOrderByCreatedAtDesc();

    Slice<Course> findByTitleContainingIgnoreCase(
        String keyword,
        Pageable pageable
    );

    boolean existsBySlug(String slug);
}`,
    checks: ["Entity 필드명이 바뀌면 메소드 이름도 함께 수정해야 하며 잘못된 경로는 시작 시 오류가 날 수 있습니다.", "And와 Or를 섞은 긴 이름은 우선순위가 읽기 어려우므로 @Query나 다른 조회 도구를 검토합니다.", "연관관계 조건은 암시적 join과 N+1을 만들 수 있으므로 실제 SQL을 확인합니다.", "deleteBy 메소드는 영향 범위와 트랜잭션을 확인하고, 대량 작업은 벌크 쿼리를 별도로 고려합니다.", "Page가 생성하는 count 쿼리가 복잡한 조회에서 병목이 되지 않는지 확인합니다."],
    relatedTopics: ["repository-query", "repository", "jpa", "pagination"],
  }),
];

if (typeof window !== "undefined") {
  window.SPRING_TERMS = SPRING_TERMS;
}

if (typeof module !== "undefined") {
  module.exports = { SPRING_TERMS };
}
