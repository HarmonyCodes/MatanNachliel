import  apiSlice  from '../../app/apiSlice';

const donorApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getDonors: build.query({
            query: () => ({ url: 'Donors' }),
            providesTags:["Donors"]
        }),
        getDonorById: build.query({
            query: (id) => `Donors/${id}`
        }),
        getDonorByName: build.query({
            query: (name) => `Donors/${name}`
        }),
        
        addDonor: build.mutation({
            query: (newDonor) => ({
                url: 'Donors',
                method: 'POST',
                body: newDonor,
            }),
            invalidatesTags:["Donors"]
        }),
        updateDonor: build.mutation({
            query: ({ id, ...updateDonor }) => ({
                url: `Donors/${id}`,
                method: 'PUT',
                body: updatedDonor,
            }),
            invalidatesTags:["Donors"]
        }),
        deleteDonor: build.mutation({
            query: ({id}) => ({
                url: `Donors`,
                method: 'DELETE',
                body: { id: id }
            }),
            invalidatesTags:["Donors"]
        }),
    }),
});
export const {
    useGetDonorsQuery,
    useGetDonorByIdQuery,
    useGetDonorByNameQuery,
    useAddDonorMutation,
    useUpdateDonorMutation,
    useDeleteDonorMutation,
} = donorApiSlice;