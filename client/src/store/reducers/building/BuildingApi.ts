import { Building } from '#/libs/types/Building/Building.type';
import { api } from '#/store/api';

export const buildingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBuildings: builder.query<Building[], void>({
      query: () => ({
        url: '/building'
      }),
      providesTags: (result) => {
        return result
          ? [...result.map(({ id }) => ({ type: 'Buildings' as const, id })), { type: 'Buildings', id: 'LIST' }]
          : [{ type: 'Buildings', id: 'LIST' }];
      }
    })
  })
});
