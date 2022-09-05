# Mockup

---

Create a mock server using a JSON file.

Pass a JSON file with the api schema to the program to generate a server corresponding to the json schema. The file must contain an array of objects corresponding to each endpoint you want.

Run the program as follows:
`node mockup.js sample.json`

Replace `sample.json` with the path to the file containing your schema

---

## JSON schema

### Data

The API returns JSON data as objects or arrays depending on the `data` parameter provided in the input JSON file.

#### Single Object

If the `data` key contains an object, that object is returned by its corresponding endpoint on every call.

##### Example

```
{
    "path": "/user",
    "data": {
      "name": "Josin",
      "powerLevel": "9001"
    }
  }
```

#### Object array

If `data` is an array, then the JSON response will be an array populated with the objects in the above mentioned array.

The `count` parameter will determine the number of objects returned.

If `count` exceeds the number of objects in the input array, iterative duplication will be used to fill the object count.

```
{
    "path": "/users",
    "data": [
      {
        "name": "User",
        "powerLevel": "100"
      }
    ]
  }
```

<hr />

### Parameters

- `path`: gives the relative URI path for the API endpoint

- `data`: the JSON data to be returned by the endpoint (can be an array)

- `count` (default: `10`): when returning an array, determines the number of objects returned
