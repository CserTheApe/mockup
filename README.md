# Mockup

Create a mock server using a JSON file.

Pass a JSON file with the api schema to the program to generate a server corresponding to the json schema. The file must contain an array of objects corresponding to each endpoint you want.

Run the program as follows:
`node mockup.js sample.json`

Replace `sample.json` with the path to the file containing your schema

---

## JSON schema

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
