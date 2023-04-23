import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

test('Submitting blogform gives right values to the function given in props', async () => {
  const createBlog = jest.fn()

  const user = userEvent.setup()

  const { container } = render(
    <BlogForm BlogCreator={createBlog} />
  )

  const inputT = container.querySelector('#title')
  const inputU = container.querySelector('#url')
  const inputA = container.querySelector('#author')
  const sendButton = screen.getByText('create')

  await user.type(inputT, 'testing a title')
  await user.type(inputA, 'testing an author')
  await user.type(inputU, 'testing an url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing an author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing an url')
})