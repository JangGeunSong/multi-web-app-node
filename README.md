# SNS like clone web application

# 1. 개요 
이 프로젝트는 **graphQL(with apollo)**, **react.js**, **node.js** 그리고 **MongoDB**를 사용하여 제작한 웹 애플리케이션 입니다.  
사용자 정보 및 글들의 기본적인 데이터 교환은 GraphQL을 활용하여 진행됩니다. 이 프로젝트는 100% Javascript와 Typescript를 사용하여 개발되었습니다.  
아울러 실제 배포되어 접속하실 수 있으며 배포에 관련된 부분들은 Amazon Web Service(AWS)를 통해 직접 설정하고 연결하여 개발했습니다.

개발기간 : 2019.07.18 ~ 2019.12.04(실제 배포일)  
(추가적인 개발내용이 보강될 수 있습니다.)  

서버파트 Typescript 변경 완료 : 2019.12.17  
Server & client side package upgrade by 2019.12.19 (컴포넌트 테스트를 위해)

현재 애플리케이션 버전 v1.0.0  

접속주소: <https://songjanggeun.net>  
자세한 사항은 [4. Deploy](#4-deploy)에서 확인
# 2. 실행 방법
- 서버 폴더에서
>npm i
>npm start

- 클라이언트 폴더에서
>npm i
>npm run dev

이 명령을 통해 서버와 클라이언트 파트에서 각각 필요한 패키지들을 다운 받고 실행하면 됩니다.  

#### Caution
이 애플리케이션은 AWS등을 활용하여 외부에 연결된 부분이 존재하기 때문에 바로 npm install을 한다고 해서 바로 실행되지는 않습니다.  
특히, MongoDB와 관련된 파일들은 nodemon.json 파일을 생성하여 정보가 들어나지 않는 방식으로 처리했습니다.  
또, AWS의 연결도 완전히 비밀로 보장해야 하는 팔일로 구성되어 있기 때문에 사전에 설치해야할 부분들이 존재합니다.  
# 3. 외부 라이브러리 사용
## 1. 서버 파트 사용 기술
### Typescript
Typescript를 활용하여 서버 내부에 동작하는 코드들을 만들어둔 모듈을 돌아다니며 찾아갈 필요 없도록 처리하였습니다.  
특히 서버 내부에서 모듈을 불러올때 es6의 문법인 **import * as from 'module_name'** 을 활용하여 프론트엔드의 코드와 통일성을 가지게 되었습니다.

### MongoDB 
NoSQL DB를 사용하여 사용자 정보와 사용자가 업로드한 글의 내용들을 저장하는데 활용했습니다. 

### json web token
Authentication을 할때 토큰관련 처리를 위해 도입하였습니다.

###  bcryptjs
비밀번호등 민감한 정보를 사용자가 지정한 대로 DB에 바로 저장하지 않고 해쉬화 해서 저장하기 위해 사용했습니다.

###  GraphQL
서버와 클라이언트 사이의 데이터 송 수신 과정에서 필요한 정보만 선별하여 가져올 수 있는 GraphQL을 도입하였습니다.

###  Apollo Server
GraphQL을 활용하는데 서버파트인 Express와 클라이언트 파트인 ReactJS에 간편한 통신을 위해 도입하였습니다.  
사용자의 정보를 쿠키를 통해 전달합니다. Http only 이므로 클라이언트 파트에서 직접적으로 쿠키에 접근하는것을 방어합니다.

###  AWS S3
어느 환경에서나 필요한 이미지를 즉시 불러올 수 있도록 프론트엔드 파트이서 전달한 파일 자료들을 저장하여 불러 올 수 있도록 AWS의 S3서비스를 활용 하였습니다.

## 2. 프론트엔드 파트 사용 기술
### ReactJS
앱의 프론트엔드 파트제작을 담당하며 컴포넌트의 유지 및 보수를 편리하게 하기 위해 사용했습니다.

### Typescript
프론트엔드 부분의 코드량이 늘어남에 따라 컴파일 전에 오류를 미리 체크할 수 있는 Typescript를 도입하여 프로젝트를 관리하였습니다.

### Apollo Client
GraphQL을 활용하는데 서버파트인 Express와 클라이언트 파트인 ReactJS에 간편한 통신을 위해 도입하였습니다.  
사용자의 정보를 쿠키를 통해 전달합니다. 받은 쿠키는 직접적으로 접근할 수 없으며 1시간의 쿠키가 만료되는 순간 자동으로 삭제됩니다.

### Next.JS
ReactJS의 멀티 페이지 렌더링을 활용하기 위해 이를 중계해주는 Next.JS를 활용하였습니다.

### Sass
프론트 엔드단의 디자인을 개선하고 프로그래밍적 논리를 더하기 위해 CSS의 전처리기인 Sass를 사용하였습니다.  
반응형 웹을 개발하는데 활용합니다.

#  3. DEV OPS
### AWS EC2
항상 실행되는 서버컴퓨터를 만들어 활용하기 위해 AWS EC2의 인스턴스를 만들어 서버를 실행합니다.

### AWS ROUTE53
프로젝트의 실제 연결되는 도메인을 ROUTE53을 통해 구매하고 연결하여 사용하고 있습니다. SSL과 관련한 인증서의 연결또한 이 서비스를 활용하여 연결하였습니다.

### AWS Certificate Manager
프로젝트가 실제 배포 환경에서 통신정보의 보호와 안전을 위해 HTTPS를 사용할 필요가 있고, 이를 관리해주는 서비스인 ACM을 사용하였습니다.  ROUTE53에서 구매한 도메인을 연결하고 이 도메인에 인증서를 요청하여 발급받아 활용하였습니다.

# 4. Deploy
Amazon Web Service 의 EC2를 사용하여 웹 배포를 진행했습니다.  
주소 : <https://songjanggeun.net> 으로 연결되었습니다.  
이 링크를 타고 들어가면 배포된 앱을 바로 사용할 수 있습니다.  
SSL을 연결한 상태입니다.  
인증서는 AWS에서 요청하여 발급받은 인증서를 사용하고 있습니다.  

# 5. 개발 환경
OS: Microsoft windows 10 pro  
SERVER: NODE.js v12.13.1, npm v6.13.3  
EDITOR: Visual Studio code v1.40.2  
