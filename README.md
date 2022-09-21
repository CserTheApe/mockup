# Mockup [![NPM version](https://img.shields.io/npm/v/mockup-get-server.svg?style=flat)](https://www.npmjs.com/package/mockup-get-server) [![NPM monthly downloads](https://img.shields.io/npm/dm/mockup-get-server.svg?style=flat)](https://npmjs.org/package/mockup-get-server) [![NPM total downloads](https://img.shields.io/npm/dt/mockup-get-server.svg?style=flat)](https://npmjs.org/package/mockup-get-server)

Create a mock server for GET requests using a JSON file.

---

Run the program as follows:
`node mockup sample.json`

Replace `sample.json` with the path to the file containing your schema.

<h4>OR</h4>

Install and use as a package with `npm install mockup-get-server`

Use it in your program as:

```
const serve = require('mockup-get-server');

serve(data);
```

Here, data is an object array or a JSON string of one.

---

## JSON schema

The JSON file, string or object passed must be an array of objects (corresponding to each API endpoint) with the relevant parameters described below.

### Parameters

- `path`: gives the relative URI path for the API endpoint

- `data`: the JSON data to be returned by the endpoint (can be an array)

- `count` (default: `10`): when returning an array, determines the number of objects returned

---

### Placeholders

Placeholders are of the form `{variableName}` and can be replaced with URL parameter data. Placeholders placed in strings in the `data` field of the schema will be replaced with the data passed via URL parameters to that endpoint.

For example, if we have `User-{id}` in the schema and the value for `id` passed in the url is `42`, then the corresponding response will be `User-42`.

---

## Data

The API returns JSON data as objects or arrays depending on the `data` parameter provided in the input JSON file.

### Output data

#### Single object

If the `data` key contains an object, that object is returned by its corresponding endpoint on every call.

##### Example

###### Schema:

```
{
    "path": "/user",
    "data": {
      "name": "Josin",
      "powerLevel": "9001"
    }
}
```

###### Response:

```
{
    "name": "Josin",
    "powerLevel": "9001"
}
```

#### Object array

If `data` is an array, then the JSON response will be an array populated with the objects in the above mentioned array.

The `count` parameter will determine the number of objects returned.

If `count` exceeds the number of objects in the input array, iterative duplication will be used to fill the object count.

##### Example

###### Schema:

```
{
    "path": "/games",
    "count": 3,
    "data": [
      {
        "name": "Mario"
      },
      {
        "name": "Pokemon"
      }
    ]
}
```

###### Response:

```
[
    {
        "name": "Mario"
    },
    {
        "name": "Pokemon"
    },
    {
        "name": "Mario"
    }
]
```

---

### Input data

Placeholders in the `data` field in the JSON schema will be replaced with input provided by the user via URL parameters.

##### Example

###### Schema:

```
{
  "path": "/gamers/:num",
  "count": 4,
  "data": [
    {
      "name": "Casual Player",
      "games": ["Mario-{num}", "Poke{num}mon"]
    },
    {
      "name": "NoobMaster {num}",
      "games": [
        {
          "name": "Pukemon",
          "timesPlayed": 6
        },
        {
          "name": "Barfio{num}",
          "timesPlayed": 11
        }
      ]
    }
  ]
}
```

###### Query:

```
http://localhost:9000/gamers/69
```

###### Response:

```
[
    {
        "name": "Casual Player",
        "games": [
            "Mario-69",
            "Poke69mon"
        ]
    },
    {
        "name": "NoobMaster 69",
        "games": [
            {
                "name": "Pukemon",
                "timesPlayed": 6
            },
            {
                "name": "Barfio69",
                "timesPlayed": 11
            }
        ]
    },
    {
        "name": "Casual Player",
        "games": [
            "Mario-69",
            "Poke69mon"
        ]
    },
    {
        "name": "NoobMaster 69",
        "games": [
            {
                "name": "Pukemon",
                "timesPlayed": 6
            },
            {
                "name": "Barfio69",
                "timesPlayed": 11
            }
        ]
    }
]
```
