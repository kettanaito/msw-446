import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import App, { API_URL } from './App'

const server = setupServer(
  rest.get(`${API_URL}/brands`, (req, res, ctx) => {
    return res(
      ctx.json({
        cursor: 'super-cursor',
        data: [
          { id: 1, title: 'Lu' },
          { id: 2, title: 'Milka' },
        ],
      })
    )
  })
)

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

describe('my test', () => {
  it("should render 'no data' text when list of item is empty", async () => {
    server.use(
      rest.get(`${API_URL}/brands`, (req, res, ctx) => {
        return res(
          ctx.json({
            cursor: 'super-cursor',
            data: [],
          })
        )
      })
    )

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('No data')).toBeInTheDocument()
    })
  })

  it('should pop the error message when request failed', async () => {
    const message = 'Something happen!'
    server.use(
      rest.get(`${API_URL}/brands`, (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message }))
      })
    )

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(message)).toBeInTheDocument()
    })
  })
})
