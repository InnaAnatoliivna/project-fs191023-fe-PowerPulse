import { userSplitApi } from './userApi/fitnesApi';

const authApiSlice = userSplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => `users/current`, // /api/v1/auth/profile
      keepUnusedDataFor: 10,
      providesTags: ['userAuth'],
    }),
    uploadUserAvatar: builder.mutation({
      query: (file) => ({
        url: `/users/avatars`,
        method: 'POST',
        body: () => {
          const formData = new FormData();
          formData.append('avatar', file);
          return formData;
        }, // formData
        headers: { 'content-type': 'multipart/form-data' },
      }),
      invalidatesTags: ['userAuth'],
    }),
    userSignUp: builder.mutation({
      query: (newCredential) => ({
        url: `users/register`,
        method: 'POST',
        body: newCredential,
      }),
      invalidatesTags: ['userAuth'],
    }),
    userSignIn: builder.mutation({
      query: (credential) => ({
        url: `users/login`,
        method: 'POST',
        body: credential,
      }),
      invalidatesTags: ['userAuth'],
    }),
    userDataUpdate: builder.mutation({
      query: (updateData) => ({
        url: `users`,
        method: 'PUT',
        body: updateData,
      }),
    }),
    userLogOut: builder.mutation({
      query: () => ({
        url: `users/logout/`,
        method: 'POST',
      }),
      invalidatesTags: ['userAuth', 'exercises', 'products'],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  // useGetUserDiaryQuery,
  useUploadUserAvatarMutation,
  useUserSignUpMutation,
  useUserSignInMutation,
  useUserDataUpdateMutation,
  useUserLogOutMutation,
} = authApiSlice;
