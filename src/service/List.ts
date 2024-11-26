import shopApiSlice from "./Service";

const CategoryApiSlice = shopApiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    createList: builder.mutation({
      query: (body: any) => ({
        url: `/list/addlist`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["list"],
    }),
    listDelete: builder.mutation({
      query: ({ id }: any) => ({
        url: `/list/deleteList/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["list"],
    }),
    getList: builder.query({
      query: () => ({
        url: `/list/getAllList`,
        method: "GET",
      }),
      providesTags: ["list"],
    }),
    getConfirmedList: builder.query({
      query: () => ({
        url: `/list/confirm`,
        method: "GET",
      }),
      providesTags: ["list"],
    }),

    addConfirm: builder.mutation({
      query: ({ id }: any) => ({
        url: `/list/confirm/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["list"],
    }),
  }),
});
export const {
  useCreateListMutation,
  useGetListQuery,
  useListDeleteMutation,
  useAddConfirmMutation,
  useGetConfirmedListQuery,
} = CategoryApiSlice;
export default CategoryApiSlice;
