## Description

API for generating and comparing lorem ipsum text built on Nest.js framework. Text is compared using [Dice coefficient](https://en.wikipedia.org/wiki/S%C3%B8rensen%E2%80%93Dice_coefficient)
 
  
## API Endpoints

**Error response:**
In case of error API returns response containing status code and message
**Example:**
```
{
    "statusCode": 500,
    "message": "Internal server error"
}
```


### GET /api/generator/generate?n=[numberOfWords]

**Response:**
```
{
	"result": string
}
```

**Example**

GET /api/generator/generate?n=10
```
{
	"result": "ad consequat ad proident minim officia nulla esse laboris in"
}
```

### POST /api/report/create
**Request:**
```
{
    "id": string(uuid), //action id of request which is used to fetch report after processing
    "firstText": string, //first text to compare
    "secondText": string //second text to compare
}
```


**Response:**
201 Created status with no body
**Example**

POST /api/report/create
```
{
    "id": "ca89d800-f66c-4b2a-aaa9-39c79fa6685b",
    "firstText": "labore excepteur ipsum sunt id eu qui id deserunt ea excepteur id officia elit eiusmod mollit cupidatat proident amet cillum aute ipsum irure qui ullamco irure aliquip non do tempor consequat fugiat irure pariatur veniam commodo nostrud aliquip voluptate nisi proident nisi ex dolor dolore amet est incididunt est sunt",
    "secondText": "cupidatat officia officia aliqua in elit in consectetur mollit exercitation nisi ex est adipisicing voluptate consequat velit culpa duis reprehenderit irure ut eiusmod ullamco ex consectetur voluptate ad nulla cillum est pariatur incididunt deserunt deserunt anim anim ad amet incididunt dolor aute laboris officia esse velit pariatur voluptate eu sunt"
}
```

### GET /api/report/fetch?id=[reportId]
Used for fetching previously created report
**Response:**
```
{
    "firstText": string,
    "secondText": string,
    "status": string, // 
	    'created' (if report is still being processed), 
	    'rejected' (if report cannot be processed),
	    'processed' (report processing done)
    "processedDateTime": string(date) //null if status is not 'processed',
    "result": string //null if status is not 'processed',
}

```

**Example:**
GET /api/report/fetch?id=ca89d800-f66c-4b2a-aaa9-39c79fa6685b

```
{
    "firstText": "labore excepteur ipsum sunt id eu qui id deserunt ea excepteur id officia elit eiusmod mollit cupidatat proident amet cillum aute ipsum irure qui ullamco irure aliquip non do tempor consequat fugiat irure pariatur veniam commodo nostrud aliquip voluptate nisi proident nisi ex dolor dolore amet est incididunt est sunt",
    "secondText": "cupidatat officia officia aliqua in elit in consectetur mollit exercitation nisi ex est adipisicing voluptate consequat velit culpa duis reprehenderit irure ut eiusmod ullamco ex consectetur voluptate ad nulla cillum est pariatur incididunt deserunt deserunt anim anim ad amet incididunt dolor aute laboris officia esse velit pariatur voluptate eu sunt",
    "status": "processed",
    "processedDateTime": "2022-02-10T07:45:34.067Z",
    "result": "0.8333333333333334"
}
```
