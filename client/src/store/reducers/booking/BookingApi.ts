import { Building } from '#/libs/types/Building/Building.type';
import { api } from '#/store/api';

export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuildings: builder.query<Building[], void>({
      query: () => ({
        url: '/bookings'
      }),
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Buildings' as const, id })), { type: 'Buildings', id: 'LIST' }]
          : [{ type: 'Buildings', id: 'LIST' }];
      }
    })
    // createBuilding: builder.mutation<Building, CreateBuildingRequest>({
    //   query: (body) => ({
    //     url: `/bookings`,
    //     method: 'POST',
    //     body
    //   }),
    //   invalidatesTags: ['Building']
    // })
  })
});
