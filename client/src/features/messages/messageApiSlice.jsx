import  apiSlice  from '../../app/apiSlice';

const messageApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getMessages: build.query({
            query: () => ({ url: 'Messages' }),
            providesTags:["Messages"]
        }),
        getMessageById: build.query({
            query: (id) => `Messages/${id}`
        }),
        getMessageByName: build.query({
            query: (name) => `Messages/${name}`
        }),
        getMessageBySubject: build.query({
            query: (subject) => `Messages/${subject}`
        }),
        
        addMessage: build.mutation({
            query: (newMessage) => ({
                url: 'Messages',
                method: 'POST',
                body: newMessage,
            }),
            invalidatesTags:["Messages"]
        }),
        updateMessage: build.mutation({
            query: ({ id, ...updatedMessage }) => ({
                url: `Messages/${id}`,
                method: 'PUT',
                body: updatedMessage,
            }),
            invalidatesTags:["Messages"]
        }),
        deleteMessage: build.mutation({
            query: ({id}) => ({
                url: `Messages`,
                method: 'DELETE',
                body: { id: id }
            }),
            invalidatesTags:["Messages"]
        }),
    }),
});
export const {
    useGetMessagesQuery,
    useGetMessageByIdQuery,
    useGetMessageByNameQuery,
    useAddMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation,
} = messageApiSlice;