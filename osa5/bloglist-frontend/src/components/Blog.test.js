import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



describe('Blogctests', () => {

    const blog = {
        title: "title test",
        author: "author test",
        url: "url test",
        likes: 1
    }
    
    let mockUpdate = jest.fn()
    let mockDelete = jest.fn()

    test('renders content', () => {
        render(<Blog blog={blog}  updateBlog={mockUpdate} deleteBlog={mockDelete}/>)

        const element = screen.getByText('title test - author test')
        expect(element).toBeDefined()
    })

    test('blogs URL and number of likes are shown when the button controlling the shown details has been clicked', () => {
        const component = render(<Blog blog={blog}  updateBlog={mockUpdate} deleteBlog={mockDelete}/>)

        const button = component.getByText('view')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent(
            'url test'
        )
        expect(component.container).toHaveTextContent(
            '1'
        )
    })
    test('clicking like calss updateBlog twice', async () => {
        const component = render(<Blog blog={blog}  updateBlog={mockUpdate} deleteBlog={mockDelete}/>)


        const user = userEvent.setup()

        const view = component.getByText('view')
        fireEvent.click(view)

        const button = screen.getByText('like')
        await user.click(button)
        await user.click(button)

        expect(mockUpdate.mock.calls).toHaveLength(2)
    })
})