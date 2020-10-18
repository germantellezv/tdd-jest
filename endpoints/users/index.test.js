const handlers = require('./index')

describe("Endpoints", () => {
  describe("Users", () => {
    describe("GET", () => {
      it('Return to user json', async () => {
        const axios = {
          // This is the GET method indicated in the endpoint like axios.get('url...')
          // In the endpoint we have a const { data }, here we're saying that get method return { data: 1 }.
          get: jest.fn().mockResolvedValue({ data: 1 }),
        }
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }
        // we pass axios and pass 'req'({}) and 'res' arguments to the get method of handlers const (local import)
        await handlers({ axios }).get({}, res)
        // Now we expect the 'status' and 'send' values from the response 'res'
        // The status value is the value that we pass it in the endpoint like '200'
        // The send value is the value that we passed it in the endpoint like 'data'
        expect(res.status.mock.calls).toEqual([[200]])
        expect(res.send.mock.calls).toEqual([[1]])

      })
    })

    describe("POST", () => {
      it("Create resource", async () => {
        const axios = {
          post: jest.fn().mockResolvedValue({ data: 1 }),
        }
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn()
        }

        const req = {
          body: 'request body'
        }
        await handlers({ axios }).post(req, res)
        expect(res.status.mock.calls).toEqual([[200]])
        expect(res.send.mock.calls).toEqual([[1]])
        expect(axios.post.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users', 'request body']])
      })
    })

  })
})