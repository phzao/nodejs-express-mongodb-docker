'use strict';

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: 'phbotelho@gmail.com',
        subject: subject,
        html: body
    });
}


// curl -i -X POST \
//   --url http://localhost:8001/services/ \
//   --data 'name=category-microservice' \
//   --data 'url=http://172.24.0.1:8888'

//   curl -i -X POST \
// --url http://localhost:8001/services/category-microservice/routes \
// --data 'hosts[]=172.24.0.1' \
// --data 'paths[]=/api/v1/categories' \
// --data 'strip_path=false' \
// --data 'methods[]=GET'

// curl -i -X POST \
//   --url http://localhost:8001/services/category-microservice/routes \
//   --data 'hosts[]=localhost'

// curl -i -X POST \
//   --url http://localhost:8001/services/category-microservice/plugins/ \
//   --data 'name=key-auth'

// curl -i -X POST \
//   --url http://localhost:8001/consumers/ \
//   --data "username=Phz"

// curl -i -X POST \
//   --url http://localhost:8001/consumers/Phz/key-auth/ \
//   --data 'key=ENTER_KEY_HERE'

//   curl -i -X GET \
//   --url http://localhost:8000/api/v1/categories \
//   --header 'Host: localhost'

// curl http://localhost:8001/apis/ \
//      -d "name=category-microservice" \
//      -d "request_path=/api/v1/categories" \
//      -d "strip_request_path=true" \
//      -d "upstream_url=http://172.24.0.2"

// curl -i -X GET \
//      --url http://172.24.0.1:8000/api/v1/categories \
//      --header 'Host: 172.24.0.1'

// curl -X POST http://172.24.0.1:8001/consumers \
//   --data "username=consumer1" \
//   --data "custom_id=101"