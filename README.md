## Related Repositories

<table>
<thead>
  <tr>
    <th>플랫폼</th>
    <th><a href="https://github.com/K-PaaS/cp-deployment">컨테이너 플랫폼</a></th>
    <th><a href="https://github.com/K-PaaS/sidecar-deployment">사이드카</a></th>
  </tr>
</thead>
<tbody>
  <tr>
    <td align="center">포털</td>
    <td align="center"><a href="https://github.com/K-PaaS/cp-portal-release">CP 포털</a></td>
    <td align="center"><a href="https://github.com/K-PaaS/sidecar-deployment/tree/master/install-scripts/portal">사이드카 포털</a></td>
  </tr>
  <tr>
    <td rowspan="8">Component <br>/서비스</td>
    <td align="center"><a href="https://github.com/K-PaaS/cp-portal-ui">Portal UI</a></td>
    <td align="center"><a href="https://github.com/K-PaaS/sidecar-portal-ui">🚩Portal UI</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-portal-api">Portal API</a></td>
    <td align="center"><a href="https://github.com/K-PaaS/sidecar-portal-api">Portal API</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-portal-common-api">Common API</a></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-metrics-api">Metric API</a></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-terraman">Terraman API</a></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-catalog-api">Catalog API</a></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-chaos-api">Chaos API</a></td>
    <td align="center"></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/K-PaaS/cp-chaos-collector">Chaos Collector API</a></td>
    <td align="center"></td>
  </tr>
</tbody></table>
<i>🚩 You are here.</i>

<br>

## K-PaaS Sidecar Portal UI
K-PaaS 사이드카 포털 UI입니다.
- [시작하기](#시작하기)
  - [사이드카 Portal UI 빌드 방법](#사이드카-Portal-UI-빌드-방법)
- [문서](#문서)
- [개발 환경](#개발-환경)
- [라이선스](#라이선스)

<br>

## 시작하기
K-PaaS 사이드카 Portal UI가 수행하는 애플리케이션 관리 작업은 다음과 같습니다.
- 사이드카 자원 관리
- 권한 관리
- 사용자 관리

#### 사이드카 Portal UI 빌드 방법
K-PaaS 사이드카 Portal UI 소스 코드를 활용하여 로컬 환경에서 빌드가 필요한 경우 다음 명령어를 입력합니다.
```
$ gradle build
```

<br>

## 문서
- 사이드카 활용에 대한 정보는 [K-PaaS 사이드카](https://github.com/K-PaaS/sidecar-quide)을 참조하십시오. 

<br>

## 개발 환경
K-PaaS 사이드카 Portal UI의 개발 환경은 다음과 같습니다.

| Situation                      | Version |
| ------------------------------ | ------- |
| JDK                            | 8       |
| Gradle                         | 6.9.2   |
| Spring Boot                    | 2.7.3   |
| Spring Boot Management         | 1.0.11.RELEASE  |
| Spring Security Tag Libs       | 5.3.3.RELEASE   |
| Tomcat Embed Core              | 9.0.65  |
| Jstl                           | 1.2     |
| Apache Tiles                   | 3.0.5   | 
| Jsp                            | 2.3.1   |
| Gson                           | 2.8.6   |
| Lombok                         | 1.18.12 |
| Swagger	                     | 2.9.2   |

<br>

## 라이선스
K-PaaS 사이드카 Portal UI는 [Apache-2.0 License](http://www.apache.org/licenses/LICENSE-2.0)를 사용합니다.
