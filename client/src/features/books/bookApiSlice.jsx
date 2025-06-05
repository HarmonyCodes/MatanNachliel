import apiSlice from '../../app/apiSlice';

const bookApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getBooks: build.query({
            query: () => ({ url: 'Books' }),
            providesTags: ['Books'],
        }),
        getBookById: build.query({
            query: (id) => `Books/${id}`,
            //  providesTags: (result, error, id) => [{ type: 'Book', id }],
        }),
        getBookByName: build.query({
            query: (name) => `Books/${name}`
        }),
        getBookByAuthor: build.query({
            query: (author) => `Books/${author}`
        }),
        getBookByCode: build.query({
            query: (code) => `Books/${code}`
        }),
        getBookBySubject: build.query({
            query: (subject) => `Books/${subject}`
        }),
        getBookByCategory: build.query({
            query: (category) => `Books/${category}`
        }),
        addBook: build.mutation({
            query: (newBook) => ({
                url: 'Books',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: build.mutation({
            query: ({ id, ...updatedBook }) => ({
                url: `Books/${id}`,
                method: 'PUT',
                body: updatedBook,
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: build.mutation({
            query: ({ id }) => ({
                url: `Books`,
                method: 'DELETE',
                body: { id: id }
            }),
            invalidatesTags: ['Books']
        }),
    }),
});
export const {
    useGetBooksQuery,
    useGetBookByIdQuery,
    useGetBookByNameQuery,
    useGetBookByAuthorQuery,
    useGetBookByCodeQuery,
    useGetBookBySubjectQuery,
    useGetBookByCategoryQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation,
} = bookApiSlice;