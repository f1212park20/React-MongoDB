<div align='center'>
  <h1>DB Connect</h1>
</div>

<div align='center'>
  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">

  </br>
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
</div>


<div align='center'>
  <h1>1.설치명령어</h1>
  <table>
    <tr>     
        <td>npm install bootstrap</td>
        <td>npm install axios</td>
        <td>npm install express mysql body-parser multer</td>
        <td>npm install mongodb</td>       
    </tr>
  </table>  
</div>

<div align='center'>
  <h1>2. 설정</h1>
  <table>
    <tr>packjson.js 파일 설정</tr>
    <td>
      "scripts": { 
      "start": "react-scripts start", </br>  
      "build": "react-scripts build", </br> 
      "dev": "concurrently \"npm run server\" \"npm start\"", </br>  
      "server": "node server.js",</br>
      "test": "react-scripts test",</br>
      "eject": "react-scripts eject" </br>     
      },
    </td>
  </table>
</div>


<div align='center'>
  <h1>3.수정 코드</h1>
  <table>
    <tr>packjson.js 파일에  uploads 파일 생성 코드 추가 </tr>
    <td>
      const Storage = multer.diskStorage({
      destination: function (req, file, cb) {</br>  
        const uploadDir = 'uploads/';</br>  
        if (!fs.existsSync(uploadDir)) {</br>  
          fs.mkdirSync(uploadDir);</br>  
        }</br>  
        cb(null, uploadDir);</br>  
      },</br>  
      filename: function (req, file, cb) {</br>  
        cb(null, Date.now() + '-' + file.originalname);</br>  
      },</br>  
    });
    </td>
  </table>
</div>

<div align='center'>
  <h1>4.기본지식</h1>
  <table>
    <tr>restful api</tr>
    <td>
      GET:화면단 출력</br> 
      POST:데이터 전송</br>  
      PUT: 데이터 업데이트</br>  
      DELETE:데이터 삭제</br>  
    </td>
  </table>
</div>

