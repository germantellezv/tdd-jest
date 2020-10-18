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
          // Due in the endpoint we run 'res.status(200).send(data)', we see that send is a method of status.
          // Then, status must return This (res). Hence, we use .mockReturnThis() method 
          // in 'status' property to return 'res' and so we can nest the 'send' method to 'status'
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

    describe("PUT", () => {
      it("Update resource", async () => {
        const axios = {
          put: jest.fn()
        }
        const req = {
          body: 'request body',
          params: {
            id: 12
          }
        }
        const res = {
          sendStatus: jest.fn()
        }
        
        await handlers({ axios }).put(req, res)

        expect(axios.put.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/12','request body']])
        expect(res.sendStatus.mock.calls).toEqual([[204]])
      })
    })

    describe("DELETE", () => {
      it("Delete resource", async () => {
        const axios = {
          delete: jest.fn()
        }
        const req = {
          params: {
            id: 11
          }
        }
        const res = {
          sendStatus: jest.fn()
        }

        await handlers({ axios }).delete(req, res)
        expect(axios.delete.mock.calls).toEqual([['https://jsonplaceholder.typicode.com/users/11']])
        expect(res.sendStatus.mock.calls).toEqual([[204]])

      })
    })

  })
})